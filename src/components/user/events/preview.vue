<template>
  <div class="bg-white text-gray-800 font-sans">
    <!-- Hero Section -->
    <div v-if="imageUrl" class="relative bg-blue-900 text-white p-6 md:p-12 h-56">
      <img :src="imageUrl" alt="SportRevive Logo" class="absolute inset-0 h-full w-full object-cover">
      <div class="relative" :style="imageUrl ? '' : 'background-color: #3498db'" />
    </div>

    <!-- Title -->
    <div class="max-w-7xl mx-auto px-4 py-6">
      <h1 class="text-2xl md:text-3xl font-bold">
        {{ event?.name }}
      </h1>
      <p class="text-sm mt-1 inline-flex items-center">
        <MapPin class="size-4 mr-1" /> {{ event?.club?.name }}
      </p>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 px-4 pb-12">
      <!-- Description and Details -->
      <div class="md:col-span-3 space-y-4">
        <h2 class="text-lg font-semibold">
          Description
        </h2>
        <p>{{ event?.description }}</p>
        <div class="grid grid-cols-2 gap-4 mt-6 text-sm">
          <div><strong>Organizer:</strong> {{ event?.club?.name }} ({{ event?.club?.location }})</div>
          <div><strong>Format:</strong> {{ event?.format }}</div>
          <div><strong>Max Player:</strong> {{ event?.maxParticipants }}</div>
          <div><strong>Date:</strong> {{ formatDate(event?.eventTime) }}</div>
        </div>

        <!-- Tags -->
        <div class="flex flex-wrap gap-2 mt-4">
          <strong>Tag:</strong>
          <span v-for="tag in event?.tags" :key="tag" class="px-3 py-1 bg-gray-100 rounded-full text-sm">{{ tag }}</span>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="border rounded-lg p-6">
        <Button class="w-full" :disabled="isAuthenticated && !event?.isPublic || event.status === 'COMPLETED'" @click="signUpEvent">
          <CalendarArrowUp class="mr-2 size-4" />
          Sign up
        </Button>

        <div class="mt-6 space-y-3 text-sm">
          <div class="flex justify-between">
            <strong class="text-gray-600">Entry Fee:</strong>
            <span>N/A</span>
          </div>
          <div class="flex justify-between">
            <strong class="text-gray-600">Courts:</strong>
            {{ event?.groupCount }}
          </div>
          <div class="flex justify-between">
            <strong class="text-gray-600">Groups:</strong>
            <span>{{ event?.groupCount || 0 }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Event } from '@/schemas/events';
import { joinEvent } from '@/api/event';
import { Button } from '@/components/shares/ui/button';
import { useAuthentication } from '@/composables';
import { notify } from '@/composables/notify';
import { useUserStore } from '@/stores';
import { formatDate } from '@/utils/common';
import { CalendarArrowUp, MapPin } from 'lucide-vue-next';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps<{
  event: Event;
}>();
const emit = defineEmits(['onJoinedEvent']);
const router = useRouter();
const route = useRoute();
const { isAuthenticated } = useAuthentication();

const userStore = useUserStore();

const imageUrl = computed(() => {
  if (!props.event?.posterImage)
    return false;
  return `${import.meta.env.VITE_API_URL}${props.event?.posterImage}`;
});

const playerId = computed(() => userStore?.userDetails?.playerId || null);

async function signUpEvent() {
  if (!isAuthenticated.value) {
    router.push({ name: 'AuthLoginPage', query: { redirect: route.fullPath } });
    return;
  }
  const id = props.event.id;
  try {
    await joinEvent(id, {
      eventId: id,
      playerId: playerId.value,
      joinWaitList: true,
    });
    emit('onJoinedEvent');
    notify.success('Joined event successfully');
  } catch (e) {
    notify.error(e as string);
  }
}
</script>
