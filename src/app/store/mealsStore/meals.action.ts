import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import {
  IGetMealsAction,
  IGetMealsResponse,
} from "src/app/interfaces/meals.interface";

export const GET_MEALS_START = createAction(
  "[Meals] GET_MEALS_START",
  props<{ data: IGetMealsAction }>()
);
export const GET_MEALS_SUCCESS = createAction(
  "[Meals] GET_MEALS_SUCCESS",
  props<{ data: IGetMealsResponse }>()
);
export const GET_MEALS_FAILED = createAction(
  "[Meals] GET_MEALS_FAILED",
  props<{ error: HttpErrorResponse }>()
);
