<template>
  <div class="bg-white rounded-2xl p-4 shadow flex flex-col gap-4">
    <!-- Top bar -->
    <div class="flex items-center justify-between gap-4">
      <form class="flex items-center w-full max-w-md" @submit.prevent>
        <Input v-model="search" placeholder="Search" class="w-full" />
      </form>
      <div class="flex items-center gap-2">
        <Button class="bg-primary text-white" @click="startEventCheckIn">
          <CheckCheck class="w-5 h-5 mr-2" />Start Check In
        </Button>
        <!-- <template> -->
        <GenerateGroup />
        <AddMemberDialog :event="event" />
        <!-- </template> -->
      </div>
    </div>

    <!-- Table -->
    <Datatable
      v-model:page="page"
      :columns="columns"
      :data="players"
      :total-records="players.length"
      :page-size="10"
    >
      <template #actions="{ row }">
        <div class="flex gap-2">
          <ReminderDialog :event="event" :player-id="row.original?.id">
            <Button class="bg-yellow-500 hover:bg-yellow-400" size="sm">
              <ClockAlert class="size-4" />
            </Button>
          </ReminderDialog>
          <Button v-if="row.original.status === 'CHECKED_IN'" variant="destructive" size="sm" @click.stop="widthdraw(row.original?.player?.id)">
            <Dock class="size-4" />
          </Button>
          <Button v-if="row.original.status !== 'CHECKED_IN'" class="bg-green-500 hover:bg-green-400" size="sm" @click.stop="checkIn(row.original?.player?.id)">
            <CircleCheck class="size-4" />
          </Button>
        </div>
      </template>
      <template #checkIn="{ row }">
        <span :class="row.original.checkIn === 'Yes' ? 'text-green-500' : 'text-red-500'">
          {{ row.original.checkIn }}
        </span>
      </template>
      <template #partner="{ row }">
        {{ row.original.partner }}
        <span class="ml-1">
          {{ row.original.rating }}
        </span>
        <PlayerSearchDialog
          :event="event"
          :player-id="row.original?.player?.id"
          @on-submit="getPlayers"
        >
          <Button size="sm">
            <ArrowLeftRight class="size-4" />
          </Button>
        </PlayerSearchDialog>
      </template>
      <template #status="{ row }">
        <span :class="row.original.status === 'CHECKED_IN' ? 'text-green-500' : 'text-red-500'">
          {{ row.original.status === 'CHECKED_IN' ? 'Yes' : 'No' }}
        </span>
      </template>
    </Datatable>
  </div>
</template>

<script setup lang="ts">
import { checkinEvent, startCheckIn, withdrawEvent } from '@/api/event';
import Datatable from '@/components/shares/datatable/index.vue';
import GenerateGroup from '@/components/shares/dialogs/GenerateGroupDialog.vue';
import PlayerSearchDialog from '@/components/shares/dialogs/PlayerSearchDialog.vue';
import ReminderDialog from '@/components/shares/dialogs/ReminderDialog.vue';
import { Button } from '@/components/shares/ui/button';
import { Input } from '@/components/shares/ui/input';
import { notify } from '@/composables/notify';
import { ArrowLeftRight, CheckCheck, CircleCheck, ClockAlert, Dock } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import AddMemberDialog from './AddMemberDialog.vue';

const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
  players: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['pullEvent', 'pullPlayers']);

// const isAbleStartCheckIn = computed(() => props.event.status === 'PUBLISHED');

const search = ref('');
const page = ref(1);

const columns = [
  { accessorKey: 'player.name', header: 'Name' },
  { accessorKey: 'partner', header: 'Partner' },
  { accessorKey: 'rating', header: 'Combined Rating' },
  { accessorKey: 'rank', header: 'Rank' },
  { accessorKey: 'status', header: 'Check In?' },
  { id: 'actions', header: 'Actions' },
];

function getPlayers() {
  emit('pullPlayers');
}

async function startEventCheckIn() {
  try {
    await startCheckIn(props.event?.id as string);
    notify.success('Check in started successfully');
    emit('pullEvent');
  } catch (error) {
    notify.error(error as string);
  }
}

async function checkIn(playerId: string | number) {
  try {
    await checkinEvent(props.event?.id as string, {
      eventId: props.event?.id,
      playerId,
    });
    notify.success('Checked in successfully');
    emit('pullPlayers');
  } catch (e) {
    notify.error(e as string);
  }
}

async function widthdraw(playerId: string | number) {
  try {
    await withdrawEvent(props.event?.id as string, {
      eventId: props.event?.id,
      playerId,
    });
    notify.success('Widthdraw event successfully');
    emit('pullPlayers');
  } catch (e) {
    notify.error(e as string);
  }
}
</script>
