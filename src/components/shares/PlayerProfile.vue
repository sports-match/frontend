<template>
  <div class="grid grid-cols-1 gap-6">
    <div class="flex justify-between flex-col sm:flex-row p-6 bg-gradient-to-r from-gray-900 to-black rounded-xl shadow-lg text-white w-full relative">
      <div class="flex flex-col space-y-2">
        <h2 class="flex items-center gap-2 text-xl font-semibold">
          {{ dashboard.player?.name }}
          <span v-if="dashboard.player?.verified" class="text-green-400"><CircleCheck class="size-4" /></span>
        </h2>
        <p class="text-sm text-gray-300 flex items-center gap-2">
          <MapPin class="size-4" /> {{ dashboard.player?.location || 'Northwest Badminton Academy (Bel-Red)' }}
        </p>
        <div class="flex space-x-4 pt-6 mt-4">
          <div class="bg-transparent text-white border border-white rounded-xl p-6 py-2 shadow space-y-2 w-56">
            <div class="font-semibold text-lg">
              Doubles Rating
            </div>
            <div class="flex justify-between items-center gap-2">
              <div class="text-2xl font-bold">
                {{ dashboard.doubleEventRating }}
              </div>
              <div
                class="text-sm"
                :class="{
                  'text-green-500': dashboard.doubleEventRatingChanges > 0,
                  'text-red-500': dashboard.doubleEventRatingChanges < 0,
                }"
              >
                {{ dashboard.doubleEventRatingChanges }}
              </div>
            </div>
          </div>
          <div class="bg-transparent text-white border border-white rounded-xl p-6 py-2 shadow space-y-2 w-56">
            <div class="font-semibold text-lg">
              Single Rating
            </div>
            <div class="flex justify-between items-center gap-2">
              <div class="text-2xl font-bold">
                {{ dashboard.singleEventRating }}
              </div>
              <div
                class="text-sm"
                :class="{
                  'text-green-500': dashboard.singleEventRatingChanges > 0,
                  'text-red-500': dashboard.singleEventRatingChanges < 0,
                }"
              >
                {{ dashboard.singleEventRatingChanges }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col justify-between space-y-2">
        <div>
          <p class="text-xl mb-2">
            Next Challenges
          </p>
          <div class="flex space-x-2">
            <span class="text-2xl">🏅</span>
            <span class="text-2xl">🏆</span>
          </div>
        </div>
        <div>
          <p class="text-xl mb-2">
            Achievements
          </p>
          <div class="flex space-x-2">
            <span class="text-2xl">🏆</span>
            <span class="text-2xl">🌟</span>
            <span class="text-2xl">🏸</span>
          </div>
        </div>
      </div>

      <img
        class="absolute right-4 top-28 flex items-center h-32 opacity-25"
        src="@/assets/images/racket.svg" alt="racket"
      >
      <div />
    </div>

    <!-- Ratings Progress Chart -->
    <div class="bg-white rounded-xl">
      <GraphView :data="dashboard" />
    </div>
  </div>
</template>

<script setup lang="ts">
import GraphView from '@/components/user/graphView.vue';
import { CircleCheck, MapPin } from 'lucide-vue-next';

defineProps<{
  dashboard: {
    player?: {
      name?: string;
      verified?: boolean;
      location?: string;
    };
    doubleEventRating?: number;
    doubleEventRatingChanges?: number;
    singleEventRating?: number;
    singleEventRatingChanges?: number;
  };
}>();
</script>
