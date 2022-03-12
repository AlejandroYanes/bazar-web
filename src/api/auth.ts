import { AxiosPromise, AxiosResponse } from 'axios';
import {
  AuthCredentials,
  PasswordDto,
  ProfileDto,
  ResetPasswordDto,
  SocialProvider,
  UserInfo,
} from 'models/user';
import { post, patch, get, ApiContentType } from './base';

const endpoint = 'auth';

const authApi = {
  signIn: (credentials: AuthCredentials): AxiosPromise<UserInfo> => {
    return post(`${endpoint}/login`, credentials);
  },
  signUp: (credentials: AuthCredentials): AxiosPromise<UserInfo> => {
    return post(`${endpoint}/signup`, credentials);
  },
  resendSignUpVerifyEmail: (email: string): AxiosPromise<void> => {
    return post(`${endpoint}/signup/resend-verify-email`, { email })
  },
  verify: (code: number): Promise<AxiosResponse<UserInfo>> => {
    return patch(`${endpoint}/verify`, { code });
  },
  updateProfile: (profileData: ProfileDto): AxiosPromise<UserInfo> => {
    return patch(`${endpoint}/profile`, profileData);
  },
  updatePassword: (passwords: PasswordDto): AxiosPromise<UserInfo> => {
    return patch(`${endpoint}/password`, passwords);
  },
  updateTheme: (
    theme: string,
    useDarkStyle: boolean,
  ): Promise<AxiosResponse<UserInfo>> => {
    return patch(`${endpoint}/profile`, { theme, useDarkStyle });
  },
  updateAvatar: (image: File): Promise<AxiosResponse<UserInfo>> => {
    const formData = new FormData();
    formData.append('image', image);

    return patch(
      `${endpoint}/avatar`,
      formData,
      { headers: { 'Content-Type': ApiContentType.MULTIPART } },
    );
  },
  socialAuth: (provider: SocialProvider, search: string): AxiosPromise<UserInfo> => {
    return get(`${endpoint}/social/${provider}/fallback${search}`)
  },
  sendResetPasswordEmail: (email: string): AxiosPromise<void> => {
    return post(`${endpoint}/password/reset/send-email`, { email })
  },
  resetPassword: (resetPasswordDto: ResetPasswordDto): AxiosPromise<UserInfo> => {
    return patch(`${endpoint}/password/reset`, resetPasswordDto);
  },
};

export default authApi;
