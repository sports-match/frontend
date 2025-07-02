<template>
  <div class="flex flex-col gap-4">
    <Datatable
      ref="eventTable"
      :total-records="totalRecords"
      :columns="columns"
      :data="eventList"
      @on-page-change="onPageChange"
      @on-row-click="(row) => $router.push({ name: 'ViewEvent', params: { id: row.original.id } })"
    >
      <template #eventTime="{ row }">
        {{ new Date(row.original?.eventTime).toLocaleString() }}
      </template>
      <template #signedUp="{ row }">
        <div class="flex items-center gap-2">
          <Percentage :percentage="(row.original?.currentParticipants * 100 / row.original.maxParticipants) || 0" />
          {{ row.original.currentParticipants || 0 }}
        </div>
      </template>
      <template #status="{ row }">
        <div v-if="!row.original.isPublic" class="text-destructive font-semibold">
          This event is private
        </div>
        <div v-if="row.original.status === 'IN_PROGRESS'" class="text-green-500 font-semibold">
          Event is in progress
        </div>
        <div v-if="row.original.isPublic && row.original.status !== 'IN_PROGRESS'">
          <div> {{ row.original.status }} </div>
          <div class="flex items-center gap-2">
            <Button variant="destructive" size="sm" @click.stop="widthdraw(row.original.id)">
              <CreditCardIcon class="size-4 me-1" />
              Widthdraw
            </Button>
            <Button v-if="row.original.status === 'CHECK_IN'" size="sm" @click.stop="checkIn(row.original.id)">
              <CircleCheck class="size-4 me-1" />
              Check in
            </Button>
            <Button size="sm" @click.stop="signUpEvent(row.original.id)">
              <CalendarPlus class="size-5 me-1" />
              Sign Up
            </Button>
          </div>
        </div>
      </template>
    </Datatable>
  </div>
</template>

<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table';
import { checkinEvent, joinEvent, withdrawEvent } from '@/api/event';
import Datatable from '@/components/shares/datatable/index.vue';
import Percentage from '@/components/shares/Percentage.vue';
import { Button } from '@/components/shares/ui/button';
import { notify } from '@/composables/notify';
import { useUserStore } from '@/stores/user';
import { CalendarPlus, CircleCheck, CreditCardIcon } from 'lucide-vue-next';
import { computed, ref } from 'vue';

const props = defineProps({
  events: {
    type: Object,
    default: () => ({}),
  },
});
const emit = defineEmits(['onFetch']);

const userStore = useUserStore();

const eventList = computed(() => props.events?.content || []);
const totalRecords = computed(() => props.events?.totalElements || 0);
const eventTable = ref();
const playerId = computed(() => userStore.playerId || null);

const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'eventTime',
    header: 'Date',
  },
  {
    accessorKey: 'name',
    header: 'Event Name',
  },
  {
    accessorKey: 'location',
    header: 'Location',

  },
  {
    accessorKey: 'signedUp',
    header: 'Signed up',
  },
  {
    accessorKey: 'organizer',
    header: 'Organizer',
  },
  {
    accessorKey: 'groupCount',
    header: 'Courts',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
];

function onPageChange(pageInfo: { pageIndex: number; pageSize: number }) {
  fetchData(pageInfo);
}

function fetchData(pageInfo?: { pageIndex: number; pageSize: number }) {
  emit('onFetch', pageInfo);
}

async function checkIn(id: string | number) {
  try {
    await checkinEvent(id as string, {
      eventId: id,
      playerId: playerId.value,
    });
    notify.success('Checked in successfully');
    fetchData();
  } catch (e) {
    notify.error(e as string);
  }
}

async function widthdraw(id: string | number) {
  try {
    await withdrawEvent(id as string, {
      eventId: id,
      playerId: playerId.value,
    });
    notify.success('Widthdraw event successfully');
    fetchData();
  } catch (e) {
    notify.error(e as string);
  }
}

async function signUpEvent(id: string | number) {
  try {
    await joinEvent(id as string, {
      eventId: id,
      playerId: playerId.value,
      joinWaitList: true,

    });
    notify.success('Joined event successfully');
  } catch (e) {
    notify.error(e as string);
  }
}
</script>
