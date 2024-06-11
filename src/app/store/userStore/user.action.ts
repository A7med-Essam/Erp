import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { IUserResponse } from "src/app/interfaces/identity.interface";

export const GET_USER_START = createAction("[User] GET_USER_START");
export const GET_USER_SUCCESS = createAction(
  "[User] GET_USER_SUCCESS",
  props<{ data: IUserResponse }>()
);
export const GET_USER_FAILED = createAction(
  "[User] GET_USER_FAILED",
  props<{ error: HttpErrorResponse }>()
);
