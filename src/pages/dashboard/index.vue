<template>
  <MainContentLayout>
    <template #title>
      Welcome Back, {{ user.displayName }}
    </template>

    <div class="flex flex-col gap-4">
      <EventCard />
      <CalendarSection />
      <EventList />
    </div>
  </MainContentLayout>
</template>

<script setup lang="ts">
import CalendarSection from '@/components/events/CalendarSection.vue';
import EventCard from '@/components/events/Card.vue';
import EventList from '@/components/events/List.vue';
import { MainContentLayout } from '@/components/shares/main-content-layout';
import { useUserStore } from '@/stores/user';
import { computed } from 'vue';

const userStore = useUserStore();

const user = computed(() => userStore.userDetails);
</script>
