import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { IBRANCH_RESPONSE } from "src/app/interfaces/branch.interface";

export const GET_BRANCH_START = createAction("[Branch] GET_BRANCH_START");
export const GET_BRANCH_SUCCESS = createAction("[Branch] GET_BRANCH_SUCCESS",props<{ data: IBRANCH_RESPONSE }>());
export const GET_BRANCH_FAILED = createAction("[Branch] GET_BRANCH_FAILED",props<{ error: HttpErrorResponse }>());
