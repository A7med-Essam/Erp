import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { ILastPaymentResponse } from "src/app/interfaces/dashboard.interface";

export const GET_LAST_PAYMENT_START = createAction(
  "[Last Payment] GET_LAST_PAYMENT_START"
);
export const GET_LAST_PAYMENT_SUCCESS = createAction(
  "[Last Payment] GET_LAST_PAYMENT_SUCCESS",
  props<{ data: ILastPaymentResponse }>()
);
export const GET_LAST_PAYMENT_FAILED = createAction(
  "[Last Payment] GET_LAST_PAYMENT_FAILED",
  props<{ error: HttpErrorResponse }>()
);
