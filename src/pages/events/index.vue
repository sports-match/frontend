<template>
  <MainContentLayout>
    <template #title>
      Events
    </template>

    <div class="flex flex-col gap-4">
      <EventList :events="upcoming">
        <template #action>
          <span />
        </template>
      </EventList>
    </div>
  </MainContentLayout>
</template>

<script setup lang="ts">
import EventList from '@/components/events/List.vue';
import { MainContentLayout } from '@/components/shares/main-content-layout';
import { useEventStore } from '@/stores/event';
import { computed } from 'vue';

const eventStore = useEventStore();
const upcoming = computed(() => eventStore.upcomingEvents);
</script>
