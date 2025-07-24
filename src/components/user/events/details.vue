<template>
  <PreviewEvent v-if="isPreview" :event @on-joined-event="onEventJoined" />
  <MainContentLayout v-else>
    <EventCard v-if="event" :event="event" />

    <!-- <div v-if="event.playerStatus === 'REGISTERED'" class="flex justify-end">
      <Button @click="checkIn">
        <CopyCheckIcon class="mr-2 size-4" />
        Check In
      </Button>
    </div> -->
    <Tabs default-value="registrations" class="w-full">
      <TabsList class="border-b border-gray-200 w-full justify-start space-x-6 bg-transparent rounded-xs">
        <TabsTrigger
          value="registrations"
          class="flex rounded-none items-center gap-1 text-black data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary px-0 pb-2 text-sm font-medium transition-colors"
        >
          <CalendarIcon class="w-5 h-5" />
          Registrations
        </TabsTrigger>

        <TabsTrigger
          value="participants"
          class="flex rounded-none items-center gap-1 text-black data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary px-0 pb-2 text-sm font-medium transition-colors"
        >
          <Users2Icon class="w-5 h-5" />
          Event Participants
        </TabsTrigger>
        <TabsTrigger
          v-if="event.status === 'IN_PROGRESS'"
          value="matchList"
          class="flex rounded-none items-center gap-1 text-black data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary px-0 pb-2 text-sm font-medium transition-colors"
        >
          <Gamepad2 class="w-5 h-5" />
          Matches
        </TabsTrigger>
        <TabsTrigger
          v-if="isCompleted"
          value="results"
          class="flex rounded-none items-center gap-1 text-black data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary px-0 pb-2 text-sm font-medium transition-colors"
        >
          <ChartSpline class="w-5 h-5" />
          Results
        </TabsTrigger>
      </TabsList>

      <TabsContent value="registrations">
        <RegisterList v-if="event" :event="event" :players="players" @pull-players="fetchPlayers" @pull-event="fetchEvent" />
      </TabsContent>
      <TabsContent value="participants">
        <EventParticipants v-if="event" :event="event" :players="eventParticipants" @pull-players="fetchEventParticipants" @pull-event="fetchEvent" />
      </TabsContent>
      <TabsContent v-if="event.status === 'IN_PROGRESS'" value="matchList">
        <MatchList :event-player-rates="eventPlayerRates" :event-status="event.status" :groups="groups" @pull-groups="fetchGroups" />
      </TabsContent>
      <TabsContent v-if="isCompleted" value="results">
        <ResultList :event-player-rates="eventPlayerRates" :event-status="event.status" :groups="groups" />
      </TabsContent>
    </Tabs>
  </MainContentLayout>
</template>

<script setup lang="ts">
import type { Event } from '@/schemas/events';
import type { Player } from '@/schemas/players';
import type { Ref } from 'vue';
import { checkinEvent, getEvent, getEventGroups, getEventMatches, getEventParticipants, getEventPlayerRate, getEventPlayers } from '@/api/event';
import EventCard from '@/components/events/DetailsCard.vue';
import MainContentLayout from '@/components/shares/main-content-layout/MainContentLayout.vue';
import { Button } from '@/components/shares/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/shares/ui/tabs';
import EventParticipants from '@/components/user/events/eventParticipants.vue';
import MatchList from '@/components/user/events/matchList.vue';
import PreviewEvent from '@/components/user/events/preview.vue';
import RegisterList from '@/components/user/events/registerList.vue';
import ResultList from '@/components/user/events/resultList.vue';
import { notify } from '@/composables/notify';
import { useUserStore } from '@/stores';
import { CalendarIcon, ChartSpline, CopyCheckIcon, Gamepad2, Users2Icon } from 'lucide-vue-next';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const userStore = useUserStore();

const { id } = route.params;
const event: Ref<Event> = ref({} as Event);
const players = ref<Player[]>([]);
const matches = ref([]);
const groups = ref([]);
const eventParticipants = ref([]);
const eventPlayerRates = ref([]);

const currentUserPlayerId = computed(() => userStore?.userDetails.playerId);
const isCompleted = computed(() => event.value?.status === 'COMPLETED');
const isPreview = computed(() => event.value?.playerStatus === 'NOT_REGISTERED');

onMounted(async () => {
  await fetchEvent();
  if (isPreview.value)
    return;
  fetchPlayers();
  fetchMatchList();
  fetchGroups();
  fetchEventParticipants();
  fetchPlayerRates();
});

async function fetchPlayerRates() {
  try {
    const { data } = await getEventPlayerRate(id as string);
    eventPlayerRates.value = data;
  } catch (error) {
    notify.error(error as string);
  }
}

async function fetchEventParticipants() {
  try {
    const { data } = await getEventParticipants(id as string);
    eventParticipants.value = data;
  } catch (error) {
    notify.error(error as string);
  }
}

function onEventJoined() {
  fetchEvent();
  fetchPlayers();
}

async function fetchGroups() {
  try {
    const { data } = await getEventGroups(id as string);
    groups.value = data;
  } catch (error) {
    notify.error (error as string);
  }
}

async function fetchEvent() {
  try {
    const { data: content } = await getEvent(id as string);
    event.value = content;
  } catch (error) {
    notify.error(error as string);
  }
}

async function fetchPlayers() {
  try {
    const { data: content } = await getEventPlayers(id as string);
    players.value = content;
  } catch (error) {
    notify.error(error as string);
  }
}

// async function checkIn() {
//   try {
//     await checkinEvent(event.value?.id, {
//       eventId: event.value?.id,
//       playerId: currentUserPlayerId.value,
//     });
//     notify.success('Checked in successfully');
//     fetchPlayers();
//   } catch (e) {
//     notify.error(e as string);
//   }
// }

async function fetchMatchList() {
  try {
    const { data: content } = await getEventMatches(id as string);
    matches.value = content;
  } catch (error) {
    notify.error(error as string);
  }
}
</script>
