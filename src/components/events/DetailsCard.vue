<template>
  <div class="bg-black text-white rounded-2xl flex items-center justify-between shadow-lg md:flex-row flex-col-reverse">
    <div class="flex-1 p-4 md:p-6 md:order-1 order-2">
      <!-- Event Title -->
      <h2 class="text-lg md:text-xl font-semibold mb-2 leading-snug break-words">
        {{ event?.name }}
      </h2>

      <!-- Date Info -->
      <div class="flex items-center text-sm text-gray-400 mb-4">
        <svg
          class="w-4 h-4 mr-2 text-white shrink-0"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span class="truncate">{{ formatDate(event?.eventTime) }}</span>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-2 sm:space-y-0">
        <!-- Copy Link -->
        <Button
          variant="outline"
          size="sm"
          class="bg-black text-white border-white rounded-xl w-full sm:w-auto"
          @click="copyLink"
        >
          <Copy class="md:mr-2 size-4" />
          <span class="truncate sm:block hidden xs:block">{{ link }}</span>
        </Button>

        <!-- Share Dialog -->
        <SharesDialog :event="event" />

        <!-- Reminder (if not player) -->
        <template v-if="!isPlayer">
          <ReminderDialog :event="event" all-players>
            <Button
              variant="outline"
              size="sm"
              class="bg-black text-yellow-500 border-yellow-500 hover:bg-yellow-500 hover:text-white rounded-xl w-full sm:w-auto"
            >
              <ClockAlert class="size-4" />
            </Button>
          </ReminderDialog>
        </template>
      </div>
    </div>

    <div class="hidden md:flex md:items-center md:order-2 order-1">
      <img
        src="@/assets/images/racket.svg" alt="racket"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Event } from '@/schemas/events';
import type { PropType } from 'vue';
import ReminderDialog from '@/components/shares/dialogs/ReminderDialog.vue';
import SharesDialog from '@/components/shares/dialogs/SharesDialog.vue';
import { Button } from '@/components/shares/ui/button';
import { useAuthentication } from '@/composables';
import { notify } from '@/composables/notify';
import { formatDate } from '@/utils/common';
import { useClipboard } from '@vueuse/core';

import { ClockAlert, Copy } from 'lucide-vue-next';
import { computed } from 'vue';

const props = defineProps({
  event: {
    type: Object as PropType<Event>,
    required: true,
  },
});

const { isPlayer } = useAuthentication();

const link = computed(() => `${window.location.origin}/#/events/${props.event?.id}`);

function copyLink() {
  const { copy, isSupported } = useClipboard();

  if (isSupported) {
    copy(link.value)
      .then(() => {
        notify.success('Link copied!');
      })
      .catch(() => {
        console.error('Failed to copy link');
      });
  } else {
    console.error('Clipboard API not supported');
  }
}
</script>
