import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { IFullPlanResponse } from "src/app/interfaces/allPlan.interface";

export const GET_ALL_PLAN_START = createAction("[All Plan] GET_ALL_PLAN_START");
export const GET_ALL_PLAN_SUCCESS = createAction(
  "[All Plan] GET_ALL_PLAN_SUCCESS",
  props<{ data: IFullPlanResponse }>()
);
export const GET_ALL_PLAN_FAILED = createAction(
  "[All Plan] GET_ALL_PLAN_FAILED",
  props<{ error: HttpErrorResponse }>()
);
