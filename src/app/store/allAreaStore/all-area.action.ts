import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { IAreaResponse } from "src/app/interfaces/location.interface";

export const GET_ALL_AREA_START = createAction("[All Area] GET_ALL_AREA_START");
export const GET_ALL_AREA_SUCCESS = createAction(
  "[All Area] GET_ALL_AREA_SUCCESS",
  props<{ data: IAreaResponse }>()
);
export const GET_ALL_AREA_FAILED = createAction(
  "[All Area] GET_ALL_AREA_FAILED",
  props<{ error: HttpErrorResponse }>()
);
