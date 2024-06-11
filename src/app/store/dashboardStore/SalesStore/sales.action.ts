import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { ISalesResponse } from "src/app/interfaces/dashboard.interface";

export const GET_SALES_START = createAction(
  "[Sales] GET_SALES_START"
);
export const GET_SALES_SUCCESS = createAction(
  "[Sales] GET_SALES_SUCCESS",
  props<{ data: ISalesResponse }>()
);
export const GET_SALES_FAILED = createAction(
  "[Sales] GET_SALES_FAILED",
  props<{ error: HttpErrorResponse }>()
);
