export interface UserModel {
  $id: string;
  email: string;
  emailVerification: boolean;
  name: string;
  passwordUpdate: number;
  prefs: Record<string, string | number>;
  registration: number;
  status: boolean;
}
