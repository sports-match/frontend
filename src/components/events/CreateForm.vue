<template>
  <Dialog :focus-outside="false">
    <DialogTrigger as-child>
      <!-- Trigger button can be placed here if needed -->
      <Button>
        Create Event
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>
          <span v-if="!submitted">Select sport type</span>
          <span v-else>Event Sharing</span>
        </DialogTitle>
        <DialogDescription />
      </DialogHeader>

      <!-- Event form -->
      <div v-if="!submitted" class="space-y-4">
        <div class="space-y-3 mt-2">
          <!-- <div class="flex flex-col"> -->
          <div class="flex items-center space-x-2">
            <Switch id="public-event" v-model="form.publicEvent" />
            <Label for="public-event" class="font-normal">This event is public and anyone can sign up</Label>
          </div>
          <div class="flex items-center space-x-2">
            <Switch id="waitlist" v-model="form.waitlist" />
            <Label for="waitlist" class="font-normal">Allow users to join a waitlist once event is full</Label>
          </div>
        <!-- </div> -->
        </div>
        <!-- Sport buttons -->
        <div class="overflow-x-auto px-1">
          <div class="flex gap-3 my-4 min-w-max">
            <Button
              v-for="sport in sports"
              :key="sport.value"
              variant="outline"
              class="flex flex-col items-center py-2 min-w-[110px] border transition-all h-auto"
              :class="selectedSport === sport.value ? 'border-primary ring-1 ring-primary' : ''"
              type="button"
              @click="selectSport(sport.value)"
            >
              <div>
                <img
                  v-if="sport.icon"
                  :src="`/src/assets/sportTypes/${sport.icon}.svg`"
                  :alt="`${sport.label} icon`"
                  class="w-10 h-10 mb-1"
                >
              </div>
              <span class="text-xs">{{ sport.label }}</span>
            </Button>
          </div>
        </div>

        <!-- Form Fields -->
        <div>
          <Select v-model="form.club" class="mb-4">
            <SelectTrigger>
              <SelectValue placeholder="Select club" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="club-1">
                Club 1
              </SelectItem>
              <SelectItem value="club-2">
                Club 2
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <Select>
            <SelectTrigger><SelectValue placeholder="Format" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="singles">
                Singles
              </SelectItem>
              <SelectItem value="doubles">
                Doubles
              </SelectItem>
            </SelectContent>
          </Select>
          <Input v-model="form.date" class="flex flex-col justify-between" placeholder="Date" type="date" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <Input v-model="form.maxPlayers" placeholder="Max players" />
          <Select v-model="form.court">
            <SelectTrigger><SelectValue placeholder="Courts" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="1">
                Court 1
              </SelectItem>
              <SelectItem value="2">
                Court 2
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Input v-model="form.name" placeholder="Event name" />
        </div>
        <div class="flex items-center space-x-2">
          <MultiSelectOrganizer @update="(value) => form.organizers = value" />
        </div>
        <div class="grid gap-4 mb-4">
          <MultiSelectEventTag class="col-span-2" @update="(value) => form.tags = value" />
          <Textarea v-model="form.description" placeholder="Description" class="col-span-2" />

          <div class="col-span-2 ">
            <div>
              <label
                for="image-upload"
                class="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-gray-400 transition duration-150 ease-in-out"
              >
                <input
                  id="image-upload"
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  class="hidden"
                  @change="onFileChange"
                >
                <img v-if="previewUrl" :src="previewUrl" alt="Preview" class="h-48 w-full p-2 rounded-lg border object-contain">
                <div v-else class="flex flex-col items-center justify-center h-full">
                  <Upload class="w-6 h-6 text-gray-500 mb-2" />
                  <p class="text-sm text-gray-500">Drop your image here, or browse</p>
                  <p class="text-xs text-gray-400 mt-1">Support: PNG, JPG, JPEG, WEBP</p>
                </div>
                </input>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div v-else>
        <!-- QR Image -->
        <QrSharing />
      </div>
      <!-- Footer -->
      <DialogFooter class="flex justify-between">
        <div v-if="!submitted" class="flex justify-between space-x-2 w-full">
          <Button variant="destructive">
            <X class="mr-2 size-4" />
            Cancel
          </Button>
          <Button @click="submit">
            Public
            <ArrowRight class="ml-2 size-4" />
          </Button>
        </div>
        <Button v-else @click="submitted = false">
          <Check class="mr-2 size-4" />
          Done
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import MultiSelectEventTag from '@/components/events/MultiSelectEventTag.vue';
import MultiSelectOrganizer from '@/components/events/MultiSelectOrganizer.vue';
import QrSharing from '@/components/shares/QrSharing.vue';
import { Button } from '@/components/shares/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shares/ui/dialog';
import { Input } from '@/components/shares/ui/input';
import { Label } from '@/components/shares/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/shares/ui/select';
import { Switch } from '@/components/shares/ui/switch';
import { Textarea } from '@/components/shares/ui/textarea';
import { ArrowRight, Check, Copy, Download, Mail, MessageCircle, MessageCircleMore, Plus, Upload, X } from 'lucide-vue-next';
import { reactive, ref, shallowRef } from 'vue';

const submitted = ref(false);
const sports = [
  { value: 'badminton', label: 'Badminton', icon: 'badminton' },
  { value: 'soccer', label: 'Soccer', icon: 'soccer' },
  { value: 'basketball', label: 'Basketball', icon: 'basketball' },
  { value: 'tennis', label: 'Tennis', icon: 'tennis' },
  { value: 'swimming', label: 'Swimming', icon: 'swimming' },
  // Add more sports as needed
];

const selectedSport = ref(sports[0].value);
function selectSport(val) {
  selectedSport.value = val;
}

const form = reactive({
  sport: selectedSport,
  club: '',
  format: '',
  date: '',
  maxPlayers: '',
  courts: '',
  eventName: '',
  organizers: [],
  tags: [],
  description: '',
  image: null,
  waitlist: false,
  publicEvent: false,
});
const previewUrl = ref(null);

function onFileChange(event) {
  const file = event.target.files[0];
  if (file && file.type.startsWith('image/')) {
    form.image = file;
    previewUrl.value = URL.createObjectURL(file);
  }
}

function submit() {
  submitted.value = true;
  console.log(form);
}
</script>
