<template>
  <div
    class="bg-white rounded-2xl border py-2 px-1 flex items-start max-w-full"
  >
    <!-- Calendar Section -->
    <div class="hidden sm:block">
      <Calendar
        v-model="date"
        initial-focus
        @update:model-value="handleDateChange"
      />
    </div>

    <!-- Divider -->
    <Separator orientation="vertical" class="mx-4 h-auto hidden sm:block" />

    <!-- Upcoming Events Section -->
    <div class="flex-1 pt-4">
      <div class="flex items-center gap-2 mb-2">
        <h2 class="text-xl font-semibold">
          Upcoming Events
        </h2>
        <span class="bg-red-100 text-red-600 rounded-full px-2 py-0.5 text-xs font-bold">{{ onlyTwoEvents.length }}</span>
      </div>
      <p class="text-gray-500 mb-4">
        <!-- {{ new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }} -->
      </p>
      <!-- Event 1 -->
      <template v-if="onlyTwoEvents.length">
        <div v-for="event in onlyTwoEvents" :key="event.id" class="flex gap-4 mb-6">
          <div class="text-gray-400 text-sm flex-shrink-0 pt-1">
            {{ formatDate(event.eventTime) }}
          </div>
          <div class="flex-1">
            <router-link :to="{ name: 'ViewEvent', params: { id: event.id } }">
              <h3 class="font-semibold text-lg hover:underline">
                {{ event.name }}
              </h3>
            </router-link>
            <div class="flex gap-2 mt-2">
              <span class="bg-gray-100 text-gray-700 rounded px-2 py-0.5 text-xs">
                {{ event.format }}
              </span>
            </div>
            <div class="flex items-center gap-2 mt-2 text-gray-500 text-sm">
              <MapPinned class="size-4" />
              <span>{{ event.location }}</span>
              <span>#Courts({{ event.groupCount }})</span>
            </div>
          </div>
        </div>
      </template>
      <div v-else class="flex-1 text-accent-foreground/50">
        No Upcomming Event
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Event } from '@/schemas/events';
import type { ComputedRef, PropType } from 'vue';
import { Calendar } from '@/components/shares/ui/calendar';
import { Separator } from '@/components/shares/ui/separator';
import { formatDate } from '@/utils/common';
import { MapPinned } from 'lucide-vue-next';
import { computed, ref } from 'vue';

const props = defineProps({
  events: {
    type: Array as PropType<Event[]>,
    default: () => [],
  },
});
// const emit = defineEmits(['onDateChange']);

const date = ref();

const onlyTwoEvents: ComputedRef<Event[]> = computed(() => props.events?.slice(0, 2));
function handleDateChange() {
  // emit('onDateChange', date.value);
}
</script>
