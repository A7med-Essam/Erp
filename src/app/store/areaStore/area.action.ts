import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { IAreaResponse } from "src/app/interfaces/area.interface";

export const GET_AREA_START = createAction("[Area] GET_AREA_START");
export const GET_AREA_SUCCESS = createAction(
  "[Area] GET_AREA_SUCCESS",
  props<{ data: IAreaResponse }>()
);
export const GET_AREA_FAILED = createAction(
  "[Area] GET_AREA_FAILED",
  props<{ error: HttpErrorResponse }>()
);
