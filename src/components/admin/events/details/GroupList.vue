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
          <template v-for="(group, gIndex) in groups" :key="group.id">
            <!-- Group Header Row -->
            <TableRow
              class="cursor-pointer hover:bg-muted"
              @click="toggleExpand(gIndex)"
              @dragenter.prevent="expandOnDragEnter(gIndex)"
            >
              <TableCell class="p-6 flex font-medium items-center gap-2">
                <Button size="sm">
                  <Minus v-if="expanded[gIndex]" class="size-4" />
                  <Plus v-else class="size-4" />
                </Button>
                {{ group.name }}
              </TableCell>
              <TableCell>{{ group.matches?.length }}</TableCell>
              <TableCell>
                <InlineEdit
                  v-if="!group.finalized"
                  v-model="group.courtNumbers"
                  @update:model-value="updateCourtNumber(group.courtNumbers, group.id)"
                />
                <span v-else>{{ group.courtNumbers }}</span>
              </TableCell>
              <TableCell>{{ group.playerCount }}</TableCell>
            </TableRow>

            <!-- Expanded Nested Teams -->
            <template v-if="expanded[gIndex]">
              <TableRow class="bg-muted/50">
                <TableCell colspan="6" class="pl-14 pt-2 pb-4">
                  <div class="grid grid-cols-6 font-semibold pb-2 border-b">
                    <span class="col-span-3">Players Name</span>
                  </div>

                  <!-- Inner Container (Players per Group) -->
                  <Container
                    group-name="players-group"
                    orientation="vertical"
                    drag-handle-selector=".drag-handle"
                    :get-child-payload="(index: number) => ({ team: groups[gIndex].teams[index], groupIndex: gIndex })"
                    :should-accept-drop="() => true"
                    @drop="(e: any) => onDrop(gIndex, e)"
                  >
                    <Draggable
                      v-for="(player, pIndex) in group.teams"
                      :key="player.id || pIndex"
                    >
                      <div class="grid grid-cols-6 py-2 border-b text-sm bg-white/50 hover:bg-muted cursor-move">
                        <span class="col-span-3 p-2 drag-handle flex items-center gap-2">
                          <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M7 4h2v2H7V4zm0 4h2v2H7V8zm0 4h2v2H7v-2zm4-8h2v2h-2V4zm0 4h2v2h-2V8zm0 4h2v2h-2v-2z" />
                          </svg>
                          {{ player.teamPlayers?.[0]?.player?.name }}
                          ({{ player.teamPlayers?.[0]?.player?.playerSportRating?.[0]?.rateScore }})
                        </span>
                      </div>
                    </Draggable>
                  </Container>
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
import { editCourt, relocateTeam } from '@/api/event';
import InlineEdit from '@/components/shares/InlineEdit.vue';
import { Button } from '@/components/shares/ui/button';
import { Input } from '@/components/shares/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/shares/ui/table';
import { notify } from '@/composables/notify';
import { Clock, Edit, Gamepad, ListTree, Minus, Plus } from 'lucide-vue-next';
import { ref } from 'vue';
import { Container, Draggable } from 'vue3-smooth-dnd';
import { useRoute } from 'vue-router';

const props = defineProps<{
  groups: Group[];
}>();

const emit = defineEmits(['generateMatches', 'finalizeGroup', 'fetchGroups']);

const route = useRoute();

const { id: eventId } = route.params;
const groups = ref(JSON.parse(JSON.stringify(props.groups))); // deep clone for reactivity

const expanded = ref<boolean[]>([]);
const draggingFrom = ref<number | null>(null);

function toggleExpand(index: number) {
  expanded.value[index] = !expanded.value[index];
}

function expandOnDragEnter(gIndex: number) {
  if (!expanded.value[gIndex]) {
    expanded.value[gIndex] = true;
  }
}

// Move player between groups
function onDrop(targetGroupIndex: number, dropResult: any) {
  if (!dropResult)
    return;

  const { removedIndex, addedIndex, payload } = dropResult;
  if (removedIndex == null && addedIndex == null)
    return;

  // Move within the same group
  if (payload && payload.groupIndex === targetGroupIndex) {
    if (removedIndex != null && addedIndex != null) {
      const updated = [...groups.value[targetGroupIndex].teams];
      const [moved] = updated.splice(removedIndex, 1);
      updated.splice(addedIndex, 0, moved);
      groups.value[targetGroupIndex].teams = updated;
    }
  }
  // Move between groups
  else if (payload && payload.groupIndex !== undefined && addedIndex != null) {
    const fromGroupIndex = payload.groupIndex;
    const movedTeamId = payload.team.id;

    // Find and remove from source group
    const sourceTeams = [...groups.value[fromGroupIndex].teams];
    const realRemovedIndex = sourceTeams.findIndex(t => t.id === movedTeamId);
    if (realRemovedIndex === -1)
      return;
    const [moved] = sourceTeams.splice(realRemovedIndex, 1);

    // Add to target group at the correct position
    const targetTeams = [...groups.value[targetGroupIndex].teams];
    targetTeams.splice(addedIndex, 0, moved);

    // Save previous state for rollback
    const prevSourceTeams = [...groups.value[fromGroupIndex].teams];
    const prevTargetTeams = [...groups.value[targetGroupIndex].teams];

    // Optimistically update UI
    groups.value[fromGroupIndex].teams = sourceTeams;
    groups.value[targetGroupIndex].teams = targetTeams;

    // Wait for API, rollback if error
    moveTeam(movedTeamId, groups.value[targetGroupIndex].id, () => {
      // Rollback on error
      groups.value[fromGroupIndex].teams = prevSourceTeams;
      groups.value[targetGroupIndex].teams = prevTargetTeams;
    });
  }
}

async function moveTeam(teamId: number, targetGroupId: number, onError?: () => void) {
  try {
    await relocateTeam(eventId as string, { teamId, targetGroupId });
    notify.success('Team moved successfully');
  } catch (error) {
    notify.error(error as string);
    if (onError)
      onError();
  } finally {
    fetchGroups();
  }
}

async function updateCourtNumber(courtNumber: string, groupId: number) {
  try {
    await editCourt(groupId, courtNumber);
    notify.success('Court number updated successfully');
  } catch (error) {
    notify.error(error as string);
  }
}

function fetchGroups() {
  emit('fetchGroups');
}

function generateMatches() {
  emit('generateMatches');
}

function finalizeGroup() {
  emit('finalizeGroup');
}
</script>
