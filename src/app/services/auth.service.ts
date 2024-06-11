import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiConfigService } from "../core/api-config.service";
import {
  ILoginResponse,
  IRefreshTokenRequest,
  IResetPasswordRequest,
  ISignInData,
} from "../interfaces/auth.interface";
import { HttpParams } from "@angular/common/http";
import { IRequestStatus } from "../store/appStore";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private _ApiConfigService: ApiConfigService) {}
  private redirectUrl: string | null = null;

  signIn(signInData: ISignInData): Observable<ILoginResponse> {
    let params = new HttpParams().set("api-version", 1);
    return this._ApiConfigService.postReq("identity/token", signInData, params);
  }

  refreshToken(request: IRefreshTokenRequest): Observable<ILoginResponse> {
    let params = new HttpParams().set("api-version", 1);
    return this._ApiConfigService.postReq(
      "identity/token/refresh",
      request,
      params
    );
  }

  forgotPassword(request: { email: string }): Observable<IRequestStatus> {
    let params = new HttpParams().set("api-version", 1);
    return this._ApiConfigService.postReq(
      "identity/user/forgot-password",
      request,
      params
    );
  }

  resetPassword(request: IResetPasswordRequest): Observable<IRequestStatus> {
    let params = new HttpParams().set("api-version", 1);
    return this._ApiConfigService.postReq(
      "identity/user/reset-password",
      request,
      params
    );
  }

  setRedirectUrl(url: string | null): void {
    this.redirectUrl = url;
  }

  getRedirectUrl(): string | null {
    return this.redirectUrl;
  }
}
