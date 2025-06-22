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
          value="groups"
          class="flex rounded-none items-center gap-1 text-black data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary px-0 pb-2 text-sm font-medium transition-colors"
        >
          <Users2Icon class="w-5 h-5" />
          Event Participants
        </TabsTrigger>
        <TabsTrigger
          value="results"
          class="flex rounded-none items-center gap-1 text-black data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary px-0 pb-2 text-sm font-medium transition-colors"
        >
          <ChartSpline class="w-5 h-5" />
          Results
        </TabsTrigger>
      </TabsList>

      <TabsContent value="registrations">
        <RegisterList :players="players" />
      </TabsContent>
      <TabsContent value="groups">
        <GroupList />
      </TabsContent>
      <TabsContent value="results">
        <ResultList />
      </TabsContent>
    </Tabs>
  </MainContentLayout>
</template>

<script setup lang="ts">
import { checkinEvent, getEvent, getEventPlayers } from '@/api/event';
import EventCard from '@/components/events/details/Card.vue';
import MainContentLayout from '@/components/shares/main-content-layout/MainContentLayout.vue';
import { Button } from '@/components/shares/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/shares/ui/tabs';
import RegisterList from '@/components/user/events/registerList.vue';
import { notify } from '@/composables/notify';
import { CalendarIcon, ChartSpline, CopyCheckIcon, Users2Icon } from 'lucide-vue-next';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const { id } = route.params;
const event = ref(null);
const players = ref();

onMounted(() => {
  fetchEvent();
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
</script>
