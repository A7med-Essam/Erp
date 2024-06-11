import { Injectable } from "@angular/core";
import { ILoginResponse, IUserData } from "../interfaces/auth.interface";
import { LocalService } from "./local.service";
import * as jwt from "jwt-decode";

@Injectable({
  providedIn: "root",
})
export class GuardService {
  constructor(private _LocalService: LocalService) {}

  getUser(): ILoginResponse {
    return this._LocalService.getJsonValue("ERP_CREDENTIALS");
  }

  getPermissionStatus(permission: string): boolean {
    if (this.getDecodedAccessToken()) {
      let userPermissions: string[] =
        this.getDecodedAccessToken()?.permissions || [];
      if (!Array.isArray(userPermissions)) {
        userPermissions = [userPermissions];
      }
      return userPermissions
        .map((p) => p.toLowerCase())
        .includes(permission.toLowerCase());
    }
    return false;
  }

  isSuperAdmin(): boolean {
    if (this.getDecodedAccessToken()) {
      let roles: string[] = this.getDecodedAccessToken()?.roles || [];
      if (!Array.isArray(roles)) {
        roles = [roles];
      }
      return roles?.some((e) => e.toLowerCase().includes("admin"));
    }
    return false;
  }

  public getDecodedAccessToken(): IUserData | null {
    try {
      return this.convertToUserData(jwt.jwtDecode(this.getUser()?.data?.token));
    } catch (Error) {
      return null;
    }
  }

  convertToUserData(originalData: any): IUserData {
    const {
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier":
        nameIdentifier,
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress":
        emailAddress,
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": name,
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname": surname,
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone":
        mobilePhone,
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": roles,
      Permission: permissions,
      exp: expiration,
    } = originalData;

    return {
      nameIdentifier,
      emailAddress,
      name,
      surname,
      mobilePhone,
      roles,
      permissions,
      expiration,
    };
  }
}
