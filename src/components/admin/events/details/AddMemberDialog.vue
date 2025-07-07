<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <slot>
        <Button class="bg-primary text-white">
          <Plus class="w-5 h-5 mr-2" />
          Add Member
        </Button>
      </slot>
    </DialogTrigger>

    <DialogContent class="max-w-lg w-full p-0">
      <!-- Search -->
      <div class="flex items-center px-4 pt-4 pb-2 border-b">
        <Search class="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <input
          type="text"
          placeholder="Search"
          class="w-full px-3 py-2 border-b focus:outline-none"
          @input="onSearch($event.target.value)"
        >
      </div>

      <!-- Scrollable container -->
      <div
        ref="scrollTarget"
        class="overflow-y-auto px-4 py-2 max-h-[calc(80vh-110px)] min-h-10"
      >
        <h4 class="text-sm font-medium mb-2">
          Players Name
        </h4>

        <ul>
          <li
            v-for="player in players"
            :key="player.id"
            class="py-2 px-2 rounded-md cursor-pointer flex items-center hover:bg-gray-100"
            :class="selectedPlayer?.id === player.id ? 'bg-blue-100 text-primary font-semibold' : ''"
            @click="selectPlayer(player)"
          >
            <span class="flex-1">{{ player.name }}</span>
            <CheckIcon
              v-if="selectedPlayer?.id === player.id"
              class="w-4 h-4 text-primary ml-2"
            />
          </li>

          <li
            v-if="loading"
            class="text-center text-sm text-gray-400 py-2"
          >
            Loading...
          </li>
          <li
            v-if="!loading && players.length === 0"
            class="text-center text-sm text-gray-400 py-2"
          >
            No players found
          </li>
        </ul>
      </div>

      <DialogFooter class="p-5 pt-0">
        <Button :disabled="!selectedPlayer" @click="submitPlayer">
          Submit
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import type { Player } from '@/schemas/players';
import type { PropType } from 'vue';
import { getPlayers, joinEvent } from '@/api/event';
import { Button } from '@/components/shares/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from '@/components/shares/ui/dialog';
import { notify } from '@/composables/notify';
import { useInfiniteScroll } from '@vueuse/core';
import { CheckIcon, Plus, Search } from 'lucide-vue-next';
import { ref, watch } from 'vue';

const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
  excludeIds: {
    type: Array as PropType<number[]>,
    default: () => [],
  },
});
const emit = defineEmits(['pullPlayers']);

const open = ref(false);
const players = ref<Player[]>([]);
const selectedPlayer = ref<null | Player>(null);

const page = ref(1);
const pageSize = 30;
const hasMore = ref(true);
const loading = ref(false);
const search = ref('');
const scrollTarget = ref<HTMLElement | null>(null);

async function fetchPlayers(reset = false) {
  if (loading.value || (!hasMore.value && !reset))
    return;

  try {
    loading.value = true;
    if (reset) {
      page.value = 1;
      hasMore.value = true;
      players.value = [];
    }

    const {
      data: { content, totalElements },
    } = await getPlayers({
      page: page.value - 1,
      size: pageSize,
      name: search.value,
    });

    if (reset) {
      players.value = content.filter((p: Player) => !props.excludeIds.includes(p.id));
    } else {
      players.value = [...players.value, ...content].filter((p: Player) => !props.excludeIds.includes(p.id));
    }

    hasMore.value = players.value.length < totalElements;
    page.value++;
  } catch (error) {
    notify.error(error as string);
  } finally {
    loading.value = false;
  }
}

let debounceTimer: ReturnType<typeof setTimeout> | null = null;
function onSearch(val: string) {
  selectedPlayer.value = null; // reset selectedPlayer
  search.value = val;
  if (debounceTimer)
    clearTimeout(debounceTimer);
  if (search.value.trim().length > 0 && search.value.trim().length < 3) {
    return;
  }
  debounceTimer = setTimeout(() => {
    fetchPlayers(true);
  }, 500);
}

function selectPlayer(player: Player) {
  selectedPlayer.value = player;
}

async function submitPlayer() {
  if (!selectedPlayer.value)
    return;
  try {
    await joinEvent(props.event.id, {
      eventId: props.event.id,
      playerId: selectedPlayer.value.id,
      joinWaitList: true,
    });
    notify.success('Player joined event successfully');
    open.value = false;
    emit('pullPlayers');
  } catch (e) {
    notify.error(e as string);
  }
}

watch(open, (val) => {
  if (val)
    fetchPlayers(true);
  if (!val)
    search.value = '';
});

useInfiniteScroll(
  scrollTarget,
  () => {
    if (hasMore.value && !loading.value)
      fetchPlayers();
  },
  { distance: 100 },
);
</script>
