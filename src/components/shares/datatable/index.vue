<template>
  <div class="space-y-4">
    <Toolbar v-if="!manualFiltering" :table="table" />
    <div class="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header" :props="header.getContext()" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <template v-for="row in table.getRowModel().rows" :key="row.id">
              <!-- Main Row -->
              <TableRow
                :data-state="row.getIsSelected() && 'selected'"
                @click="$emit('onRowClick', row)"
              >
                <TableCell
                  v-for="cell in row.getVisibleCells()"
                  :key="cell.id"
                >
                  <slot :name="cell.column.id" :row="row" :cell="cell">
                    <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                  </slot>
                </TableCell>
              </TableRow>

              <!-- Expanded Row Slot -->
              <TableRow
                v-if="expandedRowKeys?.includes(row.original.id.toString())"
                class="bg-muted/50"
              >
                <TableCell :colspan="columns.length" class="p-4">
                  <slot name="expanded-row" :row="row" />
                </TableCell>
              </TableRow>
            </template>
          </template>

          <TableRow v-else>
            <TableCell
              :colspan="columns.length"
              class="h-24 text-center"
            >
              No results.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
    <DataTablePagination v-if="!hidePagination" :table="table" :page-sizes="pageSizes" />
  </div>
</template>

<script setup lang="ts">
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  Updater,
  VisibilityState,
} from '@tanstack/vue-table';
import { valueUpdater } from '@/components/shares/ui/lib/utils.ts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shares/ui/table';
import {
  FlexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from '@tanstack/vue-table';
import { ref } from 'vue';
import DataTablePagination from './Pagination.vue';
import Toolbar from './Toolbar.vue';

type DataTableProps = {
  columns: ColumnDef<any>[];
  data: any[];
  pageSizes?: number[];
  totalRecords: number;
  manualPagination?: boolean;
  manualSorting?: boolean;
  manualFiltering?: boolean;
  hidePagination?: boolean;
  expandedRowKeys?: string[]; // or number[] depending on your `id`
};
const {
  columns,
  data,
  pageSizes = [20, 30, 50],
  totalRecords,
  manualPagination = true,
  manualSorting = true,
  manualFiltering = true,
  hidePagination = false,
} = defineProps<DataTableProps>();

const emits = defineEmits(['onPageChange', 'onSortChange', 'onRowClick']);

const sorting = ref<SortingState>([]);
const columnFilters = ref<ColumnFiltersState>([]);
const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref({});

const table = useVueTable({
  get data() { return data; },
  get columns() { return columns; },
  get rowCount() { return totalRecords; },
  state: {
    get sorting() { return sorting.value; },
    get columnFilters() { return columnFilters.value; },
    get columnVisibility() { return columnVisibility.value; },
    get rowSelection() { return rowSelection.value; },
  },
  enableRowSelection: true,
  onSortingChange: sortingChange,
  onColumnFiltersChange: (updaterOrValue: Updater<ColumnFiltersState>) => valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: (updaterOrValue: Updater<VisibilityState>) => valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: (updaterOrValue: Updater<any>) => valueUpdater(updaterOrValue, rowSelection),
  onPaginationChange: setPagination,
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFacetedRowModel: getFacetedRowModel(),
  getFacetedUniqueValues: getFacetedUniqueValues(),
  manualPagination,
  manualSorting,
  manualFiltering,
  initialState: {
    pagination: {
      pageIndex: 0,
      pageSize: 20,
    },
  },
});

async function setPagination(updaterOrValue: Updater<any>) {
  const newPageInfo = updaterOrValue(table.getState().pagination);
  await table.setState((updater: Updater<unknown>) => ({ ...updater, pagination: newPageInfo }));
  emits('onPageChange', {
    pageIndex: newPageInfo.pageIndex,
    pageSize: newPageInfo.pageSize,
  });
}

async function sortingChange(updaterOrValue: Updater<any>) {
  valueUpdater(updaterOrValue, sorting);
  emits('onSortChange');
}

function resetPagination() {
  setPagination((prev: any) => ({
    ...prev,
    pageIndex: 0,
  }));
}

defineExpose({ table, resetPagination });
</script>
