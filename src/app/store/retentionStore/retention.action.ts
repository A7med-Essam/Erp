import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import {
  ICustomersRetentionRequest,
  ICustomersRetentionResponse,
} from "src/app/interfaces/customer.interface";

export const GET_RETENTION_START = createAction(
  "[Customers Retention] GET_RETENTION_START",
  props<{ data: ICustomersRetentionRequest }>()
);

export const GET_RETENTION_SUCCESS = createAction(
  "[Customers Retention] GET_RETENTION_SUCCESS",
  props<{ data: ICustomersRetentionResponse }>()
);
export const GET_RETENTION_FAILED = createAction(
  "[Customers Retention] GET_RETENTION_FAILED",
  props<{ error: HttpErrorResponse }>()
);
