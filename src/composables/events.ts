import type { Event, EventParams } from '@/schemas/events';
import { getEvents } from '@/api/event';
import { notify } from '@/composables/notify';
import { ref } from 'vue';

const events = ref<Event[]>();
const totalEvents = ref(0);

async function fetchEvents(params: EventParams) {
  try {
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value !== null && value !== ''),
    );

    const { page = 0, size = 15 } = filteredParams;
    const { data } = await getEvents({ ...filteredParams, page, size });
    events.value = data.content;
    totalEvents.value = data.totalElements;
  } catch (error) {
    notify.error(error as string);
  }
}

export { events, fetchEvents, totalEvents };
