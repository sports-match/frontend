<template>
  <Dialog v-model:open="open" @update:open="(open) => { if (open) fetchPlayers() }">
    <DialogTrigger as-child>
      <slot>
        <Button class="bg-primary text-white">
          <Plus class="w-5 h-5 mr-2" />
          Add Member
        </Button>
      </slot>
    </DialogTrigger>
    <DialogContent class="max-w-lg w-full p-0">
      <Command class="rounded-lg border h-full">
        <div class="flex items-center px-4 pt-4 pb-2 border-b">
          <CommandInput
            placeholder="Search"
            class="w-full"
            @input="onSearch($event.target.value)"
          />
        </div>
        <CommandList
          class="overflow-y-auto px-4 py-2 max-h-[calc(80vh-110px)]"
          @scroll.passive="onScroll"
        >
          <CommandGroup heading="Players Name">
            <CommandItem
              v-for="player in players"
              :key="player.id"
              :value="player"
              class="cursor-pointer py-2 flex items-center"
              :class="selectedPlayer?.id === player.id ? 'bg-blue-100 text-primary font-semibold' : ''"
              @click="selectPlayer(player)"
            >
              <span class="flex-1">{{ player?.player?.name }}</span>
              <span v-if="selectedPlayer?.id === player?.id" class="ml-2 text-primary"><CheckIcon class="w-4 h-4" /></span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
      <DialogFooter class="p-5 pt-0">
        <Button
          :disabled="!selectedPlayer"
          @click="submitPlayer"
        >
          Submit
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import type { Player } from '@/schemas/players';
import { getEventPlayers, getPlayers, joinEvent, teamPlayerAssign } from '@/api/event';
import { Button } from '@/components/shares/ui/button';
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/shares/ui/command';
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from '@/components/shares/ui/dialog';
import { notify } from '@/composables/notify';
import { CheckIcon, Plus } from 'lucide-vue-next';
import { computed, ref } from 'vue';

const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
  getAll: {
    type: Boolean,
    default: false,
  },
  playerId: {
    type: Number,
    required: false,
  },
});

const emit = defineEmits(['onSubmit']);

const open = ref(false);

const players = ref<{ id: number; name: string; player: Player }[]>([]);

const selectedPlayer = ref<null | { id: number; name: string; player: Player }>(null);
// Pagination state
const pageSize = 20;
const page = ref(1);

// Filtered and paginated players
const filteredPlayers = ref(players.value);

const paginatedPlayers = computed(() =>
  filteredPlayers.value.slice(0, page.value * pageSize),
);

async function fetchPlayers() {
  try {
    if (props.getAll) {
      const { data: { content } } = await getPlayers();
      players.value = content;
    } else {
      const { data } = await getEventPlayers(props.event.id);
      players.value = data.filter((item: { player: Player }) => item.player?.id !== props.playerId);
    }
  } catch (error) {
    notify.error(error as string);
  }
}
// Search logic
function onSearch(val: string) {
  page.value = 1;
  filteredPlayers.value = players.value.filter(p =>
    p.name.toLowerCase().includes(val.toLowerCase()),
  );
}

// Infinite scroll handler
function onScroll(e: Event) {
  const el = e.target as HTMLElement;
  if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
    if (paginatedPlayers.value.length < filteredPlayers.value.length) {
      page.value++;
    }
  }
}

function selectPlayer(player: { id: number; name: string; player: Player }) {
  selectedPlayer.value = player;
}

async function submitPlayer() {
  if (selectedPlayer.value) {
    try {
      const id = props.event.id;
      if (props.getAll) {
        await joinEvent(id as string, {
          eventId: id,
          playerId: selectedPlayer.value.player?.id,
          joinWaitList: true,

        });
        notify.success('Player joined event successfully');
      } else {
        await teamPlayerAssign({
          targetTeamId: props.playerId,
          teamPlayerId: selectedPlayer.value.player?.id,
        });
        notify.success('Player assign successfully');
      }
      emit('onSubmit');
      open.value = false;
    } catch (e) {
      notify.error(e as string);
    }
  }
}
</script>
