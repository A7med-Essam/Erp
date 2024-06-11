import { IRequestStatus } from "../store/appStore";

// LOGIN
export interface ILoginResponse extends IRequestStatus {
  data: ILogin
}

export interface ILogin {
  token:                  string;
  refreshToken:           string;
  userImageURL:           string;
  refreshTokenExpiryTime: Date;
}

export interface ISignInData {
  email: string;
  password: string;
}

export interface IRefreshTokenRequest {
  token: string;
  refreshToken: string;
}

export interface IUserData {
  nameIdentifier: string;
  emailAddress: string;
  name: string;
  surname: string;
  mobilePhone: string;
  roles: string[];
  permissions: string[];
  expiration: number;
}

export interface IResetPasswordRequest {
  email: string;
  password: string;
  confirmPassword: string;
  token: string;
}