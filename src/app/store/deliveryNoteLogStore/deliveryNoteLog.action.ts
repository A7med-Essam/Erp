import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { IDeliveryNoteLogResponse } from "src/app/interfaces/log.interface";

export const GET_DELIVERY_NOTE_LOG_START = createAction(
  "[Delivery Note Log] GET_DELIVERY_NOTE_LOG_START",
  props<{ SID: number }>()
);
export const GET_DELIVERY_NOTE_LOG_SUCCESS = createAction(
  "[Delivery Note Log] GET_DELIVERY_NOTE_LOG_SUCCESS",
  props<{ data: IDeliveryNoteLogResponse }>()
);
export const GET_DELIVERY_NOTE_LOG_FAILED = createAction(
  "[Delivery Note Log] GET_DELIVERY_NOTE_LOG_FAILED",
  props<{ error: HttpErrorResponse }>()
);
