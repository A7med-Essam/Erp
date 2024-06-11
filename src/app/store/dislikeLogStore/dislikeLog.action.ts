import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { IDislikeLogResponse } from "src/app/interfaces/log.interface";

export const GET_DISLIKE_LOG_START = createAction(
  "[Dislike Log] GET_DISLIKE_LOG_START",
  props<{ SID: number }>()
);
export const GET_DISLIKE_LOG_SUCCESS = createAction(
  "[Dislike Log] GET_DISLIKE_LOG_SUCCESS",
  props<{ data: IDislikeLogResponse }>()
);
export const GET_DISLIKE_LOG_FAILED = createAction(
  "[Dislike Log] GET_DISLIKE_LOG_FAILED",
  props<{ error: HttpErrorResponse }>()
);
