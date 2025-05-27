<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <form class="flex w-full max-w-xl items-center" @submit.prevent="onFilterUpdate">
        <Input id="search" v-model.trim="searchKey" type="search" placeholder="Search" />
        <Button type="submit">
          <Search class="h-4 w-4" />
        </Button>
      </form>

      <div class="flex  items-center gap-1.5">
        <slot name="action">
          <Button :disabled="selectedRows.length < 2" @click="comparePlayer(selectedRows)">
            <GitCompare class="h-4 w-4 mr-2" />
            <span class="text-sm font-semibold">Compare</span>
          </Button>
        </slot>
      </div>
    </div>

    <Datatable
      ref="playerStatsTable"
      :total-records="totalRecords"
      :columns="columns"
      :data="playerStatsList"
      @on-sort-change="fetchData"
      @on-page-change="fetchData"
    >
      <template #actions="{ row }">
        <Button variant="ghost" size="sm">
          <QrCode class="size-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <Files class="size-4" />
        </Button>
        <Button v-if="row.original.status?.toLowerCase() !== 'completed'" variant="ghost" size="sm">
          <ClockAlert class="size-4" />
        </Button>
        <DropdownMenu v-if="row.original.status?.toLowerCase() !== 'completed'">
          <DropdownMenuTrigger as-child>
            <Button variant="ghost" size="sm">
              <Ellipsis class="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye class="size-4 mr-2" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit class="size-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Check class="size-4 mr-2" />
              Complete
            </DropdownMenuItem>
            <DropdownMenuItem class="text-destructive">
              <Trash class="size-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </template>
    </Datatable>
  </div>
</template>

<script setup lang="ts">
// import type { NotifyError } from '@/composables/notify';
import type { ColumnDef } from '@tanstack/vue-table';
import ColumnHeader from '@/components/shares/datatable/ColumnHeader.vue';
import Datatable from '@/components/shares/datatable/index.vue';
import StatusIndicator from '@/components/shares/StatusIndicator.vue';
import { Button } from '@/components/shares/ui/button';
import { Checkbox } from '@/components/shares/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/shares/ui/dropdown-menu';
import { Input } from '@/components/shares/ui/input';
import { useEventStore } from '@/stores/event';
// import SelectInput from '@/components/shares/ui/select/SelectInput.vue';
import { Check, ClockAlert, Edit, Ellipsis, Eye, Files, GitCompare, QrCode, Search, Trash } from 'lucide-vue-next';
import { computed, h, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  playerStats: {
    type: Array,
    default: () => [],
  },
});

const router = useRouter();
const playerStatsList = computed(() => props.playerStats);
const totalRecords = ref(0);
const playerStatsTable = ref();

const searchKey = ref('');
const selectedRows = computed(() => {
  const selection = playerStatsTable.value?.table?.options?.state?.rowSelection || {};
  // Get selected row indices (keys)
  const selectedIndices = Object.keys(selection).filter(key => selection[key]);
  // Map indices to row objects
  return selectedIndices.map(idx => playerStatsList.value[idx]);
});

// This gives you an array of selected row objects
const columns: ColumnDef<any>[] = [
  {
    id: 'select',
    cell: ({ row }) => selectedRows.value.length < 2 || row.getIsSelected()
      ? h(Checkbox, {
          'modelValue': row.getIsSelected(),
          'onUpdate:modelValue': value => row.toggleSelected(!!value),
          'ariaLabel': 'Select row',
        })
      : null,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'eventName',
    header: ({ column }) => h(ColumnHeader, { column, title: 'Event Name' }),
  },
  {
    accessorKey: 'doublesRating',
    header: ({ column }) => h(ColumnHeader, { column, title: 'Doubles Rating' }),

  },
  {
    accessorKey: 'gamesPlayed',
    header: ({ column }) => h(ColumnHeader, { column, title: 'Games Played' }),
  },
  {
    accessorKey: 'doublesRecord',
    header: ({ column }) => h(ColumnHeader, { column, title: 'Doubles Record' }),
  },
];

function fetchData() {
  // const { data } = await getEventList();
  // playerStatsList.value = data;
  // totalRecords.value = data.length;
  // playerStatsTable.value.setPageCount(data.length);
}

function onFilterUpdate() {
  fetchData();
}

function comparePlayer(selectedRows) {
  // Redirect to the compare page with selected player IDs
  router.push({ name: 'ComparePlayerPage' });
}
</script>
