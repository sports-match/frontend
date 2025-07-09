<template>
  <template v-if="isAuthenticated">
    <UserEventsDetails v-if="isPlayer" />
    <AdminEventsDetails v-else />
  </template>
  <PreviewEvent v-if="!isAuthenticated" :event />
</template>

<script setup lang="ts">
import { getEvent } from '@/api/event';
import AdminEventsDetails from '@/components/admin/events/details.vue';
import UserEventsDetails from '@/components/user/events/details.vue';
import PreviewEvent from '@/components/user/events/preview.vue';
import { useAuthentication } from '@/composables/authentication';
import { notify } from '@/composables/notify';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const { isPlayer, isAuthenticated } = useAuthentication();
const event = ref();

const { id } = route.params;
onMounted(async () => {
  if (!isAuthenticated.value) {
    try {
      const { data: content } = await getEvent(id as string);
      event.value = content;
    } catch (error) {
      notify.error(error as string);
    }
  }
});
</script>
