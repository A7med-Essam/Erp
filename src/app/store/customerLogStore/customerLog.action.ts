import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { ICustomerLogResponse } from "src/app/interfaces/log.interface";

export const GET_CUSTOMER_LOG_START = createAction(
  "[Customer Log] GET_CUSTOMER_LOG_START",
  props<{ SID: number }>()
);
export const GET_CUSTOMER_LOG_SUCCESS = createAction(
  "[Customer Log] GET_CUSTOMER_LOG_SUCCESS",
  props<{ data: ICustomerLogResponse }>()
);
export const GET_CUSTOMER_LOG_FAILED = createAction(
  "[Customer Log] GET_CUSTOMER_LOG_FAILED",
  props<{ error: HttpErrorResponse }>()
);
