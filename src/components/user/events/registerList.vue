<template>
  <div>
    <span>
      Who's Signed Up /Checked in ? ({{ players.length || 0 }}) Teams Checked in: 0
    </span>
    <Datatable
      ref="registerTable"
      :total-records="players.length"
      :columns="columns"
      :data="players || []"
      @on-sort-change="fetchData"
      @on-page-change="fetchData"
      @on-row-click="(row) => $router.push({ name: 'ViewEvent', params: { id: row.id } })"
    >
      <template #partner="{ row }">
        {{ row.original?.partner }}
        <PlayerSearchDialog
          v-if="row.original?.player?.id === currentUserPlayerId"
          :event="event"
        >
          <Button variant="destructive" size="sm">
            <User class="size-4 me-1" /> Select Partner
          </Button>
        </PlayerSearchDialog>
      </template>
      <template #status="{ row }">
        <div>
          <CircleCheck
            v-if="row.original?.status === 'CHECKED_IN' && row.original?.player?.id !== currentUserPlayerId"
            class="size-8 text-green-500"
          />
        </div>
        <Button
          v-if="row.original?.player?.id === currentUserPlayerId"
          variant="destructive"
          size="sm"
          @click.stop="widthdraw(row.original.id)"
        >
          <Dock class="size-4 me-1" />Widthdraw
        </Button>
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
import { useUserStore } from '@/stores';
import { CheckCircle, CircleCheck, Dock, User } from 'lucide-vue-next';
import { computed, h, ref } from 'vue';
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

const userStore = useUserStore();

const currentUserPlayerId = computed(() => userStore.playerId);

const route = useRoute();

const { id } = route.params;

const registerTable = ref(null);

const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'player.name',
    header: 'Player Name',
  },
  {
    accessorKey: 'partner',
    header: 'Partner',
  },
  {
    accessorKey: 'combineRate',
    header: 'Combined Rating',

  },
  {
    accessorKey: 'status',
    header: 'Check In?',
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
