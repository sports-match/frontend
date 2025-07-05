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
      @input="onSearch"
    />

    <!-- Club List -->
    <div
      ref="listRef"
      class="space-y-2 max-h-[300px] overflow-y-auto pr-1"
    >
      <div
        v-for="club in clubs"
        :key="club.id"
        class="flex items-center justify-between px-4 py-2 rounded-md cursor-pointer"
        :class="[
          selectedClubs.includes(club.id)
            ? 'bg-muted hover:bg-muted-foreground/5'
            : 'hover:bg-muted-foreground/5',
        ]"
        @click="toggleClub(club)"
      >
        <span>{{ club.name }}</span>
        <svg v-if="selectedClubs.includes(club.id)" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <!-- Loading spinner -->
      <div v-if="loading" class="text-center text-sm text-gray-500 py-2">
        Loading more clubs...
      </div>
    </div>

    <!-- Apply Button -->
    <Button class="w-full" :disabled="selectedClubs.length === 0" @click="submitSelection">
      Apply ({{ selectedClubs.length }})
    </Button>
  </PublicLayout>
</template>

<script setup lang="ts">
import type { Club } from '@/schemas/events';
import { addClubToOrganizer, getClubs } from '@/api/event';
import PublicLayout from '@/components/layouts/public/Layout.vue';
import { Button } from '@/components/shares/ui/button';
import { Input } from '@/components/shares/ui/input';
import { notify } from '@/composables/notify';
import { useUserStore } from '@/stores';
import { useScroll } from '@vueuse/core';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const userStore = useUserStore();
const clubs = ref<Club[]>([]);
const selectedClubs = ref<number[]>([]);
const search = ref('');
const page = ref(0);
const size = 20;
const hasMore = ref(true);
const loading = ref(false);
const totalClubs = ref(0);

// Fetch clubs with pagination & search
async function fetchClubs(reset = false) {
  if (loading.value || (!hasMore.value && !reset))
    return;

  loading.value = true;
  try {
    const { data: { content, totalElements } } = await getClubs({
      page: reset ? 0 : page.value,
      size,
      name: search.value,
    });

    if (reset) {
      clubs.value = content;
      page.value = 1;
    } else {
      clubs.value.push(...content);
      page.value++;
    }

    totalClubs.value = totalElements;
    hasMore.value = clubs.value.length < totalClubs.value;
  } catch (err) {
    notify.error(err as string);
  } finally {
    loading.value = false;
  }
}

let debounceTimer: ReturnType<typeof setTimeout> | null = null;

function onSearch() {
  hasMore.value = true;
  page.value = 0;
  if (debounceTimer)
    clearTimeout(debounceTimer);
  if (search.value.trim().length > 0 && search.value.trim().length < 3) {
    return;
  }
  debounceTimer = setTimeout(() => {
    fetchClubs(true);
  }, 500);
}

// Toggle selected club
function toggleClub(club: Club) {
  const index = selectedClubs.value.indexOf(club.id);
  if (index === -1)
    selectedClubs.value.push(club.id);
  else selectedClubs.value.splice(index, 1);
}

async function submitSelection() {
  const organizerId = userStore.userDetails?.organizerId as number;

  try {
    await addClubToOrganizer(organizerId, { clubs: selectedClubs.value });
    router.push({ name: 'DashboardPage' });
    userStore.setCompletedClubSelection(true);
  } catch (error) {
    notify.error(error as string);
  }
}

// Scroll detection for infinite scroll
const listRef = ref<HTMLElement | null>(null);
const { y } = useScroll(listRef);

watch(y, async (currentY) => {
  if (!listRef.value)
    return;
  const threshold = listRef.value.scrollHeight - listRef.value.clientHeight - 100;
  if (currentY >= threshold) {
    await fetchClubs();
  }
});

// Initial load
fetchClubs();
</script>
