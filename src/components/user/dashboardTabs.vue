<template>
  <div>
    <Tabs default-value="myEvents" class="w-full">
      <TabsList class="border-b border-gray-200 w-full justify-start space-x-6 bg-transparent rounded-xs">
        <TabsTrigger
          value="myEvents"
          class="flex rounded-none items-center gap-1 text-black data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary px-0 pb-2 text-sm font-medium transition-colors"
        >
          <Calendar class="w-5 h-5" />
          My Events
        </TabsTrigger>

        <TabsTrigger
          value="recentGames"
          class="flex rounded-none items-center gap-1 text-black data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary px-0 pb-2 text-sm font-medium transition-colors"
        >
          <ClipboardList class="w-5 h-5" />
          Recent Games
        </TabsTrigger>
      </TabsList>

      <TabsContent value="myEvents">
        <div class="grid grid-cols-1 md:grid-cols-[1.5fr,1fr] gap-4 mt-4">
          <Datatable
            hide-pagination
            :total-records="events.length"
            :columns="columns"
            :data="events"
            @on-row-click="(row) => $router.push({ name: 'ViewEvent', params: { id: row.id } })"
          />
          <Datatable
            hide-pagination
            :total-records="events.length"
            :columns="completedColumns"
            :data="events"
            @on-row-click="(row) => $router.push({ name: 'ViewEvent', params: { id: row.id } })"
          />
        </div>
      </TabsContent>
      <TabsContent value="recentGames">
        <div>
          <Datatable
            :columns="groupColumns"
            :data="groups"
            :total-records="groups.length"
          >
            <template #group="{ row }">
              <div class="flex items-start flex-col gap-2">
                <!-- Expand Button + Group Name -->
                <div class="flex items-center gap-2">
                  <button
                    class="w-6 h-6 flex items-center justify-center border rounded"
                    @click.stop="toggleExpand(row.original.id)"
                  >
                    <Minus v-if="expanded[row.original.id]" class="size-4" />
                    <Plus v-else class="size-4" />
                  </button>
                  <span class="font-medium">{{ row.original.name }}</span>
                </div>

                <!-- Expanded Player List -->
                <TableRow v-if="expanded[row.original.id]" class="bg-muted/50">
                  <TableCell :colspan="columns.length" class="p-4">
                    <div class="rounded border bg-white text-sm">
                      <div class="grid grid-cols-6 font-semibold bg-muted px-4 py-2 border-b">
                        <span class="col-span-3">Player Name</span>
                        <span>Rank</span>
                        <span class="col-span-2 text-right">Actions</span>
                      </div>
                      <div
                        v-for="(player, i) in row.original.playersList"
                        :key="i"
                        class="grid grid-cols-6 px-4 py-2 border-b last:border-none"
                      >
                        <span class="col-span-3">{{ player.name }}</span>
                        <span>{{ player.rank }}</span>
                        <div class="col-span-2 flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <ClockAlert class="text-yellow-500 size-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash class="text-red-500 size-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              </div>
            </template>
          </Datatable>
        </div>
      </TabsContent>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table';
import Datatable from '@/components/shares/datatable/index.vue';
import { Button } from '@/components/shares/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/shares/ui/tabs';
import { Calendar, ClipboardList, ClockAlert, Minus, Plus, Trash } from 'lucide-vue-next';
import { ref } from 'vue';

defineProps({
  events: {
    type: Array,
    default: () => [],
  },
});

const columns = [
  {
    accessorKey: 'name',
    header: 'Upcomming Events',
  },
  {
    accessorKey: 'eventDate',
    header: 'Date',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
];
const completedColumns = [
  {
    accessorKey: 'name',
    header: 'Completed Events',
  },
  {
    accessorKey: 'result',
    header: 'Results',
  },
];

// ---

type Player = {
  name: string;
  rank: number;
};

type GroupRow = {
  id: string;
  name: string;
  matches: number;
  court: number;
  time: string;
  players: number;
  playersList: Player[];
};

const groups = ref<GroupRow[]>([
  {
    id: 'group-a',
    name: 'Group A',
    matches: 25,
    court: 3,
    time: '7:00 PM',
    players: 10,
    playersList: [
      { name: 'Aditya Emmanuel 6148 & Nidhin Jose 6788', rank: 1 },
      { name: 'Another Team', rank: 2 },
    ],
  },
  {
    id: 'group-b',
    name: 'Group B',
    matches: 20,
    court: 2,
    time: '8:00 PM',
    players: 8,
    playersList: [],
  },
]);

const expanded = ref<Record<string, boolean>>({}); // keyed by group id

function toggleExpand(groupId: string) {
  expanded.value[groupId] = !expanded.value[groupId];
}

const groupColumns: ColumnDef<GroupRow>[] = [
  {
    accessorKey: 'name',
    id: 'group',
    header: 'Group',
    cell: () => null, // render using slot
  },
  { accessorKey: 'matches', header: 'Matches' },
  { accessorKey: 'court', header: 'Court' },
  { accessorKey: 'time', header: 'Time' },
  { accessorKey: 'players', header: 'Players' },
];
</script>
