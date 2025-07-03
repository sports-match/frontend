<template>
  <div class="bg-white text-gray-800 font-sans">
    <!-- Hero Section -->
    <div class="relative bg-blue-900 text-white p-6 md:p-12 h-56">
      <img v-if="imageUrl" :src="imageUrl" alt="SportRevive Logo" class="absolute inset-0 h-full w-full object-cover">
      <div class="relative" :style="imageUrl ? '' : 'background-color: #3498db'" />
      <!-- <div class="max-w-7xl mx-auto">
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold uppercase">
          Corporate Badminton
        </h2>
        <p class="text-lg md:text-xl mt-2">
          Championship 5th Edition
        </p>
        <p class="text-md mt-1">
          3-4 February 2024
        </p>
      </div>
      <div class="absolute top-6 right-6 text-right text-xs">
        <h4 class="font-semibold">
          Our Partners
        </h4>
        <div class="flex flex-col items-end space-y-2 mt-2">
          <img src="/partner1.png" alt="Akshayakalpa" class="h-8">
          <img src="/partner2.png" alt="Decathlon" class="h-8">
          <img src="/partner3.png" alt="Li-Ning" class="h-8">
          <img src="/partner4.png" alt="Tezhhag" class="h-8">
        </div>
      </div> -->
    </div>

    <!-- Title -->
    <div class="max-w-7xl mx-auto px-4 py-6">
      <h1 class="text-2xl md:text-3xl font-bold">
        {{ event?.name }}
      </h1>
      <p class="text-sm mt-1 inline-flex items-center">
        <MapPin class="size-4 mr-1" /> {{ event?.club?.name }}
      </p>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 px-4 pb-12">
      <!-- Description and Details -->
      <div class="md:col-span-3 space-y-4">
        <h2 class="text-lg font-semibold">
          Description
        </h2>
        <p>{{ event?.description }}</p>
        <div class="grid grid-cols-2 gap-4 mt-6 text-sm">
          <div><strong>Organizer:</strong> {{ event?.club?.name }} ({{ event?.club.location }})</div>
          <div><strong>Format:</strong> {{ event?.format }}</div>
          <div><strong>Max Player:</strong> {{ event?.maxParticipants }}</div>
          <div><strong>Date:</strong> {{ new Date(event?.eventTime).toLocaleString() }}</div>
          <div><strong>Skill Level:</strong> {{ event?.skill || 'N/A' }}</div>
        </div>

        <!-- Tags -->
        <div class="flex flex-wrap gap-2 mt-4">
          <strong>Tag:</strong>
          <span v-for="tag in event?.tags" :key="tag" class="px-3 py-1 bg-gray-100 rounded-full text-sm">{{ tag }}</span>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="border rounded-lg p-6">
        <Button class="w-full">
          <CalendarArrowUp class="mr-2 size-4" />
          Sign up
        </Button>

        <div class="mt-6 space-y-3 text-sm">
          <div class="flex justify-between">
            <strong class="text-gray-600">Entry Fee:</strong>
            <span>N/A</span>
          </div>
          <div class="flex justify-between">
            <strong class="text-gray-600">Courts:</strong>
            <span v-if="event?.groupCount && event?.groupCount > 0">
              {{ event?.groupCount > 3 ? `1 to ${event?.groupCount}` : Array.from({ length: event?.groupCount }).map((_, i) => i + 1).join(', ') }}
            </span>
          </div>
          <div class="flex justify-between">
            <strong class="text-gray-600">Groups:</strong>
            <span>{{ event?.groupCount || 0 }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Event } from '@/schemas/events';
import { Button } from '@/components/shares/ui/button';
import { CalendarArrowUp, MapPin } from 'lucide-vue-next';
import { computed, type PropType } from 'vue';

const props = defineProps({
  event: {
    type: Object as PropType<Event>,
    default: () => ({
      name: '',
      description: '',
      club: {
        name: '',
        location: '',
      },
      groupCount: 0,
    }),
  },
});

const imageUrl = computed(() => {
  if (!props.event?.posterImage)
    return false;
  return `${import.meta.env.VITE_API_URL}${props.event?.posterImage}`;
});
// No interactivity yet, just layout
</script>
