import { get, set, useStorage } from '@vueuse/core';
import { computed } from 'vue';

export function useAuthentication() {
  const token = useStorage('token', null, sessionStorage);
  const isAuthenticated = computed(() => !!get(token));

  const getToken = computed(() => {
    const tokenValue = get(token);
    return tokenValue || null;
  });

  function clearSession() {
    set(token, null);
  }

  function logout() {
    set(token, null);
  }

  return { logout, token, isAuthenticated, clearSession, getToken };
}
