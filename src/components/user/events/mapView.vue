<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="col-span-1 md:col-span-1 space-y-4 h-full overflow-y-auto" style="max-height: 80vh;">
      <EventCard v-for="i in 10" :key="i" :event="event" />
    </div>
    <div class="col-span-1 md:col-span-2">
      <EventMap :selected-location="selectedLocation" />
    </div>
  </div>
</template>

<script setup lang="ts">
import EventCard from '@/components/user/events/card.vue';
import EventMap from '@/components/user/events/map.vue';

defineProps({
  selectedLocation: Object,
});

const event = {
  title: 'May 9th Mukilteo Mixer Standard Doubles Mixer',
  signedUp: 20,
  capacity: 25,
  organizer: 'Northwest Badminton Academy',
  location: 'Northwest Badminton Academy',
  courts: 4,
};
</script>
