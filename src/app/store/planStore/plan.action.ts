import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { IGENERATE_PLAN_REQUEST, IGENERATE_PLAN_RESPONSE, IPLAN_RESPONSE } from "src/app/interfaces/plan.interface";

export const GET_PLAN_START = createAction("[Plan] GET_PLAN_START",props<{ PlanCategoryID: number }>());
export const GET_PLAN_SUCCESS = createAction("[Plan] GET_PLAN_SUCCESS",props<{ data: IPLAN_RESPONSE }>());
export const GET_PLAN_FAILED = createAction("[Plan] GET_PLAN_FAILED",props<{ error: HttpErrorResponse }>());


export const GENERATE_PLAN_START = createAction("[Generate Plan] GENERATE_PLAN_START",props<{ data: IGENERATE_PLAN_REQUEST }>());
export const GENERATE_PLAN_SUCCESS = createAction("[Generate Plan] GENERATE_PLAN_SUCCESS",props<{ data: IGENERATE_PLAN_RESPONSE }>());
export const GENERATE_PLAN_FAILED = createAction("[Generate Plan] GENERATE_PLAN_FAILED",props<{ error: HttpErrorResponse }>());