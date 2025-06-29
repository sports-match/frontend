<template>
  <div>
    <span>
      Who's Signed Up /Checked in ? ({{ players.totalElements }}) Teams Checked in: 0
    </span>
    {{ players }}
    <Datatable
      ref="registerTable"
      :total-records="players.length"
      :columns="columns"
      :data="players || []"
      @on-sort-change="fetchData"
      @on-page-change="fetchData"
      @on-row-click="(row) => $router.push({ name: 'ViewEvent', params: { id: row.id } })"
    >
      <template #checkIn="{ row }">
        <CheckCircle v-if="row.original.checkIn" class="size-6 text-green-500" />
        <X v-else class="size-6 text-destructive" />
      </template>
    </Datatable>
  </div>
</template>

<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table';
import { withdrawEvent } from '@/api/event';
import ColumnHeader from '@/components/shares/datatable/ColumnHeader.vue';
import Datatable from '@/components/shares/datatable/index.vue';
import PlayerSearchDialog from '@/components/shares/dialogs/PlayerSearchDialog.vue';
import { Button } from '@/components/shares/ui/button';
import { notify } from '@/composables/notify';
import { CheckCircle, Dock, User, X } from 'lucide-vue-next';
import { h, ref } from 'vue';
import { useRoute } from 'vue-router';

defineProps({
  event: {
    type: Object,
    default: () => ({}),
  },
  players: {
    type: Array,
    default: () => [],
  },
});

const route = useRoute();

const { id } = route.params;

const registerTable = ref(null);

const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => h(ColumnHeader, { column, title: 'Player Name' }),
  },
  {
    accessorKey: 'rating',
    header: ({ column }) => h(ColumnHeader, { column, title: 'Rating' }),

  },
  {
    accessorKey: 'checkIn',
    header: ({ column }) => h(ColumnHeader, { column, title: 'Check In?' }),
  },
];

function fetchData() {
  // registerTable.value?.fetchData();
}

async function widthdraw(playerId: string | number) {
  try {
    await withdrawEvent(id as string, {
      eventId: id,
      playerId,
    });
    notify.success('Widthdraw event successfully');
  } catch (e) {
    notify.error(e as string);
  }
}
</script>
