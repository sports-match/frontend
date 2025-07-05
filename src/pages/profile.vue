<template>
  <MainContentLayout>
    <PlayerProfile :dashboard="dashboard" />
  </MainContentLayout>
</template>

<script setup lang="ts">
import { playersDashboard } from '@/api/user';
import MainContentLayout from '@/components/shares/main-content-layout/MainContentLayout.vue';
import PlayerProfile from '@/components/shares/PlayerProfile.vue';
import { notify } from '@/composables/notify';
import { useUserStore } from '@/stores';
import { computed, onMounted, ref } from 'vue';

const userStore = useUserStore();

const playerId = computed(() => userStore?.userDetails.playerId || null);
const dashboard = ref<object>({});

onMounted(() => {
  fetchData();
});

async function fetchData() {
  try {
    const { data } = await playersDashboard(playerId.value);
    dashboard.value = data;
  } catch (error) {
    notify.error(error as string);
  }
}
</script>
