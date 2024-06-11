import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import {
  IGetPaymentTypeResponse,
  IPaymentTypeRequest,
} from "src/app/interfaces/subscription.interface";

export const GET_PAYMENT_TYPE_START = createAction(
  "[Payment Type] GET_PAYMENT_TYPE_START",
  props<{ data: IPaymentTypeRequest }>()
);
export const GET_PAYMENT_TYPE_SUCCESS = createAction(
  "[Payment Type] GET_PAYMENT_TYPE_SUCCESS",
  props<{ data: IGetPaymentTypeResponse }>()
);
export const GET_PAYMENT_TYPE_FAILED = createAction(
  "[Payment Type] GET_PAYMENT_TYPE_FAILED",
  props<{ error: HttpErrorResponse }>()
);
