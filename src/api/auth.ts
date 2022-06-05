import { AuthCredentials } from 'models/account';
import { SessionModel } from 'models/session';
import { UserModel } from 'models/user';
import { getAppWrite } from './base';

const authApi = {
  getCurrentSession: (): Promise<SessionModel> => {
    return getAppWrite().account.getSession('current');
  },
  getUserInfo: (): Promise<UserModel> => {
    return getAppWrite().account.get();
  },
  signIn: ({ email, password }: AuthCredentials): Promise<SessionModel> => {
    return getAppWrite().account.createSession(email, password);
  },
  signUp: ({ email, password, name }: AuthCredentials)=> {
    return getAppWrite().account.create('unique()', email, password, name);
  },
  createAnonymousSession: (): Promise<SessionModel> => {
    return getAppWrite().account.createAnonymousSession();
  },
  logout: (sessionId: string) => {
    return getAppWrite().account.deleteSession(sessionId);
  },
};

export default authApi;
