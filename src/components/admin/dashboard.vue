<template>
  <MainContentLayout>
    <template #title>
      Welcome Back, {{ userStore.userDetails?.user?.user?.username }}
    </template>
    <template #action>
      <CreateEvent />
    </template>
    <div v-if="!showPendingForOrganizer" class="flex flex-col gap-4">
      <EventCard :events="upcomingEvents?.content" />
      <CalendarSection :events="upcomingEvents?.content" @on-date-change="dateChange" />
      <EventList :events="events" :total-events="totalEvents" @on-fetch="fetchData" />
    </div>
    <PendingOverlay v-if="showPendingForOrganizer" />
  </MainContentLayout>
</template>

<script setup lang="ts">
import type { EventParams } from '@/schemas/events';
import { getEvents } from '@/api/event';
import EventList from '@/components/admin/events/List.vue';
import CalendarSection from '@/components/events/CalendarSection.vue';
import EventCard from '@/components/events/Card.vue';
import CreateEvent from '@/components/events/CreateForm.vue';
import { MainContentLayout } from '@/components/shares/main-content-layout';
import PendingOverlay from '@/components/shares/PendingOverlay.vue';
import { useAuthentication } from '@/composables';
import { events, fetchEvents, totalEvents } from '@/composables/events';
import { notify } from '@/composables/notify';
import { useUserStore } from '@/stores/user';
import { computed, onMounted, ref } from 'vue';

const userStore = useUserStore();

const { isOrganizer } = useAuthentication();

const showPendingForOrganizer = computed(() => {
  return isOrganizer.value && !userStore.isOrganizerVerify();
});

// const events = ref<{ content: []; totalElements: number }>();
const upcomingEvents = ref<{ content: []; totalElements: number }>();

onMounted(() => {
  fetchData();
  getUpCommingEvent();
});

async function dateChange(date: string) {
  try {
    const { data } = await getEvents({ date });
    events.value = data;
  } catch (error) {
    notify.error(error as string);
  }
}

async function fetchData(params: EventParams = {}) {
  const { name, page, size, sort } = params;
  fetchEvents({
    // eventTimeFilter: eventTimeFilter.value,
    name,
    page,
    size,
    sort,
  });
}

async function getUpCommingEvent() {
  try {
    const { data: upcomingEventsResponse } = await getEvents({
      eventTimeFilter: 'UPCOMING',
      size: 2,
    });
    upcomingEvents.value = upcomingEventsResponse;
  } catch (error) {
    notify.error(error as string);
  }
}
</script>
