import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { IPLAN_CATEGORY_RESPONSE } from "src/app/interfaces/plan-category.interface";

export const GET_PLAN_CATEGORY_START = createAction("[Plan Category] GET_PLAN_CATEGORY_START");
export const GET_PLAN_CATEGORY_SUCCESS = createAction("[Plan Category] GET_PLAN_CATEGORY_SUCCESS",props<{ data: IPLAN_CATEGORY_RESPONSE }>());
export const GET_PLAN_CATEGORY_FAILED = createAction("[Plan Category] GET_PLAN_CATEGORY_FAILED",props<{ error: HttpErrorResponse }>());
