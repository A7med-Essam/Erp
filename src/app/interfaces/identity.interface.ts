import { IRequestStatus } from "../store/appStore";
// =================================== USER ====================================
export interface IUserResponse extends IRequestStatus {
  data: IUser[];
}

export interface IUser {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  emailConfirmed: boolean;
  phoneNumber: string;
  profilePictureDataUrl: string;
  jobTitle: string;
}

export interface IUserStatusRequest {
  userId: string;
  activateUser: boolean;
}

export interface IAddUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  activateUser: boolean;
  autoConfirmEmail: boolean;
  jobTitle: string;
  systemId: number;
}

export interface IUpdateUserRequest {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  phoneNumber: string;
  activateUser: boolean;
  autoConfirmEmail: boolean;
  systemId: number;
  jobTitle: string;
}

// ================================== ROLE ====================================
export interface IRoleResponse extends IRequestStatus {
  data: IRole[];
}

export interface IRole {
  id: string;
  name: string;
  description: string;
}

export interface IUpdateRoleRequest {
  roleId: string;
  roleClaims: IPermission[];
}

export interface IRolePermissionResponse extends IRequestStatus {
  data: IRolePermission;
}

export interface IRolePermission {
  roleId: string;
  roleName: string;
  roleClaims: IPermission[];
}

// ================================= USER ROLES =================================

export interface IUserRolesResponse extends IRequestStatus {
  data: { userRoles: IUserRole[] };
}

export interface IUserRole {
  roleName: string;
  roleDescription: string;
  selected: boolean;
}

export interface IUserRoleRequest {
  userId: string;
  userRoles: IUserRole[];
}

// ================================= PERMISSION =================================

export interface IPermissionResponse extends IRequestStatus {
  data: IPermission[];
}

export interface IPermission {
  id: number;
  roleId: string;
  claimType: string;
  claimValue: string;
  description: string;
  group: string;
  selected: boolean;
}

// ================================== PROFILE ====================================
export interface IUpdateProfileRequest {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

export interface IChangePasswordRequest {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
}
