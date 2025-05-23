<template>
  <MainContentLayout>
    <template #title>
      Player Stats
    </template>

    <div class="flex flex-col gap-4">
      <PlayerStatsList :player-stats />
    </div>
  </MainContentLayout>
</template>

<script setup lang="ts">
import PlayerStatsList from '@/components/playerStats/List.vue';
import { MainContentLayout } from '@/components/shares/main-content-layout';
import { usePlayerStatsStore } from '@/stores';
import { computed } from 'vue';

const playerStatsStore = usePlayerStatsStore();
const playerStats = computed(() => playerStatsStore.stats);
</script>
