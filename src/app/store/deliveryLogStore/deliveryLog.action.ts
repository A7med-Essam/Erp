import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { IDeliveryLogResponse } from "src/app/interfaces/log.interface";

export const GET_DELIVERY_LOG_START = createAction(
  "[Delivery Log] GET_DELIVERY_LOG_START",
  props<{ SID: number }>()
);
export const GET_DELIVERY_LOG_SUCCESS = createAction(
  "[Delivery Log] GET_DELIVERY_LOG_SUCCESS",
  props<{ data: IDeliveryLogResponse }>()
);
export const GET_DELIVERY_LOG_FAILED = createAction(
  "[Delivery Log] GET_DELIVERY_LOG_FAILED",
  props<{ error: HttpErrorResponse }>()
);
