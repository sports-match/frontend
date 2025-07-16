<template>
  <MainContentLayout>
    <template #title>
      Welcome Back, {{ userStore.userDetails?.user?.user?.username }}
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
          <Card class="rounded-xl p-6 space-y-2">
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
                  'text-green-500': dashboard.doubleEventRatingChanges > 0,
                  'text-destructive': dashboard.doubleEventRatingChanges < 0,
                }"
              >
                {{ dashboard.doubleEventRatingChanges }}
                <template v-if="dashboard.doubleEventRatingChanges !== 0">
                  <ArrowUp v-if="dashboard.doubleEventRatingChanges > 0" class="w-4 h-4 text-green-500" />
                  <ArrowDown v-else class="w-4 h-4 text-destructive" />
                </template>
              </div>
            </div>
          </Card>

          <!-- Singles Rating -->
          <Card class="rounded-xl p-6 space-y-2">
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
                  'text-destructive': dashboard.singleEventRatingChanges < 0,
                }"
              >
                {{ dashboard.singleEventRatingChanges }}
                <template v-if="dashboard.singleEventRatingChanges !== 0">
                  <ArrowUp v-if="dashboard.singleEventRatingChanges > 0" class="w-4 h-4 text-green-500" />
                  <ArrowDown v-else class="w-4 h-4 text-destructive" />
                </template>
              </div>
            </div>
          </Card>

          <!-- Total Events -->
          <Card class="rounded-xl p-6 space-y-2">
            <div class="text-sm flex justify-between items-start">
              <span class="text-gray-500">Total Events</span>
              <div class="bg-gray-100 p-2 rounded-full">
                <Calendar1 class="size-8" />
              </div>
            </div>
            <div class="text-2xl font-bold">
              {{ dashboard.totalEvent }}
            </div>
            <div>
              Times
            </div>
          </Card>
        </div>

        <!-- Ratings Progress Chart -->

        <GraphView :data="dashboard" />
        <!-- Chart component here -->
      </div>

      <!-- Sidebar (right, 1/3 width) -->
      <div class="flex flex-col gap-6">
        <!-- Last Match Card -->
        <div class="bg-gradient-to-r from-gray-900 to-black text-white p-6 rounded-xl flex flex-col">
          <h2 class="text-lg font-semibold mb-2">
            Last Match
          </h2>
          <template v-if="getLastMatchTextAndDate.text">
            <p class="text-xl font-bold">
              {{ getLastMatchTextAndDate.text }}
            </p>
            <p class="text-sm text-gray-400 mt-auto">
              {{ formatDate(getLastMatchTextAndDate.date) || '' }}
            </p>
          </template>
          <template v-else>
            <p class="text-sm text-gray-400 h-12 mt-auto">
              No Record yet
            </p>
          </template>
        </div>

        <!-- Calendar & Events -->
        <Card class="flex-1 items-stretch rounded-xl">
          <UpcomingCalendar :event-today="dashboard.eventToday" :events="dashboard.upcomingEvents" />
        </Card>
      </div>
    </div>
    <div class="mt-6">
      <DashboardTabs :upcoming-events="upcomingEvents" :recent-events="pastEvents" :completed-events="completedEvents" />
    </div>
  </MainContentLayout>
</template>

<script setup lang="ts">
import type { Dashboard } from '@/schemas/dashboard';
import { getEvents } from '@/api/event';
import { playersDashboard } from '@/api/user';
import { MainContentLayout } from '@/components/shares/main-content-layout';
import { Card } from '@/components/shares/ui/card';
import DashboardTabs from '@/components/user/dashboardTabs.vue';
import GraphView from '@/components/user/graphView.vue';
import UpcomingCalendar from '@/components/user/upcomingCalendar.vue';
import { notify } from '@/composables/notify';
import { useUserStore } from '@/stores/user';
import { formatDate } from '@/utils/common';
import { ArrowDown, ArrowUp, Calendar1, User, Users } from 'lucide-vue-next';
import { computed, onMounted, ref } from 'vue';

const userStore = useUserStore();
const dashboard = ref<Partial<Dashboard>>({});
const upcomingEvents = ref([]);
const pastEvents = ref([]);
const completedEvents = ref([]);

const playerId = computed(() => userStore?.userDetails.playerId);

onMounted(() => {
  fetchData();
  fetchUpcoming();
  fetchPast();
  fetchCompleted();
});

async function fetchUpcoming() {
  try {
    const { data: { content } } = await getEvents({
      size: 5,
      sort: 'eventTime',
      eventTimeFilter: 'UPCOMING',
      playerId: playerId.value,
    });
    upcomingEvents.value = content;
  } catch (error) {
    notify.error(error as string);
  }
}

async function fetchPast() {
  try {
    const { data: { content } } = await getEvents({
      size: 5,
      sort: 'eventTime',
      eventTimeFilter: 'PAST',
      playerId: playerId.value,
    });
    pastEvents.value = content;
  } catch (error) {
    notify.error(error as string);
  }
}

async function fetchCompleted() {
  try {
    const { data: { content } } = await getEvents({
      size: 10,
      sort: 'eventTime',
      status: 'COMPLETED',
      playerId: playerId.value,
    });
    completedEvents.value = content;
  } catch (error) {
    notify.error(error as string);
  }
}

async function fetchData() {
  try {
    const { data } = await playersDashboard(playerId.value as number);
    dashboard.value = data;
  } catch (error) {
    notify.error(error as string);
  }
}

const getLastMatchTextAndDate = computed(() => {
  const lastMatch = dashboard.value?.lastMatch;
  if (!lastMatch)
    return { text: '', date: null };

  const isWin = lastMatch.teamAWin || lastMatch.teamBWin;
  const isTeamA = lastMatch.teamAWin === true;
  const opponent = isTeamA ? lastMatch.teamB.name : lastMatch.teamA.name;
  const result = isWin ? 'Won' : 'Lost';

  // Try to find latest rating update time
  const allRatings = [
    ...lastMatch.teamA.teamPlayers,
    ...lastMatch.teamB.teamPlayers,
  ].flatMap(tp => tp.player.playerSportRating);

  const updateTimes = allRatings.map(r => new Date(r.updateTime));
  const latestUpdate = updateTimes.length > 0 ? new Date(Math.max(...updateTimes)) : null;

  return {
    text: `${result} vs ${opponent}`,
    date: latestUpdate,
  };
});
</script>
