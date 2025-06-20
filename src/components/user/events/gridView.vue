<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <template v-for="i in 10" :key="i">
      <EventCard :event="event" />
    </template>
  </div>
</template>

<script setup lang="ts">
import EventCard from '@/components/user/events/card.vue';

const event = {
  title: 'May 9th Mukilteo Mixer Standard Doubles Mixer',
  signedUp: 20,
  capacity: 25,
  organizer: 'Northwest Badminton Academy',
  location: 'Northwest Badminton Academy',
  courts: 4,
};
</script>
