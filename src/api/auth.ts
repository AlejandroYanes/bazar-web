import {
  AuthCredentials,
} from 'models/account';
import { getAppWrite } from './base';

const authApi = {
  signIn: ({ email, password }: AuthCredentials) => {
    return getAppWrite().account.createSession(email, password);
  },
  signUp: ({ email, password, name }: AuthCredentials)=> {
    return getAppWrite().account.create('unique()', email, password, name);
  },
};

export default authApi;
