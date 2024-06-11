import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { IFullMealTypeResponse } from "src/app/interfaces/allPlan.interface";

export const GET_ALL_MEAL_TYPES_START = createAction(
  "[All Meal Types] GET_ALL_MEAL_TYPES_START"
);
export const GET_ALL_MEAL_TYPES_SUCCESS = createAction(
  "[All Meal Types] GET_ALL_MEAL_TYPES_SUCCESS",
  props<{ data: IFullMealTypeResponse }>()
);
export const GET_ALL_MEAL_TYPES_FAILED = createAction(
  "[All Meal Types] GET_ALL_MEAL_TYPES_FAILED",
  props<{ error: HttpErrorResponse }>()
);
