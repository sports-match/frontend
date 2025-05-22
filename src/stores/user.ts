import { useAuthentication } from '@/composables';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    userDetails: {
      displayName: 'Jack Handy',
      username: 'jackhandy786',
      firstName: 'Jack',
      lastName: 'Handy',
      phone: '123-456-7890',
      email: 'jack.handy@example.com',
    },
  }),
  actions: {
    Logout() {
      const { logout } = useAuthentication();
      logout();
    },
  },
});
