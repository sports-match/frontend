<template>
  <MainContentLayout>
    <template #title>
      Welcome Back, {{ userStore.userDetails?.user?.username }}
    </template>
    <template #action>
      <CreateEvent />
    </template>

    <div v-if="!pending" class="flex flex-col gap-4">
      <EventCard :events="upcomingEvents?.content" />
      <CalendarSection :events="upcomingEvents?.content" @on-date-change="dateChange" />
      <EventList :events="events?.content" :total-events="events?.totalElements" @on-fetch="searchEvents" />
    </div>
    <PendingOverlay v-if="pending" />
  </MainContentLayout>
</template>

<script setup lang="ts">
import { getEvents } from '@/api/event';
import EventList from '@/components/admin/events/List.vue';
import CalendarSection from '@/components/events/CalendarSection.vue';
import EventCard from '@/components/events/Card.vue';
import CreateEvent from '@/components/events/CreateForm.vue';
import { MainContentLayout } from '@/components/shares/main-content-layout';
import PendingOverlay from '@/components/shares/PendingOverlay.vue';
import { notify } from '@/composables/notify';
import { useUserStore } from '@/stores/user';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const userStore = useUserStore();
const route = useRoute();

const { pending } = route.query;

const events = ref<{ content: []; totalElements: number }>();
const upcomingEvents = ref<{ content: []; totalElements: number }>();

onMounted(() => {
  fetchData();
});

async function dateChange(date: string) {
  try {
    const { data } = await getEvents({ date });
    events.value = data;
  } catch (error) {
    notify.error(error as string);
  }
}

async function searchEvents(searchKey: string) {
  try {
    const { data } = await getEvents({
      name: searchKey,
    });
    events.value = data;
  } catch (error) {
    notify.error(error as string);
  }
}
async function fetchData() {
  try {
    const [eventsResponse, upcomingEventsResponse] = await Promise.all([
      getEvents(),
      getEvents({
        eventTimeFilter: 'UPCOMING',
        size: 2,
      }),
    ]);
    events.value = eventsResponse.data;
    upcomingEvents.value = upcomingEventsResponse.data;
  } catch (error) {
    notify.error(error as string);
  }
}
</script>
