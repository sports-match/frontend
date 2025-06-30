<template>
  <div>
    <span>
      Who's Signed Up /Checked in ? ({{ players.length }}) Teams Checked in: 0
    </span>
    <Datatable
      ref="registerTable"
      :total-records="players.length"
      :columns="columns"
      :data="players || []"
      @on-sort-change="fetchData"
      @on-page-change="fetchData"
      @on-row-click="(row) => $router.push({ name: 'ViewEvent', params: { id: row.id } })"
    >
      <template #rating="{ row }">
        {{ row.original?.player?.playerSportRating[0]?.rateScore }}
      </template>
      <template #checkIn="{ row }">
        <CircleCheck v-if="row.original.status === 'CHECKED_IN'" class="size-6 text-green-500" />
        <X v-else class="size-6 text-destructive" />
      </template>
    </Datatable>
  </div>
</template>

<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table';
import Datatable from '@/components/shares/datatable/index.vue';
import { CircleCheck, X } from 'lucide-vue-next';
import { ref } from 'vue';

defineProps({
  event: {
    type: Object,
    default: () => ({}),
  },
  players: {
    type: Array,
    default: () => [],
  },
});

const registerTable = ref(null);

const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'player.name',
    header: 'Player Name',
  },
  {
    accessorKey: 'rating',
    header: 'Rating',

  },
  {
    accessorKey: 'checkIn',
    header: 'Check In?',
  },
];

function fetchData() {
  // registerTable.value?.fetchData();
}
</script>
