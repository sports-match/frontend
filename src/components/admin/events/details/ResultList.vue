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
                      <div v-if="editIndex === match.id">
                        <Input v-model.number="tempScores[match.id].scoreA" type="number" class="w-16 px-1 py-0.5" />
                      </div>
                      <span v-else>{{ match.scoreA }}</span>
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
                      <div v-if="editIndex === match.id">
                        <Input v-model.number="tempScores[match.id].scoreB" type="number" class="w-16 px-1 py-0.5" />
                      </div>
                      <span v-else>{{ match.scoreB }}</span>
                    </td>

                    <!-- Actions -->
                    <td class="pe-4 align-center space-x-1">
                      <template v-if="editIndex === match.id">
                        <div class="flex">
                          <Button size="icon" variant="ghost" class="text-green-500 text-sm" @click="saveEdit(match.id)">
                            <Check class="size-3" />
                          </Button>
                          <Button size="icon" variant="ghost" class="text-destructive text-sm" @click="cancelEdit">
                            <X class="size-3" />
                          </Button>
                        </div>
                      </template>
                      <template v-else>
                        <Button size="icon" variant="outline" class="text-primary" @click="startEdit(match.id, match)">
                          <Edit class="size-3" />
                        </Button>
                      </template>
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
                      <td class="px-4 py-2 align-center">
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
                        class="px-4 py-3 text-center align-center"
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

    <!-- Right: Group Players -->
    <div class="w-full md:w-80 flex flex-col gap-4">
      <Accordion type="multiple" class="w-full space-y-4">
        <AccordionItem v-for="group in groups" :key="`${group.name}-players`" :value="`${group.name}-players`">
          <AccordionTrigger class="bg-primary text-white px-4 py-3 rounded-xl data-[state=open]:rounded-b-none">
            {{ group.name }} Players
          </AccordionTrigger>
          <AccordionContent class="bg-white rounded-b-lg border border-t-0 p-0">
            <div class="overflow-x-auto">
              <table class="min-w-full text-sm text-left">
                <thead class="bg-gray-100 text-gray-700">
                  <tr>
                    <th class="px-4 py-2">
                      Name
                    </th>
                    <th class="px-4 py-2">
                      Rank
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(player, index) in group.players" :key="index" class="border-t">
                    <td class="px-4 py-2 whitespace-nowrap">
                      <div v-for="(member, idx) in player.team" :key="idx" class="flex items-center gap-1">
                        <span>{{ member.name }}</span>
                        <span v-if="member.rating" class="text-xs text-gray-400">({{ member.rating }})</span>
                      </div>
                    </td>
                    <td class="px-4 py-2">
                      <div class="flex items">
                        <span class="text-sm">{{ player.rank }}</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Group } from '@/schemas/events';
import { editMatchScores } from '@/api/event';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/shares/ui/accordion';
import { Button } from '@/components/shares/ui/button';
import { Input } from '@/components/shares/ui/input';
import { notify } from '@/composables/notify';
import { CalendarIcon, Check, Edit, X } from 'lucide-vue-next';
import { reactive, ref } from 'vue';

defineProps<{
  groups: Group[];
}>();

const emit = defineEmits(['pullGroups']);
const editIndex = ref<number | null>(null);
const tempScores = reactive<{ [id: number]: { scoreA: number; scoreB: number } }>({});

// Start editing
function startEdit(index: number, match: any) {
  editIndex.value = index;
  if (!tempScores[index]) {
    tempScores[index] = {
      scoreA: match.scoreA,
      scoreB: match.scoreB,
    };
  }
}

// Save
async function saveEdit(id: number) {
  try {
    await editMatchScores(id, {
      matchId: id,
      scoreA: tempScores[id].scoreA,
      scoreB: tempScores[id].scoreB,
    });
    editIndex.value = null;
    notify.success('Scores updated successfully');
    emit('pullGroups');
  } catch (error) {
    notify.error(error as string);
  }
}

// Cancel and restore old values
function cancelEdit() {
  editIndex.value = null;
}
</script>

<style scoped>
/* Hide input number arrows */
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}
</style>
