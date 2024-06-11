import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import {
  IOperationsRequest,
  IOperationsResponse,
} from "src/app/interfaces/operations.interface";

export const GET_OPERATIONS_START = createAction(
  "[Operations] GET_OPERATIONS_START",
  props<{ data: IOperationsRequest }>()
);

export const GET_OPERATIONS_SUCCESS = createAction(
  "[Operations] GET_OPERATIONS_SUCCESS",
  props<{ data: IOperationsResponse }>()
);
export const GET_OPERATIONS_FAILED = createAction(
  "[Operations] GET_OPERATIONS_FAILED",
  props<{ error: HttpErrorResponse }>()
);
