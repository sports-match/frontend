<template>
  <div class="flex flex-col gap-4">
    <!-- Left: Matchups and Scores -->
    <div class="flex-1 flex flex-col gap-4">
      <Accordion type="multiple" class="w-full space-y-4" :default-value="groups[0]?.id?.toString()">
        <AccordionItem v-for="group in groups" :key="group.name" :value="group.name">
          <AccordionTrigger class="bg-primary text-white px-4 py-3 rounded-xl data-[state=open]:rounded-b-none">
            {{ group.name }} Matchups and Scores
          </AccordionTrigger>
          <AccordionContent class="bg-white rounded-b-lg border border-t-0 p-0">
            <!-- Matchups Table -->
            <div class="overflow-auto ">
              <table class="min-w-full text-sm text-left">
                <thead class="bg-gray-100 text-gray-700">
                  <tr>
                    <th class="px-4 py-2">
                      Game
                    </th>
                    <th class="px-4 py-2">
                      Players
                    </th>
                    <th class="px-4 py-2">
                      Scores
                    </th>
                    <th class="px-4 py-2">
                      Players
                    </th>
                    <th class="px-4 py-2">
                      Scores
                    </th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(match, index) in group.matches" :key="match.id" class="border-t align-center">
                    <!-- Game number -->
                    <td class="px-4 py-2 whitespace-nowrap align-center">
                      <div class="font-semibold">
                        #{{ index + 1 }}
                      </div>
                      <div class="text-xs text-gray-500">
                        <!-- {{ match?.eventDate }} -->
                      </div>
                    </td>

                    <!-- Team A -->
                    <td class="px-4 py-2 align-center">
                      <div class="flex items-center gap-2">
                        <span class="inline-flex items-center justify-center rounded-full bg-gray-100 w-8 h-8 font-semibold text-xs">
                          #{{ match.teamA?.id }}
                        </span>
                        <div>
                          <div v-for="(p, i) in match.teamA.teamPlayers" :key="i" class="leading-tight">
                            <span>{{ p.player?.name }}</span>
                            <span v-if="p.player?.playerSportRating" class="text-xs text-gray-500 ml-1">({{ match.teamA.averageScore }})</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <!-- Score A -->
                    <td class="px-4 py-2 align-center">
                      <span>{{ match.scoreA }}</span>
                    </td>

                    <!-- Team B -->
                    <td class="px-4 py-2 align-center">
                      <div class="flex items-center gap-2">
                        <span class="inline-flex items-center justify-center rounded-full bg-gray-100 w-8 h-8 font-semibold text-xs">
                          #{{ match.teamB?.id }}
                        </span>
                        <div>
                          <div v-for="(p, i) in match.teamB.teamPlayers" :key="i" class="leading-tight">
                            <span>{{ p.player?.name }}</span>
                            <span v-if="p.player?.playerSportRating" class="text-xs text-gray-500 ml-1">({{ match.teamB.averageScore }})</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <!-- Score B -->
                    <td class="px-4 py-2 align-center">
                      <span>{{ match.scoreB }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- Individual Results -->
            <div v-if="eventStatus === 'COMPLETED'" class="border-t py-2">
              <div class="overflow-x-auto">
                <div class="flex justify-between items-center px-4 py-3 border-b">
                  <h2 class="text-lg font-semibold">
                    Individual Results
                  </h2>
                  <button class="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600">
                    <CalendarIcon class="w-4 h-4" />
                    Add another game
                  </button>
                </div>

                <table class="min-w-full divide-y divide-gray-200 text-sm text-left">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-4 py-2 font-semibold">
                        Players
                      </th>
                      <th v-for="(match, index) in group.matrix" :key="`match-header-${index}`" class="px-4 py-2 font-semibold">
                        <span>
                          #{{ match.team.id }}
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-100">
                    <tr v-for="(row, index) in group.matrix" :key="index">
                      <td class="flex items-center gap-2 px-4 py-2">
                        <span class="inline-flex items-center justify-center rounded-full bg-gray-100 w-8 h-8 font-semibold text-xs">
                          #{{ row.team.id }}
                        </span>
                        <div>
                          <div v-for="(player, playerIndex) in row.team.teamPlayers" :key="playerIndex">
                            {{ player.player.name }}
                          </div>
                        </div>
                      </td>
                      <td v-for="(score, matchIndex) in group.matrix" :key="matchIndex" class="px-4 py-2">
                        <span v-for="(s, sIndex) in score.matches" :key="sIndex">
                          <span v-if=" s.otherTeam?.id === row.team.id">
                            {{ s.otherScore }} - {{ s.myScore }}
                          </span>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>

    <Datatable
      v-if="eventStatus === 'COMPLETED'"
      :total-records="eventPlayerRates.length"
      :columns="columns"
      :data="eventPlayerRates"
      hide-pagination
    >
      <template #winLoss="{ row }">
        {{ row.original.wins }} - {{ row.original.losses }}
      </template>
      <template #ratingChanges="{ row }">
        <div class="flex gap-1">
          {{ row.original.ratingChanges }}
          <template v-if="row.original.ratingChanges !== 0">
            <ArrowUp v-if="row.original.ratingChanges > 0" class="w-4 h-4 text-green-500" />
            <ArrowDown v-else class="w-4 h-4 text-destructive" />
          </template>
        </div>
      </template>
    </Datatable>
  </div>
</template>

<script setup lang="ts">
import type { EventPlayerRates, Group } from '@/schemas/events';
import Datatable from '@/components/shares/datatable/index.vue';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/shares/ui/accordion';
import { CalendarIcon } from 'lucide-vue-next';

defineProps<{
  groups: Group[];
  eventStatus: string;
  eventPlayerRates: EventPlayerRates[];
}>();

const columns = [
  {
    header: 'Player',
    accessorKey: 'name',
  },
  {
    header: 'W/L',
    accessorKey: 'winLoss',
  },
  {
    header: 'Total Ratings Change',
    accessorKey: 'ratingChanges',
  },
  {
    header: 'Previous Rating',
    accessorKey: 'previousRating',
  },
  {
    header: 'New Rating',
    accessorKey: 'newRating',
  },
];
</script>
