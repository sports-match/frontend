<template>
  <div>
    <span>
      Who's Signed Up /Checked in ? ({{ players.totalElements }}) Teams Checked in: 0
    </span>
    <Datatable
      ref="registerTable"
      :total-records="players.totalElements"
      :columns="columns"
      :data="players.content || []"
      @on-sort-change="fetchData"
      @on-page-change="fetchData"
      @on-row-click="(row) => $router.push({ name: 'ViewEvent', params: { id: row.id } })"
    />
  </div>
</template>

<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table';
import ColumnHeader from '@/components/shares/datatable/ColumnHeader.vue';
import { h, ref } from 'vue';

defineProps({
  players: {
    type: Object,
    default: () => ({}),
  },
});

const registerTable = ref(null);

const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => h(ColumnHeader, { column, title: 'Player Name' }),
  },
  {
    accessorKey: 'partner',
    header: ({ column }) => h(ColumnHeader, { column, title: 'Partner' }),
  },
  {
    accessorKey: 'combineRate',
    header: ({ column }) => h(ColumnHeader, { column, title: 'Combined Rating' }),

  },
  {
    accessorKey: 'rank',
    header: ({ column }) => h(ColumnHeader, { column, title: 'Rank' }),
  },
  {
    accessorKey: 'checkIn',
    header: ({ column }) => h(ColumnHeader, { column, title: 'Check In?' }),
  },
];

function fetchData() {
  // registerTable.value?.fetchData();
}
</script>
