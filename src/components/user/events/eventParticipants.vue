<template>
  <div>
    <span>
      Who's Signed Up /Checked in ? ({{ players.length || 0 }}) Teams Checked in: {{ players?.filter((p) => p.status === 'CHECKED_IN')?.length || 0 }}
    </span>
    <Datatable
      ref="participantsTable"
      :total-records="players.length"
      :columns="columns"
      :data="players || []"
      @on-sort-change="getPlayers"
      @on-page-change="getPlayers"
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
    accessorKey: 'rating',
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
