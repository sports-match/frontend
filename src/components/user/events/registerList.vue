<template>
  <div>
    <span>
      Who's Signed Up /Checked in ? ({{ players.length || 0 }}) Teams Checked in: {{ players?.filter((p) => p.status === 'CHECKED_IN')?.length || 0 }}
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
        <span v-if="row.original?.partner?.name">
          {{ row.original?.partner?.name }}
          <span v-if="row.original?.partner?.playerSportRating[0]?.rateScore">
            ({{ row.original?.partner?.playerSportRating[0]?.rateScore }})
          </span>
        </span>
        <span v-if="!row.original?.partner?.name && row.original?.player?.id !== currentUserPlayerId">
          <span class="text-destructive">Not yet...</span>
        </span>
        <PlayerSearchDialog
          v-if="row.original?.player?.id === currentUserPlayerId"
          :event="event"
          :team-id="row.original?.teamId"
          :exclude-ids="[row.original?.player?.id]"
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
            v-if="row.original?.status === 'CHECKED_IN'"
            class="size-6 text-green-500"
          />
          <X v-if="row.original?.status !== 'CHECKED_IN' && row.original?.player?.id !== currentUserPlayerId" class="size-6 text-red-500" />
        </div>
        <div v-if="row.original?.player?.id === currentUserPlayerId || row.original?.partner?.id === currentUserPlayerId" class="flex gap-2">
          <div v-if="row.original?.status !== 'CHECKED_IN'" v-tooltip="event.status === 'CHECK_IN' ? '' : getCheckInCountdown(event.checkInStart)">
            <Button
              size="sm" :disabled="event.status !== 'CHECK_IN'" @click="checkIn"
            >
              <CopyCheckIcon class="size-4 me-2" />
              <span class="inline-block whitespace-nowrap">
                Check In
              </span>
            </Button>
          </div>
          <Button
            v-if="row.original?.status !== 'CHECKED_IN'"
            variant="destructive"
            size="sm"
            @click.stop="widthdraw"
          >
            <Dock class="size-4 me-1" />Widthdraw
          </Button>
        </div>
      </template>
    </Datatable>
  </div>
</template>

<script setup lang="ts">
import type { Event } from '@/schemas/events';
import type { Player } from '@/schemas/players';
import { checkinEvent, withdrawEvent } from '@/api/event';
import Datatable from '@/components/shares/datatable/index.vue';
import PlayerSearchDialog from '@/components/shares/dialogs/PlayerSearchDialog.vue';
import { Button } from '@/components/shares/ui/button';
import { notify } from '@/composables/notify';
import { useUserStore } from '@/stores';
import { getCheckInCountdown } from '@/utils/common';
import { CircleCheck, CopyCheckIcon, Dock, User, X } from 'lucide-vue-next';
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
          accessorKey: 'combinedScore',
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

async function checkIn() {
  try {
    await checkinEvent(props.event?.id, {
      eventId: props.event?.id,
      playerId: currentUserPlayerId.value,
    });
    notify.success('Checked in successfully');
    pullEvent();
    getPlayers();
  } catch (e) {
    notify.error(e as string);
  }
}

async function widthdraw() {
  try {
    await withdrawEvent(props.event?.id, {
      eventId: props.event?.id,
      playerId: currentUserPlayerId.value,
    });
    notify.success('Widthdraw event successfully');
    pullEvent();
  } catch (e) {
    notify.error(e as string);
  }
}
</script>
