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
    userType: string;
  };
};

type AssessmentStatus = { assessmentCompleted: boolean; message: string };

export const useUserStore = defineStore('user', {
  persist: {
    storage: sessionStorage,
  },
  state: () => ({
    userDetails: {} as UserDetails,
    assessmentStatus: {
      assessmentCompleted: false,
      message: '',
    },
    playerId: null as number | null,
  }),
  actions: {
    setAssessmentStatus(status: boolean) {
      this.assessmentStatus.assessmentCompleted = status;
    },
    setUserDetails(details: UserDetails, assessmentStatus: AssessmentStatus, playerId: number | null) {
      this.userDetails = details;
      this.assessmentStatus = assessmentStatus;
      this.playerId = playerId;
    },
    Logout() {
      const { logout } = useAuthentication();
      logout();
    },
  },
});
