<template>
  <div class="flex flex-col md:flex-row gap-4">
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
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(match, index) in group.matches" :key="index" class="border-t align-top">
                    <!-- Game number and extra info -->
                    <td class="px-4 py-2 whitespace-nowrap align-top">
                      <div class="font-semibold">
                        #{{ index + 1 }}
                      </div>
                      <div class="text-xs text-gray-500">
                        <!-- {{ match?.eventDate }} -->
                      </div>
                    </td>
                    <!-- Team 1 -->
                    <td class="px-4 py-2 align-top">
                      <div class="flex items-center gap-2">
                        <span class="inline-flex items-center justify-center rounded-full bg-gray-100 w-8 h-8 font-semibold text-xs">
                          #{{ match.teamA?.id }}
                        </span>
                        <div>
                          <div v-for="(p, i) in match.teamA.teamPlayers" :key="i" class="leading-tight">
                            <span>{{ p.player?.name }}</span>
                            <!-- <span v-if="p.icon" class="ml-1">{{ p.icon }}</span> -->
                            <span v-if="p.player?.playerSportRating" class="text-xs text-gray-500 ml-1">({{ match.teamA.averageScore }})</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <!-- Team 1 Score -->
                    <td class="px-4 py-2 align-top">
                      <span>{{ match.scoreA }}</span>
                    </td>

                    <!-- Team 2 -->
                    <td class="px-4 py-2 align-top">
                      <div class="flex items-center gap-2">
                        <span class="inline-flex items-center justify-center rounded-full bg-gray-100 w-8 h-8 font-semibold text-xs">
                          #{{ match.teamB?.id }}
                        </span>
                        <div>
                          <div v-for="(p, i) in match.teamB.teamPlayers" :key="i" class="leading-tight">
                            <span>{{ p.player?.name }}</span>
                            <!-- <span v-if="p.icon" class="ml-1">{{ p.icon }}</span> -->
                            <span v-if="p.player?.playerSportRating" class="ml-1 text-xs text-gray-500">({{ match.teamB.averageScore }})</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <!-- Team 2 Score -->
                    <td class="px-4 py-2 align-top">
                      <span>{{ match.scoreB }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- Individual Results -->
            <div class="border-t py-2">
              <div class="overflow-x-auto">
                <!-- <div class="bg-white rounded-lg border border-gray-200 overflow-auto"> -->
                <div class="flex justify-between items-center px-4 py-3 border-b">
                  <h2 class="text-lg font-semibold">
                    Individual Results
                  </h2>
                  <button class="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600">
                    <CalendarIcon class="w-4 h-4" />
                    Add another game
                  </button>
                </div>

                <!-- <table class="min-w-full divide-y divide-gray-200 text-sm text-left">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-4 py-2 font-semibold text-gray-700">
                        Players
                      </th>
                      <th
                        v-for="n in maxScores(group.individualResults)"
                        :key="n"
                        class="px-4 py-2 font-semibold text-gray-700 text-center"
                      >
                        <span v-if="n === 1">
                          Scores
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-100">
                    <tr v-for="(result, index) in group.individualResults" :key="index">
                      <td class="px-4 py-2 align-top">
                        <div class="flex items-center gap-2">
                          <span class="inline-flex items-center justify-center rounded-full bg-gray-100 w-8 h-8 font-semibold">
                            {{ result.match }}
                          </span>
                          <div>
                            <div v-for="(p, i) in result.team" :key="i" class="leading-tight">
                              <span>{{ p.name }}</span>
                              <span v-if="p.rating" class="ml-1 text-xs text-gray-500">({{ p.rating }})</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        v-for="n in maxScores(group.individualResults)"
                        :key="n"
                        class="px-4 py-3 text-center align-top"
                      >
                        <span v-if="result.scores[n - 1]">{{ result.scores[n - 1] }}</span>
                      </td>
                    </tr>
                  </tbody>
                </table> -->
                <!-- </div> -->
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Group } from '@/schemas/events';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/shares/ui/accordion';
import { Input } from '@/components/shares/ui/input';
import { CalendarIcon } from 'lucide-vue-next';

defineProps<{
  groups: Group[];
}>();
</script>
