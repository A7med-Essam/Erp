import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { IPLAN_DAYS_RESPONSE } from "src/app/interfaces/plan-days.interface";

export const GET_PLAN_DAYS_START = createAction("[Plan Days] GET_PLAN_DAYS_START",props<{ PlanID: number }>());
export const GET_PLAN_DAYS_SUCCESS = createAction("[Plan Days] GET_PLAN_DAYS_SUCCESS",props<{ data: IPLAN_DAYS_RESPONSE }>());
export const GET_PLAN_DAYS_FAILED = createAction("[Plan Days] GET_PLAN_DAYS_FAILED",props<{ error: HttpErrorResponse }>());
