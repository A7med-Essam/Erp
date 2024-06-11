import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { IDislikeItemResponse } from "src/app/interfaces/dislike.interface";

export const GET_DISLIKE_ITEM_START = createAction(
  "[Dislike Item] GET_DISLIKE_ITEM_START"
);
export const GET_DISLIKE_ITEM_SUCCESS = createAction(
  "[Dislike Item] GET_DISLIKE_ITEM_SUCCESS",
  props<{ data: IDislikeItemResponse }>()
);
export const GET_DISLIKE_ITEM_FAILED = createAction(
  "[Dislike Item] GET_DISLIKE_ITEM_FAILED",
  props<{ error: HttpErrorResponse }>()
);
