<template>
  <Dialog :focus-outside="false">
    <DialogTrigger as-child>
      <!-- Trigger button can be placed here if needed -->
      <Button @click="() => { fetchSports(); fetchClubs(); fetchPlayers(); }">
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
          <div class="flex items-center space-x-2">
            <Switch id="public-event" v-model="form.enabled" />
            <Label for="public-event" class="font-normal">This event is public and anyone can sign up</Label>
          </div>
          <div class="flex items-center space-x-2">
            <Switch id="waitlist" v-model="form.allowWaitList" />
            <Label for="waitlist" class="font-normal">Allow users to join a waitlist once event is full</Label>
          </div>
        </div>

        <!-- Sport buttons -->
        <div class="overflow-x-auto px-1">
          <div class="flex gap-3 my-4 min-w-max">
            <Button
              v-for="sport in sports"
              :key="sport.id"
              variant="outline"
              class="flex flex-col items-center py-2 min-w-[110px] border transition-all h-auto"
              :class="selectedSport === sport.id ? 'border-primary ring-1 ring-primary' : ''"
              type="button"
              @click="selectSport(sport.id)"
            >
              <div>
                <img
                  v-if="sport.icon"
                  :src="`/src/assets/sportTypes/${sport.icon}.svg`"
                  :alt="`${sport.name}-icon`"
                  class="w-10 h-10 mb-1"
                >
              </div>
              <span class="text-xs">{{ sport.name }}</span>
            </Button>
          </div>
        </div>

        <!-- Form Fields -->
        <div>
          <SingleSelect v-model="selectedClub" :options="clubs" placeholder="Select Club" />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <Select v-model="form.format">
            <SelectTrigger><SelectValue placeholder="Format" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="SINGLE">
                Singles
              </SelectItem>
              <SelectItem value="DOUBLE">
                Doubles
              </SelectItem>
            </SelectContent>
          </Select>
          <Input v-model="form.eventTime" class="flex flex-col justify-between" placeholder="Date" type="datetime-local" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <Input v-model="form.maxParticipants" type="number" placeholder="Max players" />
          <Input v-model="form.groupCount" type="number" placeholder="Number of group" />
        </div>
        <div>
          <Input v-model="form.name" placeholder="Event name" />
        </div>
        <div class="flex items-center space-x-2">
          <MultiSelect
            v-model="form.coHostPlayers"
            :options="players"
            value-key="id"
            label-key="name"
            return-type="value"
            placeholder="Other Orgenizers"
          />
        </div>
        <div class="grid gap-4 mb-4">
          <MultiSelect
            v-model="form.tags"
            :options="tags"
            value-key="value"
            label-key="label"
            return-type="value"
            placeholder="Event Tags"
            class="col-span-2"
          />
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
          <Button :disabled="isLoading" @click="submit">
            Public
            <ArrowRight v-if="!isLoading" class="ml-2 size-4" />
            <LucideSpinner v-if="isLoading" class="ml-2 h-4 w-4 animate-spin" />
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

<script setup lang="ts">
import type { Ref } from 'vue';
import { createEvent, getClubs, getPlayers, getSports, uploadImage } from '@/api/event';
import MultiSelect from '@/components/shares/MultiSelect.vue';
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
import { notify } from '@/composables/notify';
import { ArrowRight, Check, Loader2 as LucideSpinner, Upload, X } from 'lucide-vue-next';
import { reactive, ref } from 'vue';
import SingleSelect from './SingleSelect.vue';

type EventForm = {
  sportId: Ref<string | null>;
  clubId: string | null;
  format: string;
  eventTime: string;
  maxParticipants: string;
  groupCount: string;
  name: string;
  coHostPlayers: string[];
  tags: string[];
  description: string;
  posterImage: string | null;
  allowWaitList: boolean;
  enabled: boolean;
  image: string;
  location: string;
};
const submitted = ref(false);
const selectedClub: Ref<{ id: string }> | Ref<null, null> = ref(null);
const isLoading = ref(false);

const sports: Ref<{ id: string; name: string; icon: string }[]> = ref([
  // { value: 'badminton', label: 'Badminton', icon: 'badminton' },
  // { value: 'soccer', label: 'Soccer', icon: 'soccer' },
  // { value: 'basketball', label: 'Basketball', icon: 'basketball' },
  // { value: 'tennis', label: 'Tennis', icon: 'tennis' },
  // { value: 'swimming', label: 'Swimming', icon: 'swimming' },
  // Add more sports as needed
]);
const clubs: Ref<{ id: string }[]> = ref([]);
const players: Ref<{ id: string }[]> = ref([]);
const tags = ref([
  { value: 'ladder', label: 'Ladder' },
  { value: 'mixer', label: 'Mixer' },
  { value: 'academy', label: 'Academy' },
  { value: 'open', label: 'Open' },
  { value: 'league', label: 'League' },
]);

const selectedSport = ref();

function selectSport(val: string) {
  selectedSport.value = val;
}

const inputFile = ref<File | null>(null);

const form = reactive<EventForm>({
  sportId: selectedSport,
  clubId: null,
  format: '',
  eventTime: '',
  maxParticipants: '',
  groupCount: '',
  name: '',
  coHostPlayers: [],
  tags: [],
  description: '',
  posterImage: '',
  allowWaitList: false,
  enabled: false,
  image: '',
  location: '',
});
const previewUrl = ref<string | null>(null);

async function fetchClubs() {
  try {
    const { data: { content } } = await getClubs();
    clubs.value = content;
  } catch (error) {
    notify.error(error as string);
  }
}

async function fetchSports() {
  try {
    const { data: { content } } = await getSports();
    sports.value = content;
    selectedSport.value = sports.value[0]?.id || null;
  } catch (error) {
    notify.error(error as string);
  }
}

async function fetchPlayers() {
  try {
    const { data: { content } } = await getPlayers();
    players.value = content;
  } catch (error) {
    notify.error(error as string);
  }
}

function onFileChange(event: Event) {
  const file = event?.target?.files[0];
  if (file && file.type.startsWith('image/')) {
    inputFile.value = file;
    form.posterImage = `/api/localStorage/view/Screenshotfrom2024-09-2614-50-25-20250613021428902.png`;
    previewUrl.value = URL.createObjectURL(file);
  }
}

async function submit() {
  isLoading.value = true;
  try {
    if (inputFile.value) {
      const { data } = await uploadImage(inputFile.value);
      form.posterImage = data.data[0];
    }

    await createEvent({
      ...form,
      eventTime: '2025-06-19 14:00:00',
      clubId: selectedClub.value?.id,
    });
    notify.success('Event created successfully');
    submitted.value = true;
  } catch (error) {
    notify.error(error as string);
  } finally {
    isLoading.value = false;
  }
}
</script>
