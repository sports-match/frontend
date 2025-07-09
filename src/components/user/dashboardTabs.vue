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
          <!-- <Datatable
            hide-pagination
            :total-records="upcomingEvents.length"
            :columns="columns"
            :data="upcomingEvents"
            @on-row-click="(row) => $router.push({ name: 'ViewEvent', params: { id: row.orignal.id } })"
          >
            <template #name="{ row }">
              <div class="font-semibold">
                {{ row.original?.name }}
              </div>
              <div class="flex items-center gap-2 pt-2">
                <MapPinned v-if="row.original?.club?.location" class="size-4" />
                {{ row.original?.club?.location }}
              </div>
            </template>
            <template #eventTime="{ row }">
              {{ formatDate(row.original?.eventTime) }}
            </template>
            <template #status="{ row }">
              {{ row.original?.status }}
            </template>
          </Datatable> -->
          <ListView :events="upcomingEvents" :columns="columns" :total-events="upcomingEvents.length" hide-pagination>
            <template #name="{ row }">
              <div class="font-semibold">
                {{ row.original?.name }}
              </div>
              <div class="flex items-center gap-2 pt-2">
                <MapPinned v-if="row.original?.club?.location" class="size-4" />
                {{ row.original?.club?.location }}
              </div>
            </template>
          </ListView>
          <Datatable
            hide-pagination
            :total-records="recentEvents.length"
            :columns="completedColumns"
            :data="recentEvents"
            @on-row-click="(row) => $router.push({ name: 'ViewEvent', params: { id: row.original.id } })"
          >
            <template #name="{ row }">
              <div class="font-semibold">
                {{ row.original?.name }}
              </div>
              <div class="flex items-center gap-2 pt-2">
                <MapPinned v-if="row.original?.club?.location" class="size-4" />
                {{ row.original?.club?.location }}
              </div>
            </template>
            <template #result="{ row }">
              <div class="flex items-center gap-2">
                <span
                  class="inline-flex items-center justify-center text-white font-bold text-sm w-7 h-7 rounded-lg shadow"
                  :class="{
                    'bg-green-400': row.original?.initialRating < row.original?.finalRating,
                    'bg-red-400': row.original?.initialRating > row.original?.finalRating,
                    'bg-gray-400': row.original?.initialRating === row.original?.finalRating,
                  }"
                >
                  <component
                    :is="row.original?.initialRating < row.original?.finalRating ? ArrowUp : ArrowDown"
                    v-if="row.original?.initialRating !== row.original?.finalRating"
                    class="size-4"
                  />
                  <div v-else>
                    -
                  </div>
                </span>
                <span>
                  Wins: <b>{{ row.original.wins }}</b>, loses: <b>{{ row.original.loses }}</b>
                  <div>
                    (<b>{{ row.original?.initialRating }}</b> - <b>{{ row.original?.finalRating }}</b>)
                  </div>
                </span>
              </div>
            </template>
          </Datatable>
        </div>
      </TabsContent>
      <TabsContent value="recentGames">
        <div>
          <Datatable
            :columns="groupColumns"
            :data="matches"
            :total-records="matches.length"
            :expanded-row-keys="expandedKeys"
            class="bg-white rounded-md border"
          >
            <!-- Custom Date Column with expand toggle -->
            <template #date="{ row }">
              <div class="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  @click.stop="toggleExpand(row.original.id)"
                >
                  <Minus v-if="expanded[row.original.id]" class="size-4" />
                  <Plus v-else class="size-4" />
                </Button>
                <div>
                  {{ formatDate(row.original.date) }}
                </div>
              </div>
            </template>

            <!-- Expanded Row Slot -->
            <template #expanded-row="{ row }">
              <div class="px-4 flex justify-between">
                <div class="text-muted-foreground mb-2 pe-4 flex flex-col items-center gap-2">
                  <span class="flex items-center gap-2">
                    <CircleAlert class="text-red-500 size-4" />
                    Wins: {{ row.original.summary.wins }},
                    Losses: {{ row.original.summary.losses }}
                  </span>
                  <div>
                    (<span class="font-medium">{{ row.original.summary.eloStart }}</span> →
                    <span class="font-medium">{{ row.original.summary.eloEnd }}</span>)
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow class="bg-muted">
                      <TableHead class="px-2 py-1" colspan="2">
                        Players Name
                      </TableHead>
                      <TableHead class="px-2 py-1 text-center">
                        Score
                      </TableHead>
                      <TableHead class="px-2 py-1" colspan="2">
                        Players Name
                      </TableHead>
                      <TableHead class="px-2 py-1 text-center">
                        Score
                      </TableHead>
                      <TableHead class="px-2 py-1 text-right">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow
                      v-for="(match, i) in row.original.games"
                      :key="i"
                      class="border-t"
                    >
                      <TableCell class="px-2 py-1" colspan="2">
                        <div v-for="player in match.team1" :key="player.name">
                          {{ player.name }} ({{ player.elo }})
                        </div>
                      </TableCell>
                      <TableCell class="px-2 py-1 text-center font-semibold">
                        {{ match.score1 }}
                      </TableCell>
                      <TableCell class="px-2 py-1" colspan="2">
                        <div v-for="player in match.team2" :key="player.name">
                          {{ player.name }} ({{ player.elo }})
                        </div>
                      </TableCell>
                      <TableCell class="px-2 py-1 text-center font-semibold">
                        {{ match.score2 }}
                      </TableCell>
                      <TableCell class="px-2 py-1 text-right">
                        <Button class="text-primary" variant="ghost" size="icon">
                          <FileEditIcon class="size-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/shares/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/shares/ui/tabs';
import { formatDate } from '@/utils/common';
import { ArrowDown, ArrowUp, Calendar, CircleAlert, ClipboardList, FileEditIcon, MapPinned, Minus, Plus } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import ListView from './events/views/listView.vue';

defineProps({
  upcomingEvents: {
    type: Array,
    default: () => [],
  },
  recentEvents: {
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
    accessorKey: 'eventTime',
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

// Dummy match data structure
type Player = { name: string; elo: number };
type Match = {
  id: string;
  date: string;
  event: string;
  location: string;
  signedUp: string;
  courts: number;
  status: string;
  summary: { wins: number; losses: number; eloStart: number; eloEnd: number };
  games: {
    team1: Player[];
    score1: number;
    team2: Player[];
    score2: number;
  }[];
};

const matches = ref<Match[]>([
  {
    id: 'match1',
    date: '2025-04-26T00:42:00Z',
    event: 'May 9th Mukilteo Mixer Standard Doubles Mixer',
    location: 'BBC-Mukilteo',
    signedUp: '25/24',
    courts: 4,
    status: 'Completed',
    summary: { wins: 1, losses: 4, eloStart: 6648.0, eloEnd: 6608.09 },
    games: [
      {
        team1: [
          { name: 'Surya Prakash Gummadi', elo: 6588.9 },
          { name: 'Vamsi Krishna', elo: 6648.0 },
        ],
        score1: 16,
        team2: [
          { name: 'Mohit Bansal', elo: 6065.36 },
          { name: 'Sivaprasadu Raju', elo: 7382.23 },
        ],
        score2: 21,
      },
      // Add more games here
    ],
  },
]);

const expanded = ref<Record<string, boolean>>({});
const expandedKeys = computed(() =>
  Object.keys(expanded.value).filter(key => expanded.value[key]),
);

function toggleExpand(id: string) {
  expanded.value[id] = !expanded.value[id];
}

const groupColumns: ColumnDef<Match>[] = [
  { accessorKey: 'date', header: 'Date', cell: () => null },
  { accessorKey: 'event', header: 'Event Name' },
  { accessorKey: 'location', header: 'Location' },
  { accessorKey: 'signedUp', header: 'Signed up' },
  { accessorKey: 'courts', header: 'Courts' },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'actions', header: 'Actions', cell: () => null },
];
</script>
