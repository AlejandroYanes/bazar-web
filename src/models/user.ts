import { AppTheme } from 'components/providers/Theme';

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface SocialAuthCredentials {
  provider: SocialProvider;
  urlParams: string;
}

export enum VerificationLevel {
  UNVERIFIED = -1,
  CODE_VERIFIED = 1,
  USER_INFO_ADDED = 2,
  INTERESTS_ADDED = 3,
}

export enum RelationshipStatus {
  UNRELATED = -1,
  PENDING = 1,
  PENDING_FOR_ME = 2,
  ACCEPTED = 3,
  BLOCKED = 4,
  BLOCKED_ME = 5,
  MUTED = 6,
}

export enum FollowerStatus {
  UNRELATED = -1,
  FOLLOWING = 1,
  MUTED = 2,
  BLOCKED = 3,
}


export interface ProfileDto {
  name: string;
  lastName?: string;
  userName: string;
  email?: string;
  avatar: string;
  theme?: AppTheme;
  useDarkStyle?: boolean;
  verificationLevel?: VerificationLevel;
}

export interface UserInfo extends ProfileDto {
  sub: string;
  accessToken: string;
}

export interface PasswordDto {
  current: string;
  newPassword: string;
}

export interface ResetPasswordDto {
  email: string;
  verificationCode: number;
  newPassword: string;
}

export interface UserModel {
  id: string;
  userName: string;
  name: string;
  avatar: string;
  active?: boolean;
}

export interface PublisherModel extends UserModel {
  count?: {
    events: number;
    followers: number;
  };
  friends: {
    id: string;
    avatar: string;
  }[];
  followerStatus: FollowerStatus;
}

export interface ConsumerModel extends UserModel {
  count?: {
    following: number;
    friends: number;
  };
  friends: {
    id: string;
    avatar: string;
  }[];
  relationStatus: RelationshipStatus;
}

export interface ProfileStats {
  friends: number;
  following: number;
}

export enum SocialProvider {
  Google = 'google',
  Facebook = 'facebook',
  Instagram = 'instagram'
}
