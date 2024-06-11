import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import {
  IPermissionResponse,
} from "src/app/interfaces/identity.interface";

export const GET_PERMISSION_START = createAction(
  "[Permission] GET_PERMISSION_START"
);
export const GET_PERMISSION_SUCCESS = createAction(
  "[Permission] GET_PERMISSION_SUCCESS",
  props<{ data: IPermissionResponse }>()
);
export const GET_PERMISSION_FAILED = createAction(
  "[Permission] GET_PERMISSION_FAILED",
  props<{ error: HttpErrorResponse }>()
);
