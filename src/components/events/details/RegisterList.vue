<template>
  <div class="bg-white rounded-2xl p-4 shadow flex flex-col gap-4">
    <!-- Top bar -->
    <div class="flex items-center justify-between gap-4">
      <form class="flex items-center w-full max-w-md" @submit.prevent>
        <Input v-model="search" placeholder="Search" class="w-full" />
      </form>
      <div class="flex items-center gap-2">
        <Button variant="outline">
          <FileUp class="w-5 h-5 mr-2" /> Export
        </Button>
        <!-- <Button class="bg-primary text-white">
          <Users2Icon class="w-5 h-5 mr-2" /> Generate Group
        </Button> -->
        <GenerateGroup />
        <!-- <Button class="bg-primary text-white">
          <Plus class="w-5 h-5 mr-2" />
          Add Member
        </Button> -->
        <PlayerSearchDialog />
      </div>
    </div>

    <!-- Table -->
    <Datatable
      ref="registerTable"
      v-model:page="page"
      :columns="columns"
      :data="filteredData"
      :total-records="filteredData.length"
      :page-size="10"
    >
      <template #actions="{ row }">
        <div class="flex gap-2">
          <ReminderDialog :event="event" :player="row.original">
            <Button class="bg-yellow-500 hover:bg-yellow-400" size="sm">
              <ClockAlert class="size-4" />
            </Button>
          </ReminderDialog>
          <Button variant="destructive" size="sm">
            <Dock class="size-4" />
          </Button>
          <Button class="bg-green-500 hover:bg-green-400" size="sm">
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
          4900
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
import Datatable from '@/components/shares/datatable/index.vue';
import GenerateGroup from '@/components/shares/dialogs/GenerateGroupDialog.vue';
import PlayerSearchDialog from '@/components/shares/dialogs/PlayerSearchDialog.vue';
import ReminderDialog from '@/components/shares/dialogs/ReminderDialog.vue';
import { Button } from '@/components/shares/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/shares/ui/dropdown-menu';
import { Input } from '@/components/shares/ui/input';
import { ArrowLeftRight, Check, CircleCheck, ClockAlert, Dock, Edit, Ellipsis, Eye, Files, FileUp, Plus, Trash, Users2Icon } from 'lucide-vue-next';
import { computed, ref } from 'vue';

defineProps({
  event: {
    type: Object,
    required: true,
  },
});

// Dummy data for demonstration
const data = ref([
  {
    firstName: 'Lonnie',
    lastName: 'Jayden',
    partner: 'Tracey Keebler',
    rating: 4900,
    combinedRating: 6400,
    rank: 9,
    checkIn: 'Yes',
  },
  // ...repeat or map your real data here
]);

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
</script>
