<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <form class="flex w-full max-w-xl items-center" @submit.prevent="onFilterUpdate">
        <Input id="search" v-model.trim="searchKey" type="search" placeholder="Search" />
        <Button type="submit">
          <Search class="h-4 w-4" />
        </Button>
      </form>

      <div class="flex  items-center gap-1.5">
        <slot name="action">
          <Button variant="outline">
            <Filter class="h-4 w-4 mr-2 opacity-60" />
            <span class="text-sm font-semibold opacity-60">Filter</span>
          </Button>
        </slot>
      </div>
    </div>

    <Datatable
      ref="eventTable"
      :total-records="totalRecords"
      :columns="columns"
      :data="eventList"
      @on-sort-change="fetchData"
      @on-page-change="fetchData"
    >
      <template #signedUp="{ row }">
        <div class="flex items-center gap-2">
          <Percentage :percentage="row.original.signedUpPercent" />
          {{ row.original.signedUp }}
        </div>
      </template>
      <template #status="{ row }">
        <StatusIndicator :status="row.original.status" />
      </template>
      <template #actions="{ row }">
        <Button variant="ghost" size="sm">
          <QrCode class="size-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <Files class="size-4" />
        </Button>
        <Button v-if="row.original.status?.toLowerCase() !== 'completed'" variant="ghost" size="sm">
          <ClockAlert class="size-4" />
        </Button>
        <DropdownMenu v-if="row.original.status?.toLowerCase() !== 'completed'">
          <DropdownMenuTrigger as-child>
            <Button variant="ghost" size="sm">
              <Ellipsis class="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem @click="$router.push({ name: 'ViewEvent', params: { id: row.original.id } })">
              <Eye class="size-4 mr-2" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit class="size-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Check class="size-4 mr-2" />
              Complete
            </DropdownMenuItem>
            <DropdownMenuItem class="text-destructive">
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
// import type { NotifyError } from '@/composables/notify';
import type { ColumnDef } from '@tanstack/vue-table';
import ColumnHeader from '@/components/shares/datatable/ColumnHeader.vue';
import Datatable from '@/components/shares/datatable/index.vue';
import Percentage from '@/components/shares/Percentage.vue';
import StatusIndicator from '@/components/shares/StatusIndicator.vue';
import { Button } from '@/components/shares/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/shares/ui/dropdown-menu';
import { Input } from '@/components/shares/ui/input';
import { useEventStore } from '@/stores/event';
// import SelectInput from '@/components/shares/ui/select/SelectInput.vue';
import { Check, ClockAlert, Edit, Ellipsis, Eye, Files, Filter, QrCode, Search, Trash } from 'lucide-vue-next';
import { computed, h, onMounted, ref } from 'vue';

const props = defineProps({
  events: {
    type: Array,
    default: () => [],
  },
});
const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'date',
    header: ({ column }) => h(ColumnHeader, { column, title: 'Date' }),
  },
  {
    accessorKey: 'eventName',
    header: ({ column }) => h(ColumnHeader, { column, title: 'Event Name' }),
  },
  {
    accessorKey: 'location',
    header: ({ column }) => h(ColumnHeader, { column, title: 'Location' }),

  },
  {
    accessorKey: 'signedUp',
    header: ({ column }) => h(ColumnHeader, { column, title: 'Signed up' }),
  },
  {
    accessorKey: 'courts',
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
const totalRecords = ref(0);
const eventTable = ref();

const searchKey = ref('');

function fetchData() {
  // const { data } = await getEventList();
  // eventList.value = data;
  // totalRecords.value = data.length;
  // eventTable.value.setPageCount(data.length);
}

function onFilterUpdate() {
  fetchData();
}
</script>
