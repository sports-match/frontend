<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <Button class="bg-primary text-white">
        <Plus class="w-5 h-5 mr-2" />
        Add Member
      </Button>
    </DialogTrigger>
    <DialogContent class="max-w-lg w-full sm:max-w-xl rounded-2xl p-0 overflow-hidden h-[80vh]">
      <Command class="rounded-lg border shadow-md h-full">
        <div class="flex items-center px-4 pt-4 pb-2 border-b">
          <CommandInput
            placeholder="Search"
            class="w-full border-none outline-none ring-0 focus:ring-0"
            @input="onSearch($event.target.value)"
          />
        </div>
        <CommandList
          class="overflow-y-auto px-4 py-2 max-h-[calc(80vh-60px)]"
          @scroll.passive="onScroll"
        >
          <CommandGroup heading="Players Name">
            <CommandItem
              v-for="(player, index) in paginatedPlayers"
              :key="player + index"
              class="cursor-pointer py-2"
            >
              {{ player }}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { Button } from '@/components/shares/ui/button';
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/shares/ui/command';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/shares/ui/dialog';
import { Plus } from 'lucide-vue-next';
import { computed, onMounted, ref } from 'vue';

const open = ref(false);

// Example: Replace with your real player list (longer for demo)
const players = [
  'Aaditya chokshi',
  'Aadidev Rijosh 🔥',
  'Aadit Gupta 🔥',
  'Aakash Chaurasia',
  'Aakash Deep',
  'Aakash Khandelwal',
  'Aakash Sivakumar',
  'Aarav Balsu 🦅',
  'aarav rajesh',
  // ...add more names for real use
];

// Pagination state
const pageSize = 20;
const page = ref(1);

// Filtered and paginated players
const filteredPlayers = ref(players);

const paginatedPlayers = computed(() =>
  filteredPlayers.value.slice(0, page.value * pageSize),
);

// Search logic
function onSearch(val: string) {
  page.value = 1;
  filteredPlayers.value = players.filter(p =>
    p.toLowerCase().includes(val.toLowerCase()),
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
</script>
