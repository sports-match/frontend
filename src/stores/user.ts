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
    userDetails: {
      displayName: 'Jack Handy',
      authorities: [
        {
          authority: 'admin',
        },
      ],
      roles: [
        'admin',
      ],
      user: {
        avatarName: 'avatar-20250114101539224.png',
        avatarPath: '/Users/jie/Documents/work/me/admin/eladmin-mp/eladmin/~/avatar/avatar-20250114101539224.png',
        dept: {
          id: 2,
          name: '研发部',
        },
        email: '201507802@qq.com',
        enabled: true,
        gender: '男',
        id: 1,
        nickName: '管理员',
        password: '$2a$10$Egp1/gvFlt7zhlXVfEFw4OfWQCGPw0ClmMcc6FjTnvXNRVf9zdMRa',
        phone: '18888888888',
        pwdResetTime: '2020-05-03 08:38:31',
        roles: [
          {
            dataScope: '全部',
            id: 1,
            level: 1,
            name: '超级管理员',
          },
        ],
        username: 'admin',
      },
    },
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
