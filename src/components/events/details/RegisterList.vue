<template>
  <div class="bg-white rounded-2xl p-4 shadow flex flex-col gap-4">
    <!-- Top bar -->
    <div class="flex items-center justify-between gap-4">
      <form class="flex items-center w-full max-w-md" @submit.prevent>
        <Input v-model="search" placeholder="Search" class="w-full" />
      </form>
      <div class="flex items-center gap-2">
        <!-- <Button variant="outline">
          <FileUp class="w-5 h-5 mr-2" /> Export
        </Button> -->
        <Button v-if="isAbleStartCheckIn" class="bg-primary text-white" @click="startEventCheckIn">
          <CheckCheck class="w-5 h-5 mr-2" />Start Check In
        </Button>
        <template v-else>
          <GenerateGroup />
          <PlayerSearchDialog :event="event" getAll/>
        </template>
      </div>
    </div>

    <!-- Table -->
    <Datatable
      ref="registerTable"
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
          <Button variant="destructive" size="sm" @click.stop="widthdraw(row.original.id)">
            <Dock class="size-4" />
          </Button>
          <Button class="bg-green-500 hover:bg-green-400" size="sm" @click.stop="checkIn(row.original.id)">
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
        <PlayerSearchDialog :event="event">
          <Button size="sm">
            <ArrowLeftRight class="size-4" />
          </Button>
        </PlayerSearchDialog>
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/shares/ui/dropdown-menu';
import { Input } from '@/components/shares/ui/input';
import { notify } from '@/composables/notify';
import { ArrowLeftRight, Check, CheckCheck, CircleCheck, ClockAlert, Dock, Edit, Ellipsis, Eye, Files, FileUp, Plus, Trash, Users2Icon } from 'lucide-vue-next';
import { computed, ref } from 'vue';

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

const emit = defineEmits(['pullEvent']);

const isAbleStartCheckIn = computed(() => props.event.status === 'PUBLISHED');

// Dummy data for demonstration
const data = ref(
  JSON.parse(JSON.stringify(props.players)),
  // [
  //   {
  //     id: 2,
  //     name: 'Lonnie Jayden',
  //     firstName: 'Lonnie',
  //     lastName: 'Jayden',
  //     partner: 'Tracey Keebler',
  //     rating: 4900,
  //     combinedRating: 6400,
  //     rank: 9,
  //     checkIn: 'Yes',
  //   },
  // // ...repeat or map your real data here
  // ],
);

const search = ref('');
const page = ref(1);

const filteredData = computed(() =>
  data.value.filter(
    row =>
      row.firstName.toLowerCase().includes(search.value.toLowerCase())
      || row.lastName.toLowerCase().includes(search.value.toLowerCase())
      || row.partner.toLowerCase().includes(search.value.toLowerCase()),
  ),
);

const columns = [
  { accessorKey: 'firstName', header: 'First Name' },
  { accessorKey: 'lastName', header: 'Last Name' },
  { accessorKey: 'partner', header: 'Partner' },
  { accessorKey: 'rating', header: 'Combined Rating' },
  { accessorKey: 'combinedRating', header: 'Combined Rating' },
  { accessorKey: 'rank', header: 'Rank' },
  { accessorKey: 'checkIn', header: 'Check In?' },
  { id: 'actions', header: 'Actions' },
];

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
  } catch (e) {
    notify.error(e as string);
  }
}
</script>
