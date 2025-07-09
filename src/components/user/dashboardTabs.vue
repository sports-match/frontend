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
                    'bg-green-400': row.original?.wins > row.original?.loses,
                    'bg-red-400': row.original?.wins < row.original?.loses,
                    'bg-gray-400': row.original?.wins === row.original?.loses,
                  }"
                >
                  <component
                    :is="row.original?.wins > row.original?.loses ? ArrowUp : ArrowDown"
                    v-if="row.original?.wins !== row.original?.loses"
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
            :data="completedEvents"
            :total-records="completedEvents.length"
            :expanded-row-keys="expandedKeys"
            hide-pagination
          >
            <template #name="{ row }">
              {{ row.original.name }}
            </template>
            <template #currentParticipants="{ row }">
              <div class="flex items-center gap-2">
                <Percentage :percentage="(row.original?.currentParticipants * 100 / row.original.maxParticipants) || 0" />
                {{ row.original.currentParticipants || 0 }}
              </div>
            </template>
            <!-- Custom Date Column with expand toggle -->
            <template #date="{ row }">
              <div class="flex items-center gap-2">
                <Button
                  size="icon"
                  @click.stop="toggleExpand(row.original.id)"
                >
                  <Minus v-if="expanded[row.original.id]" class="size-4" />
                  <Plus v-else class="size-4" />
                </Button>
                <div>
                  {{ formatDate(row.original.eventTime) }}
                </div>
              </div>
            </template>
            <template #status="{ row }">
              <StatusIndicator :status="row.original.status" />
            </template>

            <!-- Expanded Row Slot -->
            <template #expanded-row="{ row }">
              <div class="flex justify-between">
                <div class="flex items-center gap-2 w-44">
                  <span
                    class="inline-flex items-center justify-center text-white font-bold text-sm w-7 h-7 rounded-lg shadow"
                    :class="{
                      'bg-green-400': row.original?.wins > row.original?.loses,
                      'bg-red-400': row.original?.wins < row.original?.loses,
                      'bg-gray-400': row.original?.wins === row.original?.loses,
                    }"
                  >
                    <component
                      :is="row.original?.wins > row.original?.loses ? ArrowUp : ArrowDown"
                      v-if="row.original?.wins !== row.original?.loses"
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
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow
                      v-for="(match, i) in row.original?.matches"
                      :key="i"
                      class="border-t"
                    >
                      <TableCell class="px-2 py-1" colspan="2">
                        <div v-for="player in match.teamA.teamPlayers" :key="player.name">
                          {{ player.player?.name }} ({{ player.player?.playerSportRating[0]?.rateScore?.toFixed(2) }})
                        </div>
                      </TableCell>
                      <TableCell class="px-2 py-1 text-center font-semibold">
                        {{ match.scoreA }}
                      </TableCell>
                      <TableCell class="px-2 py-1" colspan="2">
                        <div v-for="player in match.teamB.teamPlayers" :key="player.name">
                          {{ player.player?.name }} ({{ player.player?.playerSportRating[0]?.rateScore?.toFixed(2) }})
                        </div>
                      </TableCell>
                      <TableCell class="px-2 py-1 text-center font-semibold">
                        {{ match.scoreB }}
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
import type { Event } from '@/schemas/events';
import type { ColumnDef } from '@tanstack/vue-table';
import Datatable from '@/components/shares/datatable/index.vue';
import Percentage from '@/components/shares/Percentage.vue';
import StatusIndicator from '@/components/shares/StatusIndicator.vue';
import { Button } from '@/components/shares/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/shares/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/shares/ui/tabs';
import { formatDate } from '@/utils/common';
import { ArrowDown, ArrowUp, Calendar, ClipboardList, MapPinned, Minus, Plus } from 'lucide-vue-next';
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
  completedEvents: {
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

const expanded = ref<Record<string, boolean>>({});
const expandedKeys = computed(() =>
  Object.keys(expanded.value).filter(key => expanded.value[key]),
);

function toggleExpand(id: string) {
  expanded.value[id] = !expanded.value[id];
}

const groupColumns: ColumnDef<Event>[] = [
  { accessorKey: 'date', header: 'Date', cell: () => null },
  { accessorKey: 'name', header: 'Event Name' },
  { accessorKey: 'club.location', header: 'Location' },
  { accessorKey: 'currentParticipants', header: 'Signed up' },
  { accessorKey: 'groupCount', header: 'Courts' },
  { accessorKey: 'status', header: 'Status' },
];
</script>
