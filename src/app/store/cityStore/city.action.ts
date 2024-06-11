import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { ICityResponse } from "src/app/interfaces/location.interface";

export const GET_CITY_START = createAction("[City] GET_CITY_START");
export const GET_CITY_SUCCESS = createAction(
  "[City] GET_CITY_SUCCESS",
  props<{ data: ICityResponse }>()
);
export const GET_CITY_FAILED = createAction(
  "[City] GET_CITY_FAILED",
  props<{ error: HttpErrorResponse }>()
);
