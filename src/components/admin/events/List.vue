<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <form class="flex w-full max-w-xl items-center" @submit.prevent="fetchData">
        <Input id="search" v-model.trim="searchKey" type="search" placeholder="Search" />
        <Button type="submit">
          <Search class="h-4 w-4" />
        </Button>
      </form>

      <!-- <div class="flex  items-center gap-1.5">
        <slot name="action">
          <Button variant="outline">
            <Filter class="h-4 w-4 mr-2 opacity-60" />
            <span class="text-sm font-semibold opacity-60">Filter</span>
          </Button>
        </slot>
      </div> -->
    </div>

    <Datatable
      ref="eventTable"
      :total-records="totalEvents"
      :columns="columns"
      :data="eventList"
      @on-sort-change="fetchData"
      @on-page-change="fetchData"
      @on-row-click="(row) => $router.push({ name: 'ViewEvent', params: { id: row.original.id } })"
    >
      <template #eventTime="{ row }">
        {{ formatDate(row.original?.eventTime) }}
      </template>
      <template #currentParticipants="{ row }">
        <div class="flex items-center gap-2">
          <Percentage :percentage="(row.original?.currentParticipants * 100 / row.original.maxParticipants) || 0" />
          {{ row.original.currentParticipants || 0 }}
        </div>
      </template>
      <template #status="{ row }">
        <StatusIndicator :status="row.original.status" />
      </template>
      <template #actions="{ row }">
        <SharesDialog :event="row.original">
          <template #trigger>
            <Button variant="ghost" size="sm" @click.stop>
              <QrCode class="size-4" />
            </Button>
          </template>
        </SharesDialog>
        <ReminderDialog :event="row.original" all-players>
          <Button v-if="row.original.status?.toLowerCase() !== 'completed'" variant="ghost" size="sm" @click.stop>
            <ClockAlert class="size-4" />
          </Button>
        </ReminderDialog>
        <DropdownMenu v-if="row.original.status?.toLowerCase() !== 'completed'">
          <DropdownMenuTrigger as-child @click.stop>
            <Button variant="ghost" size="sm">
              <Ellipsis class="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem @click.stop="completeEvent(row.original.id)">
              <Check class="size-4 mr-2" />
              Complete
            </DropdownMenuItem>
            <DropdownMenuItem class="text-destructive" @click.stop="deletingEvent(row.original.id)">
              <Trash class="size-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </template>
    </Datatable>
  </div>
</template>

<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table';
import { deleteEvent, updateEventStatus } from '@/api/event';
import ColumnHeader from '@/components/shares/datatable/ColumnHeader.vue';
import Datatable from '@/components/shares/datatable/index.vue';
import ReminderDialog from '@/components/shares/dialogs/ReminderDialog.vue';
import SharesDialog from '@/components/shares/dialogs/SharesDialog.vue';
import Percentage from '@/components/shares/Percentage.vue';
import StatusIndicator from '@/components/shares/StatusIndicator.vue';
import { Button } from '@/components/shares/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/shares/ui/dropdown-menu';
import { Input } from '@/components/shares/ui/input';
import { notify } from '@/composables/notify';
import { useAlertDialog } from '@/composables/useAlertDialog';
import { formatDate } from '@/utils/common';
import { Check, ClockAlert, Ellipsis, QrCode, Search, Trash } from 'lucide-vue-next';
import { computed, h, ref } from 'vue';

const props = defineProps({
  events: {
    type: Array,
    default: () => [],
  },
  totalEvents: {
    type: Number,
    default: 0,
  },
});
const emit = defineEmits(['onFetch']);

const columns: ColumnDef<any>[] = [
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
    accessorKey: 'currentParticipants',
    header: ({ column }) => h(ColumnHeader, { column, title: 'Signed up' }),
  },
  {
    accessorKey: 'groupCount',
    header: ({ column }) => h(ColumnHeader, { column, title: 'Courts' }),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => h(ColumnHeader, { column, title: 'Status' }),
  },
  {
    id: 'actions',
    header: 'Actions',
  },
];

const eventList = computed(() => props.events);
const eventTable = ref();

const searchKey = ref('');
function fetchData() {
  const { table } = eventTable.value;
  const { pagination: { pageIndex: page, pageSize: size }, sorting } = table?.getState();
  const sort = sorting.length === 0 ? '' : `${sorting[0]?.id},${sorting[0]?.desc ? 'desc' : 'asc'}`;
  emit('onFetch', { name: searchKey.value, page, size, sort });
}

const alertDialog = useAlertDialog();

async function completeEvent(id: string) {
  const confirmed = await alertDialog({
    title: 'Complete Event?',
    description: 'Are you sure you want to complete this event?',
    confirmText: 'Confirm',
  });

  if (confirmed) {
    try {
      await updateEventStatus(id, 'COMPLETED');
      fetchData();
    } catch (error) {
      notify.error(error as string);
    }
  }
}

async function deletingEvent(id: string) {
  const confirmed = await alertDialog({
    title: 'Delete Event?',
    description: 'Are you sure you want to delete this event? This cannot be undone.',
    confirmText: 'Delete',
    confirmVariant: 'destructive',
  });

  if (confirmed) {
    try {
      const { data: { data } } = await deleteEvent(id);
      fetchData();
      notify.success(data.success || 'Event deleted successfully');
    } catch (error) {
      notify.error(error as string);
    }
  }
}
</script>
