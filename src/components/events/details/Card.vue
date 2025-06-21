<template>
  <div class="bg-black text-white rounded-2xl flex items-center justify-between shadow-lg">
    <div class="flex-1 p-6">
      <h2 class="text-xl font-semibold mb-2">
        {{ event?.name }}
        <!-- NWBA - Bel-Red - NWBA - Bel-Red Fixed Partner Rotary Doubles Mixer -->
      </h2>
      <div class="flex items-center text-sm text-gray-300 mb-4">
        <svg
          class="w-4 h-4 mr-2 text-white" fill="none" stroke="currentColor" stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round" stroke-linejoin="round"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <!-- Thu May 15, 2025, 8:00 PM -->
        {{ event?.eventTime }}
      </div>

      <div class="flex space-x-2">
        <Button variant="outline" size="sm" class="bg-black text-white border-white rounded-xl">
          <Copy class="mr-2 size-4" />
          <span>https://go.gl/xprowi2025</span>
        </Button>

        <Button variant="outline" size="sm" class="bg-black text-white border-white rounded-xl">
          <Link class="mr-2 size-4" />
          Share
        </Button>
        <template v-if="!isPlayer">
          <Button variant="outline" size="sm" class="bg-black text-white border-white rounded-xl">
            <ClockAlert class="size-4" />
          </Button>
          <ReminderDialog>
            <Button variant="outline" size="sm" class="bg-black text-yellow-500 border-yellow-500 hover:bg-yellow-500 hover:text-white rounded-xl">
              <CircleAlert class="size-4" />
            </Button>
          </ReminderDialog>
        </template>
      </div>
    </div>

    <div class="flex items-center">
      <img
        src="@/assets/images/racket.svg" alt="racket"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import ReminderDialog from '@/components/shares/dialogs/ReminderDialog.vue';
import { Button } from '@/components/shares/ui/button';
import { useAuthentication } from '@/composables';
import { CircleAlert, ClockAlert, Copy, Link } from 'lucide-vue-next';

defineProps({
  event: {
    type: Object,
    required: false,
  },
});
const { isPlayer } = useAuthentication();
</script>
