import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { IExpiredResponse } from "src/app/interfaces/dashboard.interface";

export const GET_EXPIRED_START = createAction("[Expired] GET_EXPIRED_START");
export const GET_EXPIRED_SUCCESS = createAction(
  "[Expired] GET_EXPIRED_SUCCESS",
  props<{ data: IExpiredResponse }>()
);
export const GET_EXPIRED_FAILED = createAction(
  "[Expired] GET_EXPIRED_FAILED",
  props<{ error: HttpErrorResponse }>()
);
