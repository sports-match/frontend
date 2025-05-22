import { get, set, useStorage } from '@vueuse/core';
import { computed } from 'vue';

export function useAuthentication() {
  const accessToken = useStorage('accessToken', null, localStorage);
  const isAuthenticated = computed(() => !!get(accessToken));

  function logout() {
    set(accessToken, null);
  }

  return { accessToken, isAuthenticated, logout };
}
