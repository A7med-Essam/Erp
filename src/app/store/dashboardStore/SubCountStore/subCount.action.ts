import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { ISubCountResponse } from "src/app/interfaces/dashboard.interface";

export const GET_SUBSCRIPTION_COUNT_START = createAction(
  "[SubCount] GET_SUBSCRIPTION_COUNT_START"
);
export const GET_SUBSCRIPTION_COUNT_SUCCESS = createAction(
  "[SubCount] GET_SUBSCRIPTION_COUNT_SUCCESS",
  props<{ data: ISubCountResponse }>()
);
export const GET_SUBSCRIPTION_COUNT_FAILED = createAction(
  "[SubCount] GET_SUBSCRIPTION_COUNT_FAILED",
  props<{ error: HttpErrorResponse }>()
);
