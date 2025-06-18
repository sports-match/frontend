<template>
  <div>
    <PlayerDashboard v-if="isPlayer" />
    <AdminDashboard v-else />
  </div>
</template>

<script setup lang="ts">
import AdminDashboard from '@/components/admin/dashboard.vue';
import PlayerDashboard from '@/components/user/dashboard.vue';
import { useAuthentication } from '@/composables/authentication';

const { isPlayer } = useAuthentication();
</script>
