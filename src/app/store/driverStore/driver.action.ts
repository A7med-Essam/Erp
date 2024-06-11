import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { IDriverResponse } from "src/app/interfaces/location.interface";

export const GET_DRIVER_START = createAction("[Driver] GET_DRIVER_START");
export const GET_DRIVER_SUCCESS = createAction(
  "[Driver] GET_DRIVER_SUCCESS",
  props<{ data: IDriverResponse }>()
);
export const GET_DRIVER_FAILED = createAction(
  "[Driver] GET_DRIVER_FAILED",
  props<{ error: HttpErrorResponse }>()
);
