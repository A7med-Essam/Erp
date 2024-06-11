import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { IGovernorateResponse } from "src/app/interfaces/location.interface";

export const GET_GOVERNORATE_START = createAction(
  "[Governorate] GET_GOVERNORATE_START"
);
export const GET_GOVERNORATE_SUCCESS = createAction(
  "[Governorate] GET_GOVERNORATE_SUCCESS",
  props<{ data: IGovernorateResponse }>()
);
export const GET_GOVERNORATE_FAILED = createAction(
  "[Governorate] GET_GOVERNORATE_FAILED",
  props<{ error: HttpErrorResponse }>()
);
