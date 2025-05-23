<template>
  <MainContentLayout>
    <div>
      <Button variant="icon" size="sm" @click="$router.push('/events')">
        <ChevronLeft class="mr-2 size-4" />
        Back
      </Button>
    </div>
    <EventCard />
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
        <RegisterList />
      </TabsContent>
      <TabsContent value="groups">
        <GroupList />
      </TabsContent>
      <TabsContent value="results">
        <div class="p-4">
          <h2 class="text-lg font-semibold mb-2">
            Results
          </h2>
          <p class="text-sm text-gray-500">
            No results available yet.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  </MainContentLayout>
</template>

<script setup lang="ts">
import EventCard from '@/components/events/details/Card.vue';
import GroupList from '@/components/events/details/GroupList.vue';
import RegisterList from '@/components/events/details/RegisterList.vue';
import MainContentLayout from '@/components/shares/main-content-layout/MainContentLayout.vue';
import { Button } from '@/components/shares/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/shares/ui/tabs';
import { ChartSpline, ChevronLeft, Users2Icon, UsersIcon } from 'lucide-vue-next';
</script>
