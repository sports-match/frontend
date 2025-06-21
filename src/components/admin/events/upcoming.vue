<template>
  <MainContentLayout>
    <template #title>
      {{ pageTitle }}
    </template>

    <template #action>
      <CreateEvent />
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
import { getEvents } from '@/api/event';
import CreateEvent from '@/components/events/CreateForm.vue';
import EventList from '@/components/events/List.vue';
import { MainContentLayout } from '@/components/shares/main-content-layout';
import { notify } from '@/composables/notify';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const events = ref<any[]>([]);
const totalEvents = ref(0);
const eventTimeFilter = ref('');

const pageTitle = computed(() => {
  if (route.name === 'eventsPage')
    return 'Events';
  // Insert a space before every capital letter except the first
  return typeof route.name === 'string'
    ? route.name.replace(/([A-Z])/g, ' $1').replace(/^ /, '')
    : route.name;
});

onMounted(() => {
  fetchData();
});

watch(
  () => route.name,
  (newVal) => {
    switch (newVal) {
      case 'eventsPage':
        eventTimeFilter.value = '';
        break;
      case 'UpcomingEvents':
        eventTimeFilter.value = 'UPCOMING';
        break;
      case 'PastEvents':
        eventTimeFilter.value = 'PAST';
        break;
    }
    fetchData();
  },
);

async function fetchData() {
  try {
    const { data } = await getEvents({
      eventTimeFilter: eventTimeFilter.value,
    });
    events.value = data.content;
    totalEvents.value = data.totalElements;
  } catch (error) {
    notify.error(error as string);
  }
}
</script>
