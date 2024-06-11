import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { IDISLIKE_RESPONSE } from "src/app/interfaces/dislike.interface";

export const GET_DISLIKE_START = createAction("[Dislike] GET_DISLIKE_START");
export const GET_DISLIKE_SUCCESS = createAction("[Dislike] GET_DISLIKE_SUCCESS",props<{ data: IDISLIKE_RESPONSE }>());
export const GET_DISLIKE_FAILED = createAction("[Dislike] GET_DISLIKE_FAILED",props<{ error: HttpErrorResponse }>());
