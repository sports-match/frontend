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
      <template #actions="{ row }">
        <div class="flex gap-1">
          <Button v-if="row.original.status !== 'CHECKED_IN' && event.status === 'CHECK_IN'" class="bg-green-500 hover:bg-green-400" size="icon" @click.stop="checkIn(row.original?.player?.id)">
            <CircleCheck class="size-4" />
          </Button>
          <Button v-if="event.status === 'PUBLISHED' || event.status === 'CHECK_IN'" variant="destructive" size="icon" @click.stop="widthdraw(row.original?.player?.id)">
            <Dock class="size-4" />
          </Button>
        </div>
      </template>
    </Datatable>
  </div>
</template>

<script setup lang="ts">
import type { Event } from '@/schemas/events';
import type { Player } from '@/schemas/players';
import type { ColumnDef } from '@tanstack/vue-table';
import { checkinEvent, withdrawEvent } from '@/api/event';
import Datatable from '@/components/shares/datatable/index.vue';
import { Button } from '@/components/shares/ui/button';
import { notify } from '@/composables/notify';
import { CircleCheck, Dock, X } from 'lucide-vue-next';
import { ref } from 'vue';

const props = defineProps<{
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
  ...props.event?.format === 'DOUBLE'
    ? [{
        accessorKey: 'actions',
        header: 'Actions',
      }]
    : [],
];

function getPlayers() {
  const { table } = participantsTable.value;
  const { pagination: { pageIndex, pageSize } } = table?.getState();
  emit('pullPlayers', { page: pageIndex, size: pageSize });
}

async function checkIn(playerId: string | number) {
  try {
    await checkinEvent(props.event?.id, {
      eventId: props.event?.id,
      playerId,
    });
    notify.success('Checked in successfully');
    getPlayers();
  } catch (e) {
    notify.error(e as string);
  }
}

async function widthdraw(playerId: string | number) {
  try {
    await withdrawEvent(props.event?.id, {
      eventId: props.event?.id,
      playerId,
    });
    notify.success('Widthdraw event successfully');
    getPlayers();
  } catch (e) {
    notify.error(e as string);
  }
}
</script>
