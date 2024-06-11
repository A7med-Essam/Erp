import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { IRoleResponse } from "src/app/interfaces/identity.interface";

export const GET_ROLE_START = createAction("[Role] GET_ROLE_START");
export const GET_ROLE_SUCCESS = createAction(
  "[Role] GET_ROLE_SUCCESS",
  props<{ data: IRoleResponse }>()
);
export const GET_ROLE_FAILED = createAction(
  "[Role] GET_ROLE_FAILED",
  props<{ error: HttpErrorResponse }>()
);
