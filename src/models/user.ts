export interface UserPrefsModel {
  firstName?: string;
  lastName?: string;
}

export interface UserModel {
  $id: string;
  email: string;
  emailVerification: boolean;
  name: string;
  passwordUpdate: number;
  prefs: UserPrefsModel;
  registration: number;
  status: boolean;
}
