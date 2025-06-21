<template>
  <MainContentLayout>
    <EventCard :event="event" />

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
        <RegisterList />
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
import EventCard from '@/components/events/details/Card.vue';
import MainContentLayout from '@/components/shares/main-content-layout/MainContentLayout.vue';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/shares/ui/tabs';
import { CalendarIcon, ChartSpline, Users2Icon } from 'lucide-vue-next';
import { ref } from 'vue';

const event = ref({
  name: 'May 9th Mukilteo Mixer Standard Doubles Mixer',
  eventTime: '2025-06-19 14:00:00',
  signedUp: 20,
  capacity: 25,
  organizer: 'Northwest Badminton Academy',
  location: 'Northwest Badminton Academy',
  courts: 4,
});
</script>
