<template>
  <MainContentLayout>
    <PlayerProfile :dashboard="dashboard" />
  </MainContentLayout>
</template>

<script setup lang="ts">
import { playersDashboard } from '@/api/user';
import { MainContentLayout } from '@/components/shares/main-content-layout';
import PlayerProfile from '@/components/shares/PlayerProfile.vue';
import { notify } from '@/composables/notify';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const dashboard = ref<object>({});

const route = useRoute();
const playerId = computed(() => route.params.id);

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
