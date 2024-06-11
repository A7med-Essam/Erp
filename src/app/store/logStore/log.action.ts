import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import {
  IAllLogsRequest,
  ILogsResponse,
} from "src/app/interfaces/log.interface";

export const GET_LOGS_START = createAction(
  "[All Logs] GET_LOGS_START",
  props<{ data: IAllLogsRequest }>()
);

export const GET_LOGS_SUCCESS = createAction(
  "[All Logs] GET_LOGS_SUCCESS",
  props<{ data: ILogsResponse }>()
);
export const GET_LOGS_FAILED = createAction(
  "[All Logs] GET_LOGS_FAILED",
  props<{ error: HttpErrorResponse }>()
);
