<template>
  <MainContentLayout>
    <template #title>
      Player Stats
    </template>

    <div class="flex flex-col gap-4">
      <PlayerStatsList />
    </div>
  </MainContentLayout>
</template>

<script setup lang="ts">
import PlayerStatsList from '@/components/playerStats/List.vue';
import { MainContentLayout } from '@/components/shares/main-content-layout';
</script>
