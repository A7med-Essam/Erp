import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { IGetInvoiceRequest, IGetInvoiceResponse } from "src/app/interfaces/invoice.interface";

export const GET_INVOICE_START = createAction(
  "[Invoice] GET_INVOICE_START",
  props<{ data: IGetInvoiceRequest }>()
);
export const GET_INVOICE_SUCCESS = createAction(
  "[Invoice] GET_INVOICE_SUCCESS",
  props<{ data: IGetInvoiceResponse }>()
);
export const GET_INVOICE_FAILED = createAction(
  "[Invoice] GET_INVOICE_FAILED",
  props<{ error: HttpErrorResponse }>()
);
