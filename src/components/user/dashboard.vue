<template>
  <MainContentLayout>
    <template #title>
      Welcome Back, {{ userStore.userDetails?.user?.username }}
    </template>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Content (left, 2/3 width) -->
      <div class="lg:col-span-2 flex flex-col gap-6">
        <!-- Achievements & Next Challenges -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="col-span-2 py-8 bg-gradient-to-r from-gray-900 to-black text-white p-6 rounded-xl flex justify-between items-center">
            <div>
              <h2 class="text-lg font-semibold flex items-center gap-2">
                <span class="i-lucide-bar-chart-3" /> Achievements
              </h2>
              <div class="text-2xl mt-2">
                🥇 🥈 🌟
              </div>
            </div>
            <div>
              <h2 class="text-lg font-semibold flex items-center gap-2">
                <span class="i-lucide-rocket" /> Next Challenges
              </h2>
              <div class="text-2xl mt-2">
                🏅 🥈 🏆
              </div>
            </div>
          </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Doubles Rating -->
          <div class="bg-white text-black rounded-xl p-6 shadow space-y-2">
            <div class="text-sm flex justify-between items-start">
              <span class="text-gray-500">SSR</span>
              <div class="bg-gray-100 p-2 rounded-full">
                <Users class="size-8" />
              </div>
            </div>
            <div class="font-semibold text-lg">
              Doubles Rating
            </div>
            <div class="flex justify-between items-center gap-2">
              <div class="text-2xl font-bold">
                5990
              </div>
              <div class="text-sm text-red-500">
                -90
              </div>
            </div>
          </div>

          <!-- Singles Rating -->
          <div class="bg-white text-black rounded-xl p-6 shadow space-y-2">
            <div class="text-sm flex justify-between items-start">
              <span class="text-gray-500">SSR</span>
              <div class="bg-gray-100 p-2 rounded-full">
                <User class="size-8" />
              </div>
            </div>
            <div class="font-semibold text-lg">
              Singles Rating
            </div>
            <div class="flex justify-between items-center gap-2">
              <div class="text-2xl font-bold">
                5990
              </div>
              <div class="text-sm text-green-500">
                +2450
              </div>
            </div>
          </div>

          <!-- Total Events -->
          <div class="bg-white text-black rounded-xl p-6 shadow space-y-2">
            <div class="text-sm flex justify-between items-start">
              <span class="text-gray-500">Total Events</span>
              <div class="bg-gray-100 p-2 rounded-full">
                <Calendar1 class="size-8" />
              </div>
            </div>
            <!-- <div class="font-semibold text-lg">
            Total Events
          </div> -->
            <div class="text-2xl font-bold">
              4
            </div>
            <div>
              Times
            </div>
          </div>
        </div>

        <!-- Ratings Progress Chart -->
        <div class="bg-white rounded-xl">
          <GraphView />
        <!-- Chart component here -->
        </div>
      </div>

      <!-- Sidebar (right, 1/3 width) -->
      <div class="flex flex-col gap-6">
        <!-- Last Match Card -->
        <div class="bg-gradient-to-r from-gray-900 to-black text-white p-6 rounded-xl">
          <h2 class="text-lg font-semibold mb-2">
            Last Match
          </h2>
          <p class="text-xl font-bold">
            Won vs Parker
          </p>
          <p class="text-sm text-gray-400">
            May 12, 2025
          </p>
        </div>
        <!-- Calendar & Events -->
        <UpcomingCalendar />
      </div>
    </div>
  </MainContentLayout>
</template>

<script setup lang="ts">
import { getEvents } from '@/api/event';
import { MainContentLayout } from '@/components/shares/main-content-layout';
import { Calendar } from '@/components/shares/ui/calendar';
import UpcomingCalendar from '@/components/user/upcomingCalendar.vue';
import { notify } from '@/composables/notify';
import { useUserStore } from '@/stores/user';
import { Calendar1, User, Users } from 'lucide-vue-next';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import GraphView from './graphView.vue';

const selectedDate = ref(new Date());
const userStore = useUserStore();
// const route = useRoute();

// const events = ref<any[]>([]);
// const totalEvents = ref(0);

// onMounted(() => {
//   fetchData();
// });

// async function fetchData() {
//   try {
//     const { data } = await getEvents();
//     events.value = data.content;
//     totalEvents.value = data.totalElements;
//   } catch (error) {
//     notify.error(error as string);
//   }
// }
</script>
