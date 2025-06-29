<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="col-span-1 md:col-span-1 space-y-4 h-full overflow-y-auto" style="max-height: 80vh;">
      <template v-for="event in eventList" :key="event.id">
        <EventCard :event="event" />
      </template>
    </div>
    <div class="col-span-1 md:col-span-2">
      <EventMap :selected-location="selectedLocation" />
    </div>
  </div>
</template>

<script setup lang="ts">
import EventCard from '@/components/user/events/card.vue';
import EventMap from '@/components/user/events/views/map.vue';
import { computed } from 'vue';

const props = defineProps({
  events: {
    type: Object,
    default: () => ({}),
  },
  selectedLocation: Object,
});

const eventList = computed(() => props.events?.content || []);
// const totalRecords = computed(() => props.events?.totalElements || 0);
</script>
