import { useUserStore } from '@/stores';
import { get, set, useStorage } from '@vueuse/core';
import { computed } from 'vue';

export function useAuthentication() {
  const userStore = useUserStore();
  const token = useStorage('token', null, sessionStorage);
  const isAuthenticated = computed(() => !!get(token));

  const getToken = computed(() => {
    const tokenValue = get(token);
    return tokenValue || null;
  });

  const isPlayer = computed(() => {
    return userStore.$state.userDetails.user.userType === 'PLAYER';
  });

  const assessmentStatus = computed(() => {
    if (!isPlayer.value)
      return true;
    return userStore.$state.assessmentStatus?.assessmentCompleted;
  });

  function clearSession() {
    set(token, null);
  }

  function logout() {
    set(token, null);
  }

  return { logout, token, isAuthenticated, clearSession, getToken, isPlayer, assessmentStatus };
}
