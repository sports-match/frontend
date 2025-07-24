<template>
  <div>
    <div class="flex justify-end">
      <Button
        v-if="event.playerStatus === 'CHECKED_IN'"
        variant="destructive"
        size="sm"
        @click.stop="widthdraw"
      >
        <Dock class="size-4 me-1" />Widthdraw
      </Button>
    </div>
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
import { withdrawEvent } from '@/api/event';
import Datatable from '@/components/shares/datatable/index.vue';
import { Button } from '@/components/shares/ui/button';
import { notify } from '@/composables/notify';
import { useUserStore } from '@/stores';
import { CircleCheck, Dock, X } from 'lucide-vue-next';
import { computed, ref } from 'vue';

const props = defineProps<{
  event: Event;
  players: Player[];
}>();

const emit = defineEmits(['pullPlayers', 'pullEvent']);

const userStore = useUserStore();

const participantsTable = ref();

const currentUserPlayerId = computed(() => userStore?.userDetails.playerId);
// const isCurrentUser = computed(() => props.players?.find((p: any) => p.player?.id === currentUserPlayerId.value));

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

async function widthdraw() {
  try {
    await withdrawEvent(props.event?.id, {
      eventId: props.event?.id,
      playerId: currentUserPlayerId.value,
    });
    notify.success('Widthdraw event successfully');
    emit('pullEvent');
  } catch (e) {
    notify.error(e as string);
  }
}
</script>
