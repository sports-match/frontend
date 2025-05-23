<template>
  <MainContentLayout>
    <template #title>
      Upcoming Events
    </template>

    <div class="flex flex-col gap-4">
      <EventList>
        <template #action>
          <Button>
            <Plus class="mr-2 size-4" />
            Create Event
          </Button>
        </template>
      </EventList>
    </div>
  </MainContentLayout>
</template>

<script setup lang="ts">
import EventList from '@/components/events/List.vue';
import { MainContentLayout } from '@/components/shares/main-content-layout';
import { Button } from '@/components/shares/ui/button';
import { Plus } from 'lucide-vue-next';
</script>
