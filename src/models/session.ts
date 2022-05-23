export interface SessionModel {
  $id: string;
  userId: string;
  provider: string;
  providerUid: string;
  providerAccessToken: string;
  providerAccessTokenExpiry: number;
  providerRefreshToken: string;
}
