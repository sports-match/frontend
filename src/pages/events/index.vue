<template>
  <MainContentLayout>
    <template #title>
      Events
    </template>

    <div class="flex flex-col gap-4">
      <EventList :events :total-events @on-fetch="fetchData">
        <template #action>
          <span />
        </template>
      </EventList>
    </div>
  </MainContentLayout>
</template>

<script setup lang="ts">
import { getEvents } from '@/api/event';
import EventList from '@/components/events/List.vue';
import { MainContentLayout } from '@/components/shares/main-content-layout';
import { notify } from '@/composables/notify';
import { onMounted, ref } from 'vue';

const events = ref<any[]>([]);
const totalEvents = ref(0);

onMounted(() => {
  fetchData();
});

async function fetchData() {
  try {
    const { data } = await getEvents();
    events.value = data.content;
    totalEvents.value = data.totalElements;
  } catch (error) {
    notify.error(error as string);
  }
}
</script>
