<template>
  <MainContentLayout>
    <EventCard :event="event" />

    <div class="flex justify-end">
      <Button @click="checkin">
        <CopyCheckIcon class="mr-2 size-4" />
        Chick In
      </Button>
    </div>
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
        <RegisterList :event="event" :players="players" />
      </TabsContent>
      <TabsContent value="participants">
        <EventParticipants :event="event" :players="players" />
      </TabsContent>
      <TabsContent value="matchList">
        <MatchList :matches="matches" />
      </TabsContent>
      <TabsContent v-if="isCompleted" value="results">
        <ResultList :event="event" :players="players" />
      </TabsContent>
    </Tabs>
  </MainContentLayout>
</template>

<script setup lang="ts">
import { checkinEvent, getEvent, getEventMatches, getEventPlayers } from '@/api/event';
import EventCard from '@/components/events/details/Card.vue';
import MainContentLayout from '@/components/shares/main-content-layout/MainContentLayout.vue';
import { Button } from '@/components/shares/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/shares/ui/tabs';
import EventParticipants from '@/components/user/events/eventParticipants.vue';
import MatchList from '@/components/user/events/matchList.vue';
import RegisterList from '@/components/user/events/registerList.vue';
import ResultList from '@/components/user/events/resultList.vue';
import { notify } from '@/composables/notify';
import { CalendarIcon, ChartSpline, CopyCheckIcon, Gamepad2, Users2Icon } from 'lucide-vue-next';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const { id } = route.params;
const event = ref({});
const players = ref([]);
const matches = ref([]);

const isCompleted = computed(() => event.value?.status === 'COMPLETED');
onMounted(() => {
  fetchEvent();
  fetchMatchList();
});

async function fetchEvent() {
  try {
    const { data: content } = await getEvent(id as string);
    event.value = content;
    const { data: registers } = await getEventPlayers(id as string);
    players.value = registers;
  } catch (error) {
    notify.error(error as string);
  }
}

async function checkin() {
  try {
    await checkinEvent(id as string);
    notify.success('Checked in successfully');
  } catch (e) {
    notify.error(e as string);
  }
}

async function fetchMatchList() {
  try {
    const { data: content } = await getEventMatches(id as string);
    matches.value = content;
  } catch (error) {
    notify.error(error as string);
  }
}
</script>
