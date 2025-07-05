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
                {{ dashboard.doubleEventRating }}
              </div>
              <div
                class="text-sm"
                :class="{
                  'text-green-500': dashboard.singleEventRatingChanges > 0,
                  'text-red-500': dashboard.singleEventRatingChanges < 0,
                }"
              >
                {{ dashboard.doubleEventRatingChanges }}
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
              {{ dashboard.totalEvent }}
            </div>
            <div>
              Times
            </div>
          </div>
        </div>

        <!-- Ratings Progress Chart -->
        <div class="bg-white rounded-xl">
          <GraphView :data="dashboard" />
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
        <UpcomingCalendar :events="dashboard.upcomingEvents" />
      </div>
    </div>
    <div class="mt-6">
      <DashboardTabs :events="playerEvents" />
    </div>
  </MainContentLayout>
</template>

<script setup lang="ts">
import type { Dashboard } from '@/schemas/dashboard';
import { getPlayerEvents, playersDashboard } from '@/api/user';
import { MainContentLayout } from '@/components/shares/main-content-layout';
import DashboardTabs from '@/components/user/dashboardTabs.vue';
import GraphView from '@/components/user/graphView.vue';
import UpcomingCalendar from '@/components/user/upcomingCalendar.vue';
import { notify } from '@/composables/notify';
import { useUserStore } from '@/stores/user';
import { Calendar1, User, Users } from 'lucide-vue-next';
import { computed, onMounted, ref } from 'vue';

const userStore = useUserStore();
const dashboard = ref<Partial<Dashboard>>({});

const playerId = computed(() => userStore?.userDetails.playerId);
const playerEvents = ref<any[]>([]);

onMounted(() => {
  fetchData();
});

async function fetchData() {
  try {
    const { data } = await playersDashboard(playerId.value);
    const { data: eventSummary } = await getPlayerEvents(playerId.value);
    playerEvents.value = eventSummary;
    dashboard.value = data;
  } catch (error) {
    notify.error(error as string);
  }
}
</script>
