import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { ILoginResponse, ISignInData } from "src/app/interfaces/auth.interface";

export const LOGIN_START = createAction('[Auth Login] LOGIN_START', props<{data:ISignInData}>())
export const LOGIN_SUCCESS = createAction('[Auth Login] LOGIN_SUCCESS', props<{data:ILoginResponse}>())
export const LOGIN_FAILED = createAction('[Auth Login] LOGIN_FAILED', props<{error:HttpErrorResponse}>())

export const LOGOUT_START = createAction('[Auth Logout] LOGOUT_START')