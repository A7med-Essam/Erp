import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { IFullPlanDaysResponse } from "src/app/interfaces/allPlan.interface";

export const GET_ALL_PLAN_DAYS_START = createAction(
  "[All Plan Days] GET_ALL_PLAN_DAYS_START"
);
export const GET_ALL_PLAN_DAYS_SUCCESS = createAction(
  "[All Plan Days] GET_ALL_PLAN_DAYS_SUCCESS",
  props<{ data: IFullPlanDaysResponse }>()
);
export const GET_ALL_PLAN_DAYS_FAILED = createAction(
  "[All Plan Days] GET_ALL_PLAN_DAYS_FAILED",
  props<{ error: HttpErrorResponse }>()
);
