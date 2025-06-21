<template>
  <div class="flex flex-col gap-4">
    <!-- {{ events }} -->
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
          <Percentage :percentage="(row.original?.currentParticipants * 100 / row.original.maxParticipants) || 0" />
          {{ row.original.currentParticipants }}
        </div>
      </template>
      <template #status="{ row }">
        <div> {{ row.original.status }} </div>
        <div class="flex items-center gap-2">
          <Button variant="destructive" size="sm">
            <CreditCardIcon class="size-4 me-1" />
            Widthdraw
          </Button>
          <Button size="sm">
            <CircleCheck class="size-4 me-1" />
            Check in
          </Button>
        </div>
      </template>
    </Datatable>
  </div>
</template>

<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table';
import ColumnHeader from '@/components/shares/datatable/ColumnHeader.vue';
import Datatable from '@/components/shares/datatable/index.vue';
import Percentage from '@/components/shares/Percentage.vue';
import { Button } from '@/components/shares/ui/button';
import { CircleCheck, CreditCardIcon } from 'lucide-vue-next';
import { computed, h, ref } from 'vue';

const props = defineProps({
  events: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(['onFetch']);

const eventList = computed(() => props.events?.content || []);
const totalRecords = computed(() => props.events?.totalElements || 0);
const eventTable = ref();

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
    accessorKey: 'location',
    header: ({ column }) => h(ColumnHeader, { column, title: 'Location' }),

  },
  {
    accessorKey: 'signedUp',
    header: ({ column }) => h(ColumnHeader, { column, title: 'Signed up' }),
  },
  {
    accessorKey: 'organizer',
    header: ({ column }) => h(ColumnHeader, { column, title: 'Organizer' }),
  },
  {
    accessorKey: 'groupCount',
    header: ({ column }) => h(ColumnHeader, { column, title: 'Courts' }),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => h(ColumnHeader, { column, title: 'Status' }),
  },
];

function fetchData() {
  emit('onFetch');
}
</script>
