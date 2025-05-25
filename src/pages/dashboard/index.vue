<template>
  <MainContentLayout>
    <template #title>
      Welcome Back, {{ user.displayName }}
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
import CalendarSection from '@/components/events/CalendarSection.vue';
import EventCard from '@/components/events/Card.vue';
import EventList from '@/components/events/List.vue';
import { MainContentLayout } from '@/components/shares/main-content-layout';
import PendingOverlay from '@/components/shares/PendingOverlay.vue';
import { useEventStore } from '@/stores/event';
import { useUserStore } from '@/stores/user';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const userStore = useUserStore();
const eventStore = useEventStore();
const route = useRoute();

const { pending } = route.query;
const events = computed(() => eventStore.events);

const user = computed(() => userStore.userDetails);
</script>
