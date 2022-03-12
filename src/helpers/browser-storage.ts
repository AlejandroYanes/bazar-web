import { UserInfo } from 'models/user';

const storage = window.sessionStorage;

export function storeAuthToken(token: string) {
  storage.setItem('token', token);
}

export function getAuthToken() {
  return storage.getItem('token');
}

export function storeUserInfo(userInfo: UserInfo) {
  storage.setItem('userInfo', JSON.stringify(userInfo));
}

export function getUserInfo(): UserInfo {
  return JSON.parse(storage.getItem('userInfo'));
}

export function clearStorage() {
  storage.clear()
}
