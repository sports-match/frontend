<template>
  <div>
    <PlayerEventView v-if="isPlayer" />
    <AdminEventView v-else />
  </div>
</template>

<script setup lang="ts">
import AdminEventView from '@/components/admin/events/index.vue';
import PlayerEventView from '@/components/user/events/views/index.vue';
import { useAuthentication } from '@/composables/authentication';

const { isPlayer } = useAuthentication();
</script>
