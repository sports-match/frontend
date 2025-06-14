import { useAuthentication } from '@/composables';
import { defineStore } from 'pinia';

type UserDetails = {
  displayName: string;
  authorities: { authority: string }[];
  roles: string[];
  user: {
    avatarName: string;
    avatarPath: string;
    dept: { id: number; name: string };
    email: string;
    enabled: boolean;
    gender: string;
    id: number;
    nickName: string;
    password: string;
    phone: string;
    pwdResetTime: string;
    roles: { dataScope: string; id: number; level: number; name: string }[];
    username: string;
  };
};

export const useUserStore = defineStore('user', {
  persist: {
    storage: sessionStorage,
  },
  state: () => ({
    userDetails: {},
  }),
  actions: {
    setUserDetails(details: UserDetails) {
      this.userDetails = details;
    },
    Logout() {
      const { logout } = useAuthentication();
      logout();
    },
  },
});
