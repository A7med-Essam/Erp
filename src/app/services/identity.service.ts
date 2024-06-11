import { Injectable } from "@angular/core";
import { ApiConfigService } from "../core/api-config.service";
import { Observable } from "rxjs";
import { HttpParams } from "@angular/common/http";
import {
  IAddUserRequest,
  IChangePasswordRequest,
  IPermission,
  IPermissionResponse,
  IRole,
  IRolePermissionResponse,
  IRoleResponse,
  IUpdateProfileRequest,
  IUpdateRoleRequest,
  IUpdateUserRequest,
  IUserResponse,
  IUserRoleRequest,
  IUserRolesResponse,
  IUserStatusRequest,
} from "../interfaces/identity.interface";
import { IRequestStatus } from "../store/appStore";

@Injectable({
  providedIn: "root",
})
export class IdentityService {
  constructor(private _ApiConfigService: ApiConfigService) {}

  // ========================== Users ==========================
  getUsers(): Observable<IUserResponse> {
    let params = new HttpParams().set("api-version", 1);
    return this._ApiConfigService.getReq("identity/user", params);
  }

  updateUser(request: IUpdateUserRequest): Observable<IRequestStatus> {
    let params = new HttpParams().set("api-version", 1);
    return this._ApiConfigService.postReq(
      "identity/user/edit-user",
      request,
      params
    );
  }

  getUserRoles(id: string): Observable<IUserRolesResponse> {
    let params = new HttpParams().set("api-version", 1);
    return this._ApiConfigService.getReq("identity/user/roles/" + id, params);
  }

  addUser(request: IAddUserRequest): Observable<IRequestStatus> {
    let params = new HttpParams().set("api-version", 1);
    return this._ApiConfigService.postReq("identity/user", request, params);
  }

  updateUserRoles(request: IUserRoleRequest): Observable<IRequestStatus> {
    let params = new HttpParams().set("api-version", 1);
    return this._ApiConfigService.putReq(
      "identity/user/roles/" + request.userId,
      request,
      params
    );
  }

  changeUserStatus(request: IUserStatusRequest): Observable<IRequestStatus> {
    let params = new HttpParams().set("api-version", 1);
    return this._ApiConfigService.postReq(
      "identity/user/toggle-status",
      request,
      params
    );
  }
  // ========================== Roles ==========================
  getRoles(): Observable<IRoleResponse> {
    let params = new HttpParams().set("api-version", 1);
    return this._ApiConfigService.getReq("identity/role", params);
  }
  deleteRole(id: string): Observable<IRequestStatus> {
    let params = new HttpParams().set("api-version", 1);
    return this._ApiConfigService.deleteReq(`identity/role/${id}`, params);
  }
  getRolePermission(RoleId: string): Observable<IRolePermissionResponse> {
    let params = new HttpParams().set("api-version", 1);
    return this._ApiConfigService.getReq(
      "identity/role/permissions/" + RoleId,
      params
    );
  }
  updateRolePermission(
    request: IUpdateRoleRequest
  ): Observable<IRequestStatus> {
    let params = new HttpParams().set("api-version", 1);
    return this._ApiConfigService.putReq(
      "identity/role/permissions/update",
      request,
      params
    );
  }
  addOrUpdateRole(request: IRole): Observable<IRequestStatus> {
    let params = new HttpParams().set("api-version", 1);
    return this._ApiConfigService.postReq("identity/role", request, params);
  }

  // ========================== Permissions ==========================
  getPermissions(): Observable<IPermissionResponse> {
    let params = new HttpParams().set("api-version", 1);
    return this._ApiConfigService.getReq("identity/roleClaim", params);
  }

  addOrUpdatePermission(request: IPermission): Observable<IRequestStatus> {
    let params = new HttpParams().set("api-version", 1);
    return this._ApiConfigService.postReq(
      "identity/roleClaim",
      request,
      params
    );
  }

  deletePermission(id: string): Observable<IRequestStatus> {
    let params = new HttpParams().set("id", id).set("api-version", 1);
    return this._ApiConfigService.deleteReq("identity/roleClaim", params);
  }

  // ========================== Profile ==========================
  updateProfile(request: IUpdateProfileRequest): Observable<IRequestStatus> {
    let params = new HttpParams().set("api-version", 1);
    return this._ApiConfigService.putReq(
      "identity/account/UpdateProfile",
      request,
      params
    );
  }

  ChangePassword(request: IChangePasswordRequest): Observable<IRequestStatus> {
    let params = new HttpParams().set("api-version", 1);
    return this._ApiConfigService.putReq(
      "identity/account/ChangePassword",
      request,
      params
    );
  }
}
