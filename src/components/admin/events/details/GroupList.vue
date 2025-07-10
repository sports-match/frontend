<template>
  <div class="bg-white rounded-2xl p-4 shadow flex flex-col gap-4">
    <!-- Top bar -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4 w-full">
      <!-- Search Form -->
      <!-- <form class="w-full sm:max-w-md" @submit.prevent>
        <Input v-model="search" placeholder="Search" class="w-full" />
      </form> -->

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto sm:justify-end">
        <Button v-if="groups[0].finalized && !groups[0].matches.length" class="bg-primary text-white w-full sm:w-auto" @click="generateMatches">
          <Gamepad class="w-5 h-5 mr-2" /> Generate Matches
        </Button>

        <Button v-if="!groups[0].finalized" class="bg-primary text-white w-full sm:w-auto" @click="finalizeGroup">
          <ListTree class="w-5 h-5 mr-2" />Finalize Group
        </Button>
      </div>
    </div>
    <div class="rounded-md border">
      <Table>
        <!-- Table Header -->
        <TableHeader>
          <TableRow>
            <TableHead class="w-[200px]">
              Group
            </TableHead>
            <TableHead>Matches</TableHead>
            <TableHead>Court</TableHead>
            <!-- <TableHead>Time</TableHead> -->
            <TableHead>Players</TableHead>
          <!-- <TableHead class="text-right">
            Actions
          </TableHead> -->
          </TableRow>
        </TableHeader>

        <!-- Table Body -->
        <TableBody>
          <template v-for="(group, gIndex) in groups" :key="gIndex">
            <!-- Main Group Row -->
            <TableRow class="cursor-pointer hover:bg-muted" @click="toggleExpand(gIndex)">
              <TableCell class="p-6 flex font-medium items-center gap-2 ">
                <Button size="sm">
                  <Minus v-if="expanded[gIndex]" class="size-4" />
                  <Plus v-else class="size-4" />
                </Button>
                <span>
                  {{ group.name }}
                </span>
              </TableCell>
              <TableCell class="items-center p-2">
                <div class="flex items-center justify-between">
                  <span>
                    {{ group.matches?.length }}
                  </span>
                  <!-- <Button variant="outline" size="sm">
                    <Edit class="size-3 text-primary" />
                  </Button> -->
                </div>
              </TableCell>
              <TableCell>
                <div class="flex items-center justify-between" @click.stop>
                  <!-- <span>
                    {{ group.courtNumbers }}
                  </span>
                  <Button variant="outline" size="sm">
                    <Edit class="size-3 text-primary" />
                  </Button> -->
                  <InlineEdit v-if="!group.finalized" v-model="group.courtNumbers" @update:model-value="updateCourtNumber(group.courtNumbers, group.id)" />
                  <span v-else>
                    {{ group.courtNumbers }}
                  </span>
                </div>
              </TableCell>
              <!-- <TableCell>
                <div class="flex items-center justify-between">
                  <span>
                    {{ group.time }}
                  </span>
                  <Button variant="outline" size="sm">
                    <Clock class="size-3 text-primary" />
                  </Button>
                </div>
              </TableCell> -->
              <TableCell>{{ group.groupTeamSize }}</TableCell>
            <!-- <TableCell class="text-right">
            </TableCell> -->
            </TableRow>

            <!-- Expandable Nested Rows -->
            <template v-if="expanded[gIndex]">
              <TableRow class="bg-muted/50">
                <TableCell colspan="6" class="pl-14 pt-2 pb-4">
                  <div class="grid grid-cols-6 font-semibold pb-2 border-b">
                    <span class="col-span-3">Players Name</span>
                    <!-- <span>Rank</span> -->
                  <!-- <span class="col-span-2 text-right">Actions</span> -->
                  </div>

                  <div
                    v-for="(player, pIndex) in group.teams"
                    :key="pIndex"
                    class="grid grid-cols-6 py-2 border-b last:border-b-0 text-sm"
                  >
                    <span v-for="(team, tIndex) in player.teamPlayers" :key="tIndex" class="col-span-3 p-2">
                      {{ team.player?.name }} ({{ team.player?.playerSportRating[0]?.rateScore }})
                    </span>
                    <!-- <span class="p-2">{{ player.rank }}</span> -->
                  <!-- <div class="col-span-2 flex justify-end gap-2">
                    <Button variant="ghost" size="sm">
                      <ArrowLeftRight class="text-blue-500 size-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ClockAlert class="text-yellow-500 size-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Dock class="text-red-500 size-4" />
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
                  </div> -->
                  </div>
                </TableCell>
              </TableRow>
            </template>
          </template>
        </TableBody>
      </Table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Group } from '@/schemas/events';
import { editCourt } from '@/api/event';
import InlineEdit from '@/components/shares/InlineEdit.vue';
import { Button } from '@/components/shares/ui/button';
import { Input } from '@/components/shares/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/shares/ui/table';
import { notify } from '@/composables/notify';
import { Clock, Edit, Gamepad, ListTree, Minus, Plus } from 'lucide-vue-next';
import { ref } from 'vue';

const props = defineProps<{
  groups: Group[];
}>();
const emit = defineEmits(['generateMatches', 'finalizeGroup']);
const search = ref('');

const expanded = ref(props.groups.map(() => false));

async function updateCourtNumber(courtNumber: string, groupId: number) {
  try {
    await editCourt(groupId, courtNumber);
    notify.success('Court number updated successfully');
  } catch (error) {
    notify.error(error as string);
  }
}
function toggleExpand(index: number) {
  expanded.value[index] = !expanded.value[index];
}

function generateMatches() {
  emit('generateMatches');
}

function finalizeGroup() {
  emit('finalizeGroup');
}
</script>
