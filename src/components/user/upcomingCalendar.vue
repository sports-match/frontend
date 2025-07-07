<template>
  <div class="bg-white rounded-xl shadow p-4 space-y-4">
    <div class="flex align-middle gap-2">
      <span class="text-xl font-semibold">
        Game Day
      </span>
      <span class="inline-flex items-center justify-center bg-green-400 text-white font-bold text-sm w-7 h-7 rounded-lg shadow">
        1
      </span>
    </div>
    <div class="grid grid-cols-[auto,1fr]  items-center gap-6 max-w-xl">
      <!-- Left: Date/Time & Vertical Bar -->
      <div class="relative flex flex-col justify-start items-start h-full">
        <div class="absolute left-0 top-0 h-full w-1 bg-green-400 rounded-full" />
        <div class="pl-4 text-gray-600 text-sm text-left min-h-100">
          <div>Today,</div>
          <div>7:00 PM to</div>
          <div>11:00 PM</div>
        </div>
      </div>
      <!-- Right: Event Info -->
      <div class="space-y-6">
        <div class="font-bold text-lg leading-tight">
          May 9th Mukilteo Mixer<br>
          <span class="font-normal">Standard Doubles Mixer</span>
        </div>
        <div>
          <span class="bg-gray-100 text-gray-700 rounded px-3 py-1 text-sm font-medium">Safiya Jetha</span>
        </div>
        <div class="flex items-center gap-3 text-gray-700 text-sm mt-1">
          <span class="flex items-center gap-1">
            <MapPinned class="size-4" />
            BBC - Mukilteo
          </span>
          <span>
            #Courts(<span class="font-semibold">4</span>)
          </span>
        </div>
      </div>
    </div>

    <div class="flex align-middle gap-2">
      <span class="text-xl font-semibold">
        Upcoming Events
      </span>
      <span class="inline-flex items-center justify-center bg-red-400 text-white font-bold text-sm w-7 h-7 rounded-lg shadow">
        {{ events.length }}
      </span>
    </div>
    <div
      v-for="event, i in events"
      :key="i" class="grid grid-cols-[auto,1fr]  items-center gap-6 max-w-xl"
    >
      <!-- Left: Date/Time & Vertical Bar -->
      <div class="relative flex flex-col justify-start items-start h-full">
        <div class="absolute left-0 top-0 h-full w-1 bg-red-400 rounded-full" />
        <div class="pl-4 text-gray-600 text-sm text-left min-h-100">
          <!-- <div>Today,</div>
          <div>7:00 PM to</div>
          <div>11:00 PM</div> -->
          {{ formatDate(event.eventTime) }}
        </div>
      </div>
      <!-- Right: Event Info -->
      <div class="space-y-6">
        <div class="font-bold text-lg leading-tight">
          {{ event.name }}<br>
          <span class="font-normal">{{ event.description }}</span>
        </div>
        <div>
          <span class="bg-gray-100 text-gray-700 rounded px-3 py-1 text-sm font-medium">Safiya Jetha</span>
        </div>
        <div class="flex items-center gap-3 text-gray-700 text-sm mt-1">
          <span class="flex items-center gap-1">
            <MapPinned v-if="event.location" class="size-4" />
            {{ event.location }}
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
import type { PropType } from 'vue';
import { formatDate } from '@/utils/common';
import { MapPinned } from 'lucide-vue-next';

defineProps({
  events: {
    type: Array as PropType<Event[]>,
    default: () => [],
  },
});
</script>
