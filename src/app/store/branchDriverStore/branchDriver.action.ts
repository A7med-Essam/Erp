import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";

export const GET_BRANCH_DRIVER_START = createAction(
  "[Branch Driver] GET_BRANCH_DRIVER_START"
);
export const GET_BRANCH_DRIVER_SUCCESS = createAction(
  "[Branch Driver] GET_BRANCH_DRIVER_SUCCESS",
  props<{ data: any }>()
);
export const GET_BRANCH_DRIVER_FAILED = createAction(
  "[Branch Driver] GET_BRANCH_DRIVER_FAILED",
  props<{ error: HttpErrorResponse }>()
);
