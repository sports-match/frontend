<template>
  <MainContentLayout>
    <template #title>
      {{ pageTitle }}
    </template>

    <template #action>
      <CreateEvent @on-submitted="fetchData" />
    </template>

    <div class="flex flex-col gap-4">
      <EventList :events :total-events @on-fetch="fetchData">
        <template #action>
          <span />
        </template>
      </EventList>
    </div>
  </MainContentLayout>
</template>

<script setup lang="ts">
import type { EventParams } from '@/schemas/events';
import EventList from '@/components/admin/events/List.vue';
import CreateEvent from '@/components/events/CreateForm.vue';
import { MainContentLayout } from '@/components/shares/main-content-layout';
import { events, fetchEvents, totalEvents } from '@/composables/events';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const eventTimeFilter = ref('');

const pageTitle = computed(() => {
  if (route.name === 'eventsPage')
    return 'Events';
  return typeof route.name === 'string'
    ? route.name.replace(/([A-Z])/g, ' $1').replace(/^ /, '')
    : route.name;
});

onMounted(() => {
  fetchData();
});

watch(
  () => route.name,
  () => {
    fetchData();
  },
);

async function fetchData(params: EventParams = {}) {
  const { name, pageIndex, pageSize, sort } = params;
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
    name,
    pageIndex,
    pageSize,
    sort,
  });
}
</script>
