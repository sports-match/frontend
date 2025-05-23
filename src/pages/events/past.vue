<template>
  <MainContentLayout>
    <template #title>
      Past Events
    </template>

    <div class="flex flex-col gap-4">
      <EventList :events="pastEvents">
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
const pastEvents = computed(() => eventStore.pastEvents);
</script>
