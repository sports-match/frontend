<template>
  <div>
    <span>
      Who's Signed Up /Checked in ? ({{ players.length || 0 }}) Teams Checked in: 0
    </span>
    <Datatable
      ref="registerTable"
      :total-records="players.length"
      :columns="columns"
      :data="players || []"
      @on-sort-change="getPlayers"
      @on-page-change="getPlayers"
    >
      <template #playerName="{ row }">
        {{ row.original?.player?.name }} ({{ row.original?.player?.playerSportRating[0]?.rateScore }})
      </template>
      <template #partner="{ row }">
        {{ row.original?.partner }}
        <span v-if="row.original?.partner?.playerSportRating[0]?.rateScore">
          ({{ row.original?.partner?.playerSportRating[0]?.rateScore }})
        </span>
        <PlayerSearchDialog
          v-if="row.original?.player?.id === currentUserPlayerId"
          :event="event"
          :player-id="row.original?.player?.id"
          @on-submit="getPlayers"
        >
          <Button variant="destructive" size="sm">
            <User class="size-4 me-1" /> Select Partner
          </Button>
        </PlayerSearchDialog>
      </template>
      <template #status="{ row }">
        <div>
          <CircleCheck
            v-if="row.original?.status === 'CHECKED_IN' && row.original?.player?.id !== currentUserPlayerId"
            class="size-8 text-green-500"
          />
        </div>
        <Button
          v-if="row.original?.player?.id === currentUserPlayerId"
          variant="destructive"
          size="sm"
          @click.stop="widthdraw(row.original.player.id)"
        >
          <Dock class="size-4 me-1" />Widthdraw
        </Button>
      </template>
    </Datatable>
  </div>
</template>

<script setup lang="ts">
import type { Event } from '@/schemas/events';
import type { Player } from '@/schemas/players';
import { withdrawEvent } from '@/api/event';
import Datatable from '@/components/shares/datatable/index.vue';
import PlayerSearchDialog from '@/components/shares/dialogs/PlayerSearchDialog.vue';
import { Button } from '@/components/shares/ui/button';
import { notify } from '@/composables/notify';
import { useUserStore } from '@/stores';
import { CircleCheck, Dock, User } from 'lucide-vue-next';
import { computed, ref } from 'vue';

const props = defineProps<{
  event: Event;
  players: Player[];
}>();

const emit = defineEmits(['pullPlayers', 'pullGroups', 'pullEvent']);

const userStore = useUserStore();

const registerTable = ref();

const currentUserPlayerId = computed(() => userStore?.userDetails.playerId);

const columns = computed(() => [
  {
    accessorKey: 'playerName',
    header: 'Player Name',
  },
  ...props.event?.format === 'DOUBLE'
    ? [
        {
          accessorKey: 'partner',
          header: 'Partner',
        },
        {
          accessorKey: 'rating',
          header: 'Combined Rating',
        },
      ]
    : [],
  {
    accessorKey: 'status',
    header: 'Check In?',
  },
]);

function getPlayers() {
  const { table } = registerTable.value;
  const { pagination: { pageIndex, pageSize } } = table?.getState();
  emit('pullPlayers', { page: pageIndex, size: pageSize });
}

function pullEvent() {
  emit('pullEvent');
}

async function widthdraw(playerId: string | number) {
  try {
    await withdrawEvent(props.event?.id, {
      eventId: props.event?.id,
      playerId,
    });
    notify.success('Widthdraw event successfully');
    pullEvent();
  } catch (e) {
    notify.error(e as string);
  }
}
</script>
