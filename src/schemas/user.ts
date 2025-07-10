type Role = {
  id: number;
  level: number;
  name: string;
};

type Authority = {
  authority: string;
};

type BaseUser = {
  email: string;
  enabled: boolean;
  id: number;
  nickName: string;
  password: string;
  phone: string;
  roles: Role[];
  userType: 'ORGANIZER' | 'PLAYER';
  username: string;
};

type OrganizerInfo = {
  clubs: any[];
  createTime: string;
  description: string;
  id: number;
  updateTime: string;
  user: BaseUser & {
    createBy: string;
    createTime: string;
    emailVerified: boolean;
    isAdmin: boolean;
    updateBy: string;
    updateTime: string;
  };
  verificationStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
};

export type AssessmentStatus = {
  assessmentCompleted: boolean;
  message: string;
  playerId: number;
};

export type AuthUser = {
  token?: string;
  user: {
    authorities: Authority[];
    dataScopes: any[];
    roles: string[];
    user: BaseUser;
    username: string;
  };
  organizerId?: number;
  completedClubSelection?: boolean;
  organizerInfo?: OrganizerInfo;
  assessmentStatus?: AssessmentStatus;
  playerId?: number;
};
