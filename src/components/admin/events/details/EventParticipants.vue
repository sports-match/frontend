<template>
  <div>
    <Datatable
      ref="participantsTable"
      :total-records="players.length"
      :columns="columns"
      :data="players || []"
      @on-sort-change="getPlayers"
      @on-page-change="getPlayers"
    >
      <template #checkIn="{ row }">
        <CircleCheck v-if="row.original.status === 'CHECKED_IN'" class="size-6 text-green-500" />
        <X v-else class="size-6 text-destructive" />
      </template>
    </Datatable>
  </div>
</template>

<script setup lang="ts">
import type { Event } from '@/schemas/events';
import type { Player } from '@/schemas/players';
import type { ColumnDef } from '@tanstack/vue-table';
import Datatable from '@/components/shares/datatable/index.vue';
import { CircleCheck, X } from 'lucide-vue-next';
import { ref } from 'vue';

defineProps<{
  event: Event;
  players: Player[];
}>();

const emit = defineEmits(['pullPlayers']);

const participantsTable = ref();

const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'player.name',
    header: 'Player Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'score',
    header: 'Rating',

  },
  {
    accessorKey: 'checkIn',
    header: 'Check In?',
  },
];

function getPlayers() {
  const { table } = participantsTable.value;
  const { pagination: { pageIndex, pageSize } } = table?.getState();
  emit('pullPlayers', { page: pageIndex, size: pageSize });
}
</script>
