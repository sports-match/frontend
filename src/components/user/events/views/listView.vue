<template>
  <div class="flex flex-col gap-4">
    <Datatable
      ref="eventTable"
      :total-records="totalEvents"
      :columns="columns"
      :data="events"
      :hide-pagination
      @on-page-change="fetchData" @on-sort-change="fetchData"

      @on-row-click="(row) => $router.push({ name: 'ViewEvent', params: { id: row.original.id } })"
    >
      <template #name="{ row }">
        <slot name="name">
          {{ row.original?.name }}
        </slot>
      </template>
      <template #eventTime="{ row }">
        {{ formatDate(row.original?.eventTime) }}
      </template>
      <template #signedUp="{ row }">
        <div class="flex items-center gap-2">
          <Percentage :percentage="(row.original?.currentParticipants * 100 / row.original.maxParticipants) || 0" />
          {{ row.original.currentParticipants || 0 }} / {{ row.original.maxParticipants }}
        </div>
      </template>
      <template #status="{ row }">
        <div v-if="!row.original.isPublic" class="text-destructive font-semibold">
          This event is private
        </div>
        <div v-else-if="row.original.status === 'IN_PROGRESS'" class="text-green-500 font-semibold">
          Event is in progress
        </div>
        <div v-if="row.original.isPublic && row.original.status !== 'IN_PROGRESS'">
          <div> {{ row.original.status }} </div>
          <div v-if="row.original.status !== 'COMPLETED'" class="flex items-center gap-2">
            <Button v-if="row.original.playerStatus === 'REGISTERED'" variant="destructive" size="sm" @click.stop="widthdraw(row.original.id)">
              <CreditCardIcon class="size-4 me-1" />
              Widthdraw
            </Button>
            <Button v-if="row.original.status === 'CHECK_IN' && row.original.playerStatus === 'REGISTERED'" size="sm" @click.stop="checkIn(row.original.id)">
              <CircleCheck class="size-4 me-1" />
              Check in
            </Button>
            <Button v-if="row.original.playerStatus === 'NOT_REGISTERED' && row.original.playerStatus !== 'REGISTERED'" size="sm" @click.stop="signUpEvent(row.original.id)">
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
import ColumnHeader from '@/components/shares/datatable/ColumnHeader.vue';
import Datatable from '@/components/shares/datatable/index.vue';
import Percentage from '@/components/shares/Percentage.vue';
import { Button } from '@/components/shares/ui/button';
import { notify } from '@/composables/notify';
import { useUserStore } from '@/stores/user';
import { formatDate } from '@/utils/common';
import { CalendarPlus, CircleCheck, CreditCardIcon } from 'lucide-vue-next';
import { computed, h, ref } from 'vue';

defineProps({
  events: {
    type: Array,
    default: () => [],
  },
  totalEvents: {
    type: Number,
    default: 0,
  },
  hidePagination: {
    type: Boolean,
    default: false,
  },
  columns: {
    type: Array,
    default: () => [
      {
        accessorKey: 'eventTime',
        header: ({ column }) => h(ColumnHeader, { column, title: 'Date' }),
      },
      {
        accessorKey: 'name',
        header: ({ column }) => h(ColumnHeader, { column, title: 'Event Name' }),
      },
      {
        accessorKey: 'club.location',
        header: ({ column }) => h(ColumnHeader, { column, title: 'Location' }),
      },
      {
        accessorKey: 'signedUp',
        header: ({ column }) => h(ColumnHeader, { column, title: 'Signed up' }),
      },
      {
        accessorKey: 'club.name',
        header: ({ column }) => h(ColumnHeader, { column, title: 'Organizer' }),
      },
      {
        accessorKey: 'groupCount',
        header: ({ column }) => h(ColumnHeader, { column, title: 'Courts' }),
      },
      {
        accessorKey: 'status',
        header: 'Status',
      },
    ],
  },
});
const emit = defineEmits(['onFetch']);

const userStore = useUserStore();

const eventTable = ref();
const playerId = computed(() => userStore?.userDetails.playerId || null);

// const columns: ColumnDef<any>[] = [
//   {
//     accessorKey: 'eventTime',
//     header: ({ column }) => h(ColumnHeader, { column, title: 'Date' }),
//   },
//   {
//     accessorKey: 'name',
//     header: ({ column }) => h(ColumnHeader, { column, title: 'Event Name' }),
//   },
//   {
//     accessorKey: 'club.location',
//     header: ({ column }) => h(ColumnHeader, { column, title: 'Location' }),
//   },
//   {
//     accessorKey: 'signedUp',
//     header: ({ column }) => h(ColumnHeader, { column, title: 'Signed up' }),
//   },
//   {
//     accessorKey: 'club.name',
//     header: ({ column }) => h(ColumnHeader, { column, title: 'Organizer' }),
//   },
//   {
//     accessorKey: 'groupCount',
//     header: ({ column }) => h(ColumnHeader, { column, title: 'Courts' }),
//   },
//   {
//     accessorKey: 'status',
//     header: 'Status',
//   },
// ];

function fetchData() {
  const { table } = eventTable.value;
  const { pagination: { pageIndex: page, pageSize: size }, sorting } = table?.getState();
  const sort = sorting.length === 0 ? '' : `${sorting[0]?.id},${sorting[0]?.desc ? 'desc' : 'asc'}`;
  emit('onFetch', { page, size, sort });
}

async function checkIn(id: number | number) {
  try {
    await checkinEvent(id, {
      eventId: id,
      playerId: playerId.value,
    });
    notify.success('Checked in successfully');
    fetchData();
  } catch (e) {
    notify.error(e as string);
  }
}

async function widthdraw(id: number | number) {
  try {
    await withdrawEvent(id, {
      eventId: id,
      playerId: playerId.value,
    });
    notify.success('Widthdraw event successfully');
    fetchData();
  } catch (e) {
    notify.error(e as string);
  }
}

async function signUpEvent(id: number) {
  try {
    await joinEvent(id, {
      eventId: id,
      playerId: playerId.value,
      joinWaitList: true,
    });
    fetchData();
    notify.success('Joined event successfully');
  } catch (e) {
    notify.error(e as string);
  }
}

defineExpose({
  eventTable,
});
</script>
