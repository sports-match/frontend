<template>
  <div class="bg-black text-white rounded-2xl flex items-center justify-between shadow-lg">
    <div class="flex-1 p-6">
      <div class="flex items-center font-semibold text-2xl mb-4">
        {{ event?.name }}
      </div>
      <h2 class="text-lg font-semibold mb-2">
        {{ event?.description }}
      </h2>
      <div class="flex items-center text-sm text-gray-300 mb-4">
        {{ event?.eventTime }}
      </div>

      <div class="flex space-x-2">
        <Button variant="outline" size="sm" class="bg-black text-white border-white rounded-xl" @click="$router.push(`/events/${event?.id}`)">
          <Calendar class="mr-2 size-4" />
          Event Detail
        </Button>

        <Button variant="outline" size="sm" class="bg-black text-white border-white rounded-xl">
          <Link class="mr-2 size-4" />
          Share
        </Button>
        <Button variant="outline" size="sm" class="bg-black text-white border-white rounded-xl">
          <ClockAlert class="size-4" />
        </Button>
        <Button variant="outline" size="sm" class="bg-black text-yellow-500 border-yellow-500 hover:bg-yellow-500 hover:text-white rounded-xl">
          <CircleAlert class="size-4" />
        </Button>
      </div>
    </div>

    <div class="flex items-center">
      <img
        src="@/assets/images/tennis.svg" alt="Event image"
        class="h-52 w-auto object-contain"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Event } from '@/api/event';
import type { ComputedRef, PropType } from 'vue';
import { Button } from '@/components/shares/ui/button';
import { Calendar, CircleAlert, ClockAlert, Link } from 'lucide-vue-next';
import { computed } from 'vue';

const props = defineProps({
  events: {
    type: Array as PropType<Event[]>,
    required: false,
  },
});

const event: ComputedRef<Event | undefined> = computed(() => props.events?.[0]);
</script>
