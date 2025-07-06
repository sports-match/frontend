<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <form class="flex w-full max-w-xl items-center" @submit.prevent="onFilterUpdate">
        <Input id="search" v-model.trim="searchKey" type="search" placeholder="Search" />
        <Button type="submit" @click="onSearch">
          <Search class="h-4 w-4" />
        </Button>
      </form>

      <!-- <div class="flex  items-center gap-1.5">
        <slot name="action">
          <Button :disabled="selectedRows.length < 2" @click="comparePlayer(selectedRows)">
            <GitCompare class="h-4 w-4 mr-2" />
            <span class="text-sm font-semibold">Compare</span>
          </Button>
        </slot>
      </div> -->
    </div>
    <Datatable
      ref="playerStatsTable"
      :total-records="totalRecords"
      :columns="columns"
      :data="playerStatsList"
      @on-page-change="fetchData"
      @on-row-click="(row) => $router.push({ name: 'ViewPayerStats', params: { id: row.original.playerId } })"
    >
      <!-- <template #sportRatings="{ row }">
        {{ row.original.sportRatings[0]?.rateScore }}
      </template> -->
    </Datatable>
  </div>
</template>

<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table';
import { getPlayersDoubleStats } from '@/api/event';
import Datatable from '@/components/shares/datatable/index.vue';
import { Button } from '@/components/shares/ui/button';
import { Input } from '@/components/shares/ui/input';
import { notify } from '@/composables/notify';
import { Search } from 'lucide-vue-next';
import { onMounted, ref } from 'vue';

// const router = useRouter();
const playerStatsList = ref([]);
const totalRecords = ref(0);
const playerStatsTable = ref();

const searchKey = ref('');
// const selectedRows = computed(() => {
//   const selection = playerStatsTable.value?.table?.options?.state?.rowSelection || {};
//   // Get selected row indices (keys)
//   const selectedIndices = Object.keys(selection).filter(key => selection[key]);
//   // Map indices to row objects
//   return selectedIndices.map(idx => playerStatsList.value[idx]);
// });

// This gives you an array of selected row objects
const columns: ColumnDef<any>[] = [
  // {
  //   id: 'select',
  //   cell: ({ row }) => selectedRows.value.length < 2 || row.getIsSelected()
  //     ? h(Checkbox, {
  //         'modelValue': row.getIsSelected(),
  //         'onUpdate:modelValue': value => row.toggleSelected(!!value),
  //         'ariaLabel': 'Select row',
  //       })
  //     : null,
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: 'playerName',
    header: 'Name',
  },
  {
    accessorKey: 'doublesRanking',
    header: 'Doubles Rating',

  },
  {
    accessorKey: 'gamesPlayed',
    header: 'Games Played',
  },
  {
    accessorKey: 'record',
    header: 'Doubles Record',
  },
];

onMounted(() => {
  fetchData();
});

function onSearch() {
  const { table } = playerStatsTable.value;
  const { pagination: { pageIndex: page } } = table?.getState();
  if (page !== 0) {
    playerStatsTable.value?.resetPagination();
  }
  fetchData();
}

async function fetchData() {
  const { table } = playerStatsTable.value;
  const { pagination: { pageIndex, pageSize } } = table?.getState();
  try {
    const { data: { content, totalElements } } = await getPlayersDoubleStats({
      name: searchKey.value,
      page: pageIndex,
      size: pageSize,
    });
    playerStatsList.value = content;
    totalRecords.value = totalElements;
  } catch (error) {
    notify.error(error as string);
  }
}

function onFilterUpdate() {
  // fetchData();
}

// function comparePlayer(selectedRows) {
//   console.log(selectedRows);
//   // Redirect to the compare page with selected player IDs
//   router.push({ name: 'ComparePlayerPage' });
// }
</script>
