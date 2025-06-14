<template>
  <PublicLayout>
    <template #title>
      Club Selection
    </template>
    <template #subtitle>
      Get ready to smash! Choose your club and join the game.
    </template>
    <!-- Search -->
    <Input
      v-model="search"
      placeholder="Search"
      class="w-full"
    />

    <!-- Club List -->
    <div class="space-y-2 max-h-[300px] overflow-y-auto pr-1">
      <div
        v-for="club in filteredClubs"
        :key="club"
        class="flex items-center justify-between px-4 py-2 rounded-md cursor-pointer"
        :class="[
          selectedClubs.includes(club)
            ? 'bg-muted hover:bg-muted-foreground/5'
            : 'hover:bg-muted-foreground/5',
        ]"
        @click="toggleClub(club)"
      >
        <span>{{ club }}</span>
        <svg v-if="selectedClubs.includes(club)" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    </div>

    <!-- Apply Button -->
    <Button class="w-full" :disabled="selectedClubs.length === 0" @click="submitSelection">
      Apply ({{ selectedClubs.length }})
    </Button>
  </PublicLayout>
</template>

<script setup>
import PublicLayout from '@/components/layouts/public/Layout.vue';
import { Button } from '@/components/shares/ui/button';
import { Input } from '@/components/shares/ui/input';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const clubs = [
  'Bellevue Badminton Club',
  'Seattle Badminton Club',
  'Northwest Badminton Academy',
  'South Bellevue Community Center',
  'Harbour Pointe Badminton Club',
  'Issaquah Smashers Club',
  'Redmond Racquets',
  'Evergreen Shuttlers',
];

const selectedClubs = ref([]);
const search = ref('');

const filteredClubs = computed(() => {
  return clubs.filter(club =>
    club.toLowerCase().includes(search.value.toLowerCase()),
  );
});

function toggleClub(club) {
  const index = selectedClubs.value.indexOf(club);
  if (index === -1) {
    selectedClubs.value.push(club);
  } else {
    selectedClubs.value.splice(index, 1);
  }
}

function submitSelection() {
  router.push({
    name: 'DashboardPage',
    query: { pending: true },
  });
}
</script>
