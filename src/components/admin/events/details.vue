<template>
  <MainContentLayout>
    <div>
      <Button variant="ghost" size="sm" @click="$router.push('/events')">
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
          value="groups"
          class="flex rounded-none items-center gap-1 text-black data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary px-0 pb-2 text-sm font-medium transition-colors"
        >
          <Users2Icon class="w-5 h-5" />
          Groups
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
        <RegisterList
          :event="event"
          :players="playersInEvent"
          @pull-event="fetchEvent"
          @pull-players="fetchPlayers"
        />
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
import { getEvent, getEventPlayers } from '@/api/event';
import GroupList from '@/components/admin/events/details/GroupList.vue';
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
const event = ref([]);
const playersInEvent = ref([]);

onMounted(() => {
  fetchEvent();
  fetchPlayers();
});

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
    const { data } = await getEventPlayers(id as string);
    playersInEvent.value = data;
  } catch (error) {
    notify.error(error as string);
  }
}
</script>
