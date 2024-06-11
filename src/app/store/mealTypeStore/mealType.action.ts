import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { IMEAL_TYPE_RESPONSE } from "src/app/interfaces/meal-type.interface";

export const GET_MEAL_TYPE_START = createAction("[Meal Types] GET_MEAL_TYPE_START",props<{ PlanID: number }>());
export const GET_MEAL_TYPE_SUCCESS = createAction("[Meal Types] GET_MEAL_TYPE_SUCCESS",props<{ data: IMEAL_TYPE_RESPONSE }>());
export const GET_MEAL_TYPE_FAILED = createAction("[Meal Types] GET_MEAL_TYPE_FAILED",props<{ error: HttpErrorResponse }>());
