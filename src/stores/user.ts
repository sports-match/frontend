import type { AssessmentStatus, AuthUser } from '@/schemas/user';
import { useAuthentication } from '@/composables';
import { defineStore } from 'pinia';

// type AssessmentStatus = { assessmentCompleted: boolean; message: string };

export const useUserStore = defineStore('user', {
  persist: {
    storage: sessionStorage,
  },
  state: () => ({
    userDetails: {
      assessmentStatus: {
        assessmentCompleted: false,
        message: '',
      } as AssessmentStatus,
      playerId: null as number | null,
      completedClubSelection: false,
      organizerId: null as number | null,
      organizerInfo: {},
      user: {},
    } as AuthUser,
  }),
  actions: {
    setAssessmentStatus(status: boolean) {
      if (this.userDetails && this.userDetails.assessmentStatus) {
        this.userDetails.assessmentStatus.assessmentCompleted = status;
      }
    },
    setCompletedClubSelection(status: boolean) {
      if (this.userDetails) {
        this.userDetails.completedClubSelection = status;
      }
    },
    setUserDetails(details: AuthUser) {
      this.userDetails = details;
    },
    isAdmin() {
      if (this.userDetails) {
        return this.userDetails.user?.roles?.includes('Admin');
      }
    },
    isOrganizerVerify() {
      if (this.userDetails) {
        return this.userDetails.organizerInfo?.verificationStatus === 'VERIFIED';
      }
    },
    Logout() {
      const { logout } = useAuthentication();
      logout();
    },
  },
});
