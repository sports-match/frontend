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
        <Button class="bg-primary text-white">
          <Users2Icon class="w-5 h-5 mr-2" /> Generate Group
        </Button>
      </div>
    </div>

    <!-- Groups Table -->
    <Datatable
      v-model:page="page"
      :columns="columns"
      :data="filteredGroups"
      :expandable="true"
      :expanded-rows="expandedRows"
      :total-records="filteredGroups.length"
      :page-size="10"
      @expand-row="toggleExpand"
    >
      <template #expandIcon="{ row, expanded }">
        <Button variant="ghost" size="icon" @click.stop="toggleExpand(row)">
          <span v-if="expanded">-</span>
          <span v-else>+</span>
        </Button>
      </template>
      <template #matches="{ row }">
        <span class="font-bold">{{ row.original.matches }}</span>
      </template>
      <template #players="{ row }">
        <span>{{ row.original.players }}</span>
      </template>
      <template #actions="{ row }">
        <Button variant="ghost" size="sm">
          <ArrowLeftRight class="size-4 text-blue-500" />
        </Button>
        <Button variant="ghost" size="sm">
          <ClockAlert class="text-yellow-500 size-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <Dock class="text-red-500 size-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <Check class="text-blue-500 size-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="ghost" size="sm">
              <Ellipsis class="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye class="size-4 mr-2" /> View
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit class="size-4 mr-2" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem class="text-destructive">
              <Trash class="size-4 mr-2" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </template>
      <template #expandedRow="{ row }">
        <div class="bg-gray-50 rounded-b-xl p-4">
          <div class="font-semibold mb-2">
            Players Name
          </div>
          <div class="grid grid-cols-12 gap-2 font-semibold border-b pb-2 mb-2">
            <div class="col-span-5">
              Players Name
            </div>
            <div class="col-span-2 text-center">
              Rank
            </div>
            <div class="col-span-5 text-center">
              Actions
            </div>
          </div>
          <div v-for="(player, idx) in row.original.playersList" :key="idx" class="grid grid-cols-12 gap-2 items-center py-1">
            <div class="col-span-5">
              {{ player.name }} <span class="font-bold">{{ player.rating }}</span>
              <Users2Icon class="inline w-4 h-4 mx-1" />
              {{ player.partner }} <span class="font-bold">{{ player.partnerRating }}</span>
            </div>
            <div class="col-span-2 text-center">
              {{ player.rank }}
            </div>
            <div class="col-span-5 flex gap-2 justify-center">
              <Button variant="ghost" size="sm">
                <Files class="text-blue-500" />
              </Button>
              <Button variant="ghost" size="sm">
                <CircleAlert class="text-yellow-500" />
              </Button>
              <Button variant="ghost" size="sm">
                <Check class="text-blue-500" />
              </Button>
            </div>
          </div>
        </div>
      </template>
    </Datatable>
    <!-- Pagination handled by Datatable -->
    <div class="text-sm text-gray-600 mt-2">
      Showing 10 from 46 data
    </div>
  </div>
</template>

<script setup lang="ts">
import Datatable from '@/components/shares/datatable/index.vue';
import { Button } from '@/components/shares/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/shares/ui/dropdown-menu';
import { Input } from '@/components/shares/ui/input';
import { FileUp, ArrowLeftRight, Check, ClockAlert, Dock, Edit, Ellipsis, Eye, Files, Trash, Users2Icon } from 'lucide-vue-next';
import { computed, ref } from 'vue';

// Dummy data for demonstration
const groups = ref([
  {
    group: 'Group A',
    matches: 25,
    court: 3,
    time: '7:00 PM',
    players: 10,
    playersList: [
      { name: 'Aditya Emmanuel', rating: 6148, partner: 'Nidhin Jose', partnerRating: 6788, rank: 1 },
      { name: 'Aditya Emmanuel', rating: 6148, partner: 'Nidhin Jose', partnerRating: 6788, rank: 2 },
      { name: 'Aditya Emmanuel', rating: 6148, partner: 'Nidhin Jose', partnerRating: 6788, rank: 3 },
      { name: 'Aditya Emmanuel', rating: 6148, partner: 'Nidhin Jose', partnerRating: 6788, rank: 4 },
      { name: 'Aditya Emmanuel', rating: 6148, partner: 'Nidhin Jose', partnerRating: 6788, rank: 5 },
    ],
  },
  {
    group: 'Group B',
    matches: 25,
    court: 3,
    time: '7:00 PM',
    players: 10,
    playersList: [],
  },
  {
    group: 'Group C',
    matches: 25,
    court: 3,
    time: '7:00 PM',
    players: 10,
    playersList: [],
  },
  {
    group: 'Group D',
    matches: 25,
    court: 3,
    time: '7:00 PM',
    players: 10,
    playersList: [],
  },
]);

const search = ref('');
const page = ref(1);
const expandedRows = ref([]);

const filteredGroups = computed(() =>
  groups.value.filter(g =>
    g.group.toLowerCase().includes(search.value.toLowerCase()),
  ),
);

function toggleExpand(row: any) {
  const idx = expandedRows.value.indexOf(row.index);
  if (idx > -1) {
    expandedRows.value.splice(idx, 1);
  } else {
    expandedRows.value.push(row.index);
  }
}

const columns = [
  { id: 'expand', header: '', cell: () => '', enableSorting: false },
  { accessorKey: 'group', header: 'Group' },
  { accessorKey: 'matches', header: 'Matches' },
  { accessorKey: 'court', header: 'Court' },
  { accessorKey: 'time', header: 'Time' },
  { accessorKey: 'players', header: 'Players' },
  { id: 'actions', header: 'Actions' },
];
</script>
