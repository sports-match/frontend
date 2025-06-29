<template>
  <UserEventsDetails v-if="isPlayer" />
  <AdminEventsDetails v-else />
</template>

<script setup lang="ts">
import AdminEventsDetails from '@/components/admin/events/details.vue';
import UserEventsDetails from '@/components/user/events/details.vue';
import { useAuthentication } from '@/composables/authentication';

const { isPlayer } = useAuthentication();
</script>
