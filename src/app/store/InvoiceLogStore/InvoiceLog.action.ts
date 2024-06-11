import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { InvoiceLogResponse } from "src/app/interfaces/log.interface";

export const GET_INVOICE_LOG_START = createAction(
  "[Invoice Log] GET_INVOICE_LOG_START",
  props<{ SID: number }>()
);
export const GET_INVOICE_LOG_SUCCESS = createAction(
  "[Invoice Log] GET_INVOICE_LOG_SUCCESS",
  props<{ data: InvoiceLogResponse }>()
);
export const GET_INVOICE_LOG_FAILED = createAction(
  "[Invoice Log] GET_INVOICE_LOG_FAILED",
  props<{ error: HttpErrorResponse }>()
);
