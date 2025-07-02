<template>
  <MainContentLayout>
    <template #title>
      {{ pageTitle }}
      <div class="text-sm font-normal">
        Join weekly ladder events, prove your skills, and boost your global ranking across academies
      </div>
    </template>

    <!-- <template #action>
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
    </template> -->

    <Card class="bg-gradient-to-r from-gray-900 to-black p-6 pb-10 rounded-2xl flex items-end gap-4">
      <!-- Location Input -->
      <CardContent class="p-0 flex-1 flex flex-col">
        <Label for="location" class="text-white mb-1">Location</Label>
        <Combobox v-model="selectedPlace" by="display_name">
          <ComboboxAnchor>
            <div class="relative w-full items-center">
              <ComboboxInput
                v-model="searchQuery"
                class="text-white pe-8 border border-gray-500"
                :display-value="(val) => val?.display_name ?? searchQuery"
                placeholder="Select place..."
                @input="handleInput"
                @focus="(e: Event) => (e.target as HTMLInputElement).select()"
              />
              <span class="absolute end-0 inset-y-0 flex items-center justify-center px-3">
                <LocateFixed v-if="!isLoading" class="size-4 text-muted-foreground" />
                <Loader2 v-else class="animate-spin size-4 text-muted-foreground" /></span>
            </div>
          </ComboboxAnchor>

          <ComboboxList v-if="suggestions.length">
            <ComboboxGroup>
              <ComboboxItem
                v-for="place in suggestions"
                :key="place.place_id"
                :value="place"
                @click="selectSuggestion(place)"
              >
                {{ place.display_name }}
              </ComboboxItem>
            </ComboboxGroup>
          </ComboboxList>
        </Combobox>
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
              v-model="date"
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
            <SelectItem v-for="option in statusOptions" :key="option.value" :value="option.value">
              {{ option.text }}
            </SelectItem>
          </SelectContent>
        </Select>
      </CardContent>

      <!-- Search Button -->
      <Button v-if="searchQuery || date || status" class="bg-transparent text-white hover:text-white/75 rounded-lg" type="reset" @click="clearFilters">
        Clear
      </Button>
      <Button type="submit" class="bg-blue-500 text-white hover:bg-blue-600 rounded-lg px-6 py-4" @click="fetchData">
        <Search class="mr-2 w-4 h-4" /> Search
      </Button>
    </Card>

    <component
      :is="selectedIcon === 'grid' ? GridView : selectedIcon === 'list' ? ListView : mapView"
      :events="events"
      :total-events="totalEvents"
      :selected-location="selectedPlace"
      @on-fetch="fetchData"
    />
  </MainContentLayout>
</template>

<script setup lang="ts">
import type { EventParams } from '@/schemas/events';
import { MainContentLayout } from '@/components/shares/main-content-layout';
import { Button } from '@/components/shares/ui/button';
import { Calendar } from '@/components/shares/ui/calendar';
import { Card, CardContent } from '@/components/shares/ui/card';
import { Combobox, ComboboxAnchor, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxList } from '@/components/shares/ui/combobox';
import { Label } from '@/components/shares/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shares/ui/popover/index';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/shares/ui/select';
import GridView from '@/components/user/events/views/gridView.vue';
import ListView from '@/components/user/events/views/listView.vue';
import mapView from '@/components/user/events/views/mapView.vue';
import { events, fetchEvents, totalEvents } from '@/composables/events';
import { CalendarIcon, Grid3x3, LayoutGrid, Loader2, LocateFixed, MapPinned, Search } from 'lucide-vue-next';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

// const icons = [
//   { value: 'list', icon: Grid3x3 },
//   { value: 'grid', icon: LayoutGrid },
//   { value: 'map', icon: MapPinned },
// ];

const date = ref();
const status = ref();
const statusOptions = ref([
  { value: 'DRAFT', text: 'Draft' },
  { value: 'CHECK_IN', text: 'Check-in' },
  { value: 'IN_PROGRESS', text: 'In progress' },
  { value: 'CLOSED', text: 'Closed' },
  { value: 'PUBLISHED', text: 'Published' },
  { value: 'DELETED', text: 'Deleted' },
  { value: 'COMPLETED', text: 'Completed' },
]);

const route = useRoute();
const selectedIcon = ref(route.query.icon || 'list');

const searchQuery = ref('');
const suggestions = ref<{ display_name: string; place_id: number }[]>([]);
const selectedPlace = ref<{ display_name: string; place_id: number } | null>(null);
const isLoading = ref(false);

const pageTitle = computed(() => {
  if (route.name === 'eventsPage')
    return 'Events';
  // Insert a space before every capital letter except the first
  return typeof route.name === 'string'
    ? route.name.replace(/([A-Z])/g, ' $1').replace(/^ /, '')
    : route.name;
});

const eventTimeFilter = ref('');

onMounted(() => {
  fetchData();
});

watch(
  () => route.name,
  () => {
    fetchData();
  },
);
function clearFilters() {
  searchQuery.value = '';
  date.value = '';
  status.value = '';
  fetchData();
}
// function selectIcon(icon: string) {
//   selectedIcon.value = icon;
//   router.push({ query: { ...route.query, icon } });
// }

async function fetchData(params: EventParams = {}) {
  const { pageIndex, pageSize } = params;
  switch (route.name) {
    case 'UpcomingEvents':
      eventTimeFilter.value = 'UPCOMING';
      break;
    case 'PastEvents':
      eventTimeFilter.value = 'PAST';
      break;
  }
  fetchEvents({
    eventTimeFilter: eventTimeFilter.value,
    location: selectedPlace.value?.display_name,
    eventTime: date.value ? new Date(date.value).toISOString().split('T')[0] : undefined,
    status: status.value,
    pageIndex,
    pageSize,
  });
}

// location search
let debounceTimer: ReturnType<typeof setTimeout> | null = null;

function handleInput() {
  if (debounceTimer)
    clearTimeout(debounceTimer);
  if (searchQuery.value.trim().length < 3) {
    suggestions.value = [];
    isLoading.value = false;
    return;
  }
  // isLoading.value = true;
  debounceTimer = setTimeout(() => {
    // fetchSuggestions();
  }, 1000);
}

// async function fetchSuggestions() {
//   try {
//     const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery.value)}&addressdetails=1&limit=5`;
//     const response = await fetch(url);
//     const data = await response.json();
//     suggestions.value = data;
//   } catch (error) {
//     notify.error(`Error fetching suggestions: ${error}`);
//   } finally {
//     isLoading.value = false;
//   }
// }

function selectSuggestion(place: { display_name: string; place_id: number }) {
  selectedPlace.value = place;
  searchQuery.value = place.display_name;
  suggestions.value = [];
}
</script>
