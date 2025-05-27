<template>
  <div v-if="column.getCanSort()" :class="cn('flex items-center space-x-2', $attrs.class ?? '')">
    <Button
      variant="ghost"
      size="sm"
      class="align-middle -ml-3 h-8 data-[state=open]:bg-accent"
      @click="toggleSort"
    >
      <span>{{ title }}</span>
      <ChevronDown v-if="column.getIsSorted() === 'desc'" class="ml-1 mb-1 h-4 w-4" />
      <ChevronUp v-else-if=" column.getIsSorted() === 'asc'" class="ml-1 mb-1 h-4 w-4" />
      <ChevronsUpDown v-else class="ml-1 mb-1 h-4 w-4" />
    </Button>
  </div>

  <div v-else :class="$attrs.class">
    {{ title }}
  </div>
</template>

<script setup lang="ts">
import type { Column } from '@tanstack/vue-table';
import { Button } from '@/components/shares/ui/button';
import { cn } from '@/utils';
import { ChevronDown, ChevronsUpDown, ChevronUp } from 'lucide-vue-next';

type DataTableColumnHeaderProps = {
  column: Column<any>;
  title: string;
};

const props = defineProps<DataTableColumnHeaderProps>();

function toggleSort() {
  props.column.toggleSorting();
}
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
