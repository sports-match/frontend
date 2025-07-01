<template>
  <div class="rounded-md border">
    <Table>
      <!-- Table Header -->
      <TableHeader>
        <TableRow>
          <TableHead class="w-[200px]">Group</TableHead>
          <TableHead>Matches</TableHead>
          <TableHead>Court</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Players</TableHead>
        </TableRow>
      </TableHeader>

      <!-- Table Body -->
      <TableBody>
        <template v-for="(group, gIndex) in groups" :key="gIndex">
          <!-- Main Group Row -->
          <TableRow class="cursor-pointer hover:bg-muted" @click="toggleExpand(gIndex)">
            <TableCell class="p-6 flex font-medium items-center gap-2">
              <Button size="sm">
                <Minus v-if="expanded[gIndex]" class="size-4" />
                <Plus v-else class="size-4" />
              </Button>
              <span>{{ group.name }}</span>
            </TableCell>
            <TableCell class="items-center p-2">
              <div class="flex items-center justify-between">
                <span>{{ group.matches }}</span>
                <Button variant="outline" size="sm">
                  <Edit class="size-3 text-primary" />
                </Button>
              </div>
            </TableCell>
            <TableCell>
              <div class="flex items-center justify-between">
                <span>{{ group.court }}</span>
                <Button variant="outline" size="sm">
                  <Edit class="size-3 text-primary" />
                </Button>
              </div>
            </TableCell>
            <TableCell>
              <div class="flex items-center justify-between">
                <span>{{ group.time }}</span>
                <Button variant="outline" size="sm">
                  <Clock class="size-3 text-primary" />
                </Button>
              </div>
            </TableCell>
            <TableCell>{{ group.players }}</TableCell>
          </TableRow>

          <!-- Expandable Nested Rows -->
          <template v-if="expanded[gIndex]">
            <TableRow class="bg-muted/50">
              <TableCell colspan="6" class="pl-14 pt-2 pb-4">
                <div class="grid grid-cols-6 font-semibold pb-2 border-b">
                  <span class="col-span-3">Players Name</span>
                  <span>Rank</span>
                  <span class="col-span-2 text-right">Actions</span>
                </div>

                <div
                  v-for="(player, pIndex) in group.playersList"
                  :key="pIndex"
                  class="grid grid-cols-6 py-2 border-b last:border-b-0 text-sm"
                >
                  <span class="col-span-3 p-2">{{ player.name }}</span>
                  <span class="p-2">{{ player.rank }}</span>
                  <div class="col-span-2 flex justify-end gap-2">
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
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </template>
        </template>
      </TableBody>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { Button } from '@/components/shares/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shares/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shares/ui/table';
import {
  ArrowLeftRight,
  Clock,
  ClockAlert,
  Dock,
  Edit,
  Ellipsis,
  Eye,
  Minus,
  Plus,
  Trash,
} from 'lucide-vue-next';

interface Player {
  name: string;
  rank: number;
}

interface Group {
  name: string;
  matches: number;
  court: number;
  time: string;
  players: number;
  playersList: Player[];
}

const props = defineProps<{
  groups: Group[];
}>();

const expanded = ref<boolean[]>([]);

watchEffect(() => {
  expanded.value = props.groups.map(() => false);
});

function toggleExpand(index: number) {
  expanded.value[index] = !expanded.value[index];
}
</script>
