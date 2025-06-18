<template>
  <MainContentLayout>
    <template #title>
      Welcome Back, {{ userStore.userDetails?.user?.username }}
    </template>
    <template #action>
      <CreateEvent />
    </template>

    <div v-if="!pending" class="flex flex-col gap-4">
      <EventCard />
      <CalendarSection />
      <EventList :events />
    </div>
    <PendingOverlay v-if="pending" />
  </MainContentLayout>
</template>

<script setup lang="ts">
import { getEvents } from '@/api/event';
import CalendarSection from '@/components/events/CalendarSection.vue';
import EventCard from '@/components/events/Card.vue';
import CreateEvent from '@/components/events/CreateForm.vue';
import EventList from '@/components/events/List.vue';
import { MainContentLayout } from '@/components/shares/main-content-layout';
import PendingOverlay from '@/components/shares/PendingOverlay.vue';
import { notify } from '@/composables/notify';
import { useEventStore } from '@/stores/event';
import { useUserStore } from '@/stores/user';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const userStore = useUserStore();
const route = useRoute();

const { pending } = route.query;

const events = ref<any[]>([]);
const totalEvents = ref(0);

onMounted(() => {
  fetchData();
});

async function fetchData() {
  try {
    const { data } = await getEvents();
    events.value = data.content;
    totalEvents.value = data.totalElements;
  } catch (error) {
    notify.error(error as string);
  }
}
</script>
