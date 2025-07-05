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
    return userStore.$state.userDetails.user?.user?.userType === 'PLAYER';
  });

  const isOrganizer = computed(() => {
    return userStore.$state.userDetails?.user?.user?.userType === 'ORGANIZER';
  });

  const isAdmin = computed(() => {
    return userStore.isAdmin();
  });

  const assessmentStatus = computed(() => {
    if (!isPlayer.value)
      return true;
    return userStore.$state?.userDetails?.assessmentStatus?.assessmentCompleted;
  });

  const completedClubSelectionStatus = computed(() => {
    if (isOrganizer.value) {
      return userStore.$state?.userDetails?.completedClubSelection;
    }
  });

  function clearSession() {
    set(token, null);
  }

  function logout() {
    set(token, null);
  }

  return { logout, token, isAuthenticated, clearSession, getToken, isPlayer, assessmentStatus, isOrganizer, completedClubSelectionStatus, isAdmin };
}
