import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { IActivityResponse } from "src/app/interfaces/dashboard.interface";

export const GET_ACTIVITY_START = createAction("[Last Activity] GET_ACTIVITY_START");
export const GET_ACTIVITY_SUCCESS = createAction("[Last Activity] GET_ACTIVITY_SUCCESS",props<{ data: IActivityResponse }>());
export const GET_ACTIVITY_FAILED = createAction("[Last Activity] GET_ACTIVITY_FAILED",props<{ error: HttpErrorResponse }>());
