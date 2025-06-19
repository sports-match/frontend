<template>
  <MainContentLayout>
    <template #title>
      Upcoming Events
      <div class="text-sm font-normal">
        Join weekly ladder events, prove your skills, and boost your global ranking across academies
      </div>
    </template>

    <template #action>
      <div class="flex space-x-2">
        <Button
          v-for="item in icons"
          :key="item.value"
          variant="ghost"
          class="p-2 rounded-md" :class="[
            selectedIcon === item.value ? 'text-primary' : 'text-black',
          ]"
          @click="selectIcon(item.value)"
        >
          <component :is="item.icon" class="w-6 h-6" />
        </Button>
      </div>
    </template>

    <Card class="bg-gradient-to-r from-gray-900 to-black p-4 rounded-2xl flex items-center gap-4">
      <!-- Location Input -->
      <CardContent class="p-0 flex-1 flex flex-col">
        <Label for="location" class="text-white mb-1">Location</Label>
        <Input
          id="location"
          v-model="location"
          placeholder="Which place are you looking for?"
          class="text-white bg-transparent border border-gray-500 placeholder:text-gray-400"
        />
      </CardContent>

      <!-- Date Picker -->
      <CardContent class="p-0 flex-1 flex flex-col">
        <Label for="date" class="text-white mb-1">Date</Label>
        <Popover>
          <PopoverTrigger as-child>
            <Button
              variant="outline" class="hover:bg-transparent hover:text-white w-auto ps-3 text-start font-normal text-white bg-transparent border border-gray-500 placeholder:text-gray-400"
            >
              <span>{{ date || '' }}</span>
              <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
            </Button>
            <input hidden>
          </PopoverTrigger>
          <PopoverContent class="w-auto p-0">
            <Calendar
              :model-value="date"
              calendar-label="Date of birth"
              initial-focus
            />
          </PopoverContent>
        </Popover>
      </CardContent>

      <!-- Status Dropdown -->
      <CardContent class="p-0 flex-1 flex flex-col">
        <Label for="status" class="text-white mb-1">Status</Label>
        <Select v-model="status">
          <SelectTrigger class="w-full text-white bg-transparent border-gray-500">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem v-for="option in statusOptions" :key="option" :value="option">
              {{ option }}
            </SelectItem>
          </SelectContent>
        </Select>
      </CardContent>

      <!-- Search Button -->
      <Button class="bg-blue-500 text-white hover:bg-blue-600 rounded-xl px-6 py-4">
        <Search class="mr-2 w-4 h-4" /> Search
      </Button>
    </Card>

    <component :is="selectedIcon === 'grid' ? GridView : selectedIcon === 'list' ? ListView : mapView" />
  </MainContentLayout>
</template>

<script setup lang="ts">
import { MainContentLayout } from '@/components/shares/main-content-layout';
import { Button } from '@/components/shares/ui/button';
import { Calendar } from '@/components/shares/ui/calendar';
import { Card, CardContent } from '@/components/shares/ui/card';
import { Input } from '@/components/shares/ui/input';
import { Label } from '@/components/shares/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shares/ui/popover/index';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/shares/ui/select';
import GridView from '@/components/user/events/gridView.vue';
import ListView from '@/components/user/events/listView.vue';
import mapView from '@/components/user/events/mapView.vue';
import { CalendarIcon, Grid3x3, LayoutGrid, MapPinned, Search } from 'lucide-vue-next';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const icons = [
  { value: 'list', icon: Grid3x3 },
  { value: 'grid', icon: LayoutGrid },
  { value: 'map', icon: MapPinned },
];

const date = ref();
const location = ref();
const status = ref();
const statusOptions = ref(['Open', 'Closed']);

const route = useRoute();
const router = useRouter();
const selectedIcon = ref(route.query.icon || 'grid');

function selectIcon(icon: string) {
  selectedIcon.value = icon;
  router.push({ query: { ...route.query, icon } });
}
</script>
