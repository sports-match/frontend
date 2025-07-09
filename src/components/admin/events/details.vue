<template>
  <MainContentLayout>
    <div>
      <Button variant="ghost" size="sm" @click="$router.back()">
        <ChevronLeft class="mr-2 size-4" />
        Back
      </Button>
    </div>
    <EventCard :event="event" />
    <Tabs default-value="registrations" class="w-full">
      <TabsList class="border-b border-gray-200 w-full justify-start space-x-6 bg-transparent rounded-xs">
        <TabsTrigger
          value="registrations"
          class="flex rounded-none items-center gap-1 text-black data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary px-0 pb-2 text-sm font-medium transition-colors"
        >
          <UsersIcon class="w-5 h-5" />
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
          v-if="groups?.length"
          value="groups"
          class="flex rounded-none items-center gap-1 text-black data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary px-0 pb-2 text-sm font-medium transition-colors"
        >
          <Users2Icon class="w-5 h-5" />
          Groups
        </TabsTrigger>
        <TabsTrigger
          v-if="event.status === 'IN_PROGRESS'"
          value="matches"
          class="flex rounded-none items-center gap-1 text-black data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary px-0 pb-2 text-sm font-medium transition-colors"
        >
          <ChartSpline class="w-5 h-5" />
          Generated Matches
        </TabsTrigger>
        <TabsTrigger
          v-if="event.status === 'COMPLETED'"
          value="results"
          class="flex rounded-none items-center gap-1 text-black data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary px-0 pb-2 text-sm font-medium transition-colors"
        >
          <ChartSpline class="w-5 h-5" />
          Results
        </TabsTrigger>
      </TabsList>

      <TabsContent value="registrations">
        <RegisterList
          :event="event"
          :players="playersInEvent"
          :groups="groups"
          :participants="eventParticipants"
          @pull-event="fetchEvent"
          @pull-players="() => { fetchPlayers(); fetchEventParticipants(); }"
          @pull-groups="fetchGroups"
        />
      </TabsContent>
      <TabsContent value="participants">
        <EventParticipants v-if="event" :event="event" :players="eventParticipants" @pull-players="fetchEventParticipants" />
      </TabsContent>
      <TabsContent v-if="groups?.length" value="groups">
        <GroupList :groups="groups" @generate-matches="generatingMatches" @finalize-group="finalizeGroup" />
      </TabsContent>
      <TabsContent v-if="event.status === 'IN_PROGRESS'" value="matches">
        <MatchesList :event-status="event.status" :groups="groups" />
      </TabsContent>
      <TabsContent value="results">
        <ResultList :event-status="event.status" :groups="groups" @pull-groups="fetchGroups" />
      </TabsContent>
    </Tabs>
  </MainContentLayout>
</template>

<script setup lang="ts">
import type { Event, EventParams } from '@/schemas/events';
import type { Ref } from 'vue';
import { finalizeGroups, generateMatches, getEvent, getEventGroups, getEventMatches, getEventParticipants, getEventPlayers } from '@/api/event';
import EventParticipants from '@/components/admin/events/details/EventParticipants.vue';
import GroupList from '@/components/admin/events/details/GroupList.vue';
import MatchesList from '@/components/admin/events/details/MatchesList.vue';
import RegisterList from '@/components/admin/events/details/RegisterList.vue';
import ResultList from '@/components/admin/events/details/ResultList.vue';
import EventCard from '@/components/events/DetailsCard.vue';
import MainContentLayout from '@/components/shares/main-content-layout/MainContentLayout.vue';
import { Button } from '@/components/shares/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/shares/ui/tabs';
import { notify } from '@/composables/notify';
import { ChartSpline, ChevronLeft, Users2Icon, UsersIcon } from 'lucide-vue-next';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const { id } = route.params;
const event: Ref<Event> = ref({} as Event);
const playersInEvent = ref([]);
const groups = ref([]);
const matches = ref([]);
const eventParticipants = ref([]);

onMounted(() => {
  fetchEvent();
  fetchPlayers();
  fetchGroups();
  getMatches();
  fetchEventParticipants();
});

async function fetchEventParticipants() {
  try {
    const { data } = await getEventParticipants(id as string);
    eventParticipants.value = data;
  } catch (error) {
    notify.error(error as string);
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

async function fetchPlayers(params?: EventParams) {
  try {
    const { data } = await getEventPlayers(id as string, params);
    playersInEvent.value = data;
  } catch (error) {
    notify.error(error as string);
  }
}

async function fetchGroups() {
  try {
    const { data } = await getEventGroups(id as string);
    groups.value = data;
  } catch (error) {
    notify.error (error as string);
  }
}

async function finalizeGroup() {
  try {
    await finalizeGroups(id as number);
    notify.success('Group Finalized successfully');
    fetchGroups();
  } catch (error) {
    notify.error(error as string);
  }
}

async function generatingMatches() {
  try {
    const { data } = await generateMatches(id as string);
    notify.success(data.message);
    getMatches();
    fetchGroups();
  } catch (error) {
    notify.error(error as string);
  }
}

async function getMatches() {
  try {
    const { data } = await getEventMatches(id as string);
    matches.value = data;
  } catch (error) {
    notify.error(error as string);
  }
}
</script>
