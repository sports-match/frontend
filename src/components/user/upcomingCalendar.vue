<template>
  <div class="bg-white rounded-xl shadow p-4 space-y-4">
    <div class="flex align-middle gap-2">
      <span class="text-xl font-semibold">
        Game Day
      </span>
      <span class="inline-flex items-center justify-center bg-green-400 text-white font-bold text-sm w-7 h-7 rounded-lg shadow">
        {{ Object.keys(eventToday || {}).length || 0 }}
      </span>
    </div>
    <div v-if="!Object.keys(eventToday || {}).length" class="relative flex flex-col justify-start items-start">
      <div class="absolute left-0 top-0 h-5 w-1 bg-green-400 rounded-full" />
      <div class="pl-4 text-gray-600 text-sm text-left">
        <div>No Event Today</div>
      </div>
    </div>
    <div v-else class="grid grid-cols-[auto,1fr]  items-center gap-6 max-w-xl">
      <!-- Left: Date/Time & Vertical Bar -->
      <div class="relative flex flex-col justify-start items-start h-full">
        <div class="absolute left-0 top-0 h-full w-1 bg-green-400 rounded-full" />
        <div class="pl-4 text-gray-600 text-sm text-left min-h-100 w-24">
          <div>Today,</div>
          {{ formatDate(eventToday?.eventTime) }}
        </div>
      </div>
      <!-- Right: Event Info -->
      <div class="space-y-6">
        <div class="font-bold text-lg leading-tight">
          <router-link v-if="eventToday" :to="{ name: 'ViewEvent', params: { id: eventToday?.id } }" class="hover:underline">
            {{ eventToday.name }}
          </router-link><br>
          <span class="font-normal truncate block">{{ eventToday?.description }}</span>
        </div>
        <div>
          <span class="bg-gray-100 text-gray-700 rounded px-3 py-1 text-sm font-medium">{{ eventToday?.club?.name }}</span>
        </div>
        <div class="flex items-center gap-3 text-gray-700 text-sm mt-1">
          <span class="flex items-center gap-1">
            <MapPinned v-if="eventToday?.club?.location" class="size-4" />
            {{ eventToday?.club?.location }}
          </span>
          <span>
            #Courts(<span class="font-semibold">{{ eventToday?.groupCount }}</span>)
          </span>
        </div>
      </div>
    </div>

    <div class="flex align-middle gap-2">
      <span class="text-xl font-semibold">
        Upcoming Events
      </span>
      <span class="inline-flex items-center justify-center bg-red-400 text-white font-bold text-sm w-7 h-7 rounded-lg shadow">
        {{ upcommingNoToday.length || 0 }}
      </span>
    </div>
    <div
      v-for="event, i in upcommingNoToday"
      :key="i" class="grid grid-cols-[auto,1fr]  items-center gap-6 max-w-xl"
    >
      <!-- Left: Date/Time & Vertical Bar -->
      <div class="relative flex flex-col justify-start items-start h-full">
        <div class="absolute left-0 top-0 h-full w-1 bg-red-400 rounded-full" />
        <div class="pl-4 text-gray-600 text-sm text-left min-h-100 w-24">
          {{ formatDate(event.eventTime) }}
        </div>
      </div>
      <!-- Right: Event Info -->
      <div class="space-y-6">
        <div class="font-bold text-lg leading-tight">
          <router-link :to="{ name: 'ViewEvent', params: { id: event.id } }" class="hover:underline">
            {{ event.name }}
          </router-link><br>
          <span class="font-normal truncate block">{{ event.description }}</span>
        </div>
        <div>
          <span class="bg-gray-100 text-gray-700 rounded px-3 py-1 text-sm font-medium">{{ event.club?.name }}</span>
        </div>
        <div class="flex items-center gap-3 text-gray-700 text-sm mt-1">
          <span class="flex items-center gap-1">
            <MapPinned v-if="event.club?.location" class="size-4" />
            {{ event.club?.location }}
          </span>
          <span>
            #Courts(<span class="font-semibold">{{ event.groupCount }}</span>)
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Event } from '@/schemas/events';
import type { ComputedRef } from 'vue';
import { formatDate } from '@/utils/common';
import { MapPinned } from 'lucide-vue-next';
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  events: Event[] | undefined;
  eventToday: Event | undefined;
}>(), {
  events: () => [],
});

// const todayEvent: ComputedRef<Event[]> = computed(() => {
//   const today = new Date();
//   return props.events?.filter((event) => {
//     const eventDate = new Date(event.eventTime);
//     return eventDate.getFullYear() === today.getFullYear()
//       && eventDate.getMonth() === today.getMonth()
//       && eventDate.getDate() === today.getDate();
//   });
// });

const upcommingNoToday: ComputedRef<Event[]> = computed(() => {
  const today = new Date();
  return props.events?.filter((event) => {
    const eventDate = new Date(event.eventTime);
    return eventDate.getFullYear() > today.getFullYear()
      || eventDate.getMonth() > today.getMonth()
      || eventDate.getDate() > today.getDate();
  }).slice(0, 2);
});
</script>
