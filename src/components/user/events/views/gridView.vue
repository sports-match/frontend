<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <template v-for="event in eventList" :key="event.id">
      <EventCard :event="event" />
    </template>
  </div>
</template>

<script setup lang="ts">
import EventCard from '@/components/user/events/card.vue';
import { computed } from 'vue';

const props = defineProps({
  events: {
    type: Object,
    default: () => ({}),
  },
});

const eventList = computed(() => props.events?.content || []);
// const totalRecords = computed(() => props.events?.totalElements || 0);
</script>
