import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import {
  IMealItemRequest,
  IMealItemResponse,
} from "src/app/interfaces/meals.interface";

export const GET_MEAL_ITEM_START = createAction(
  "[Get Meal Item] GET_MEAL_ITEM_START",
  props<{ data: IMealItemRequest }>()
);
export const GET_MEAL_ITEM_SUCCESS = createAction(
  "[Get Meal Item] GET_MEAL_ITEM_SUCCESS",
  props<{ data: IMealItemResponse }>()
);
export const GET_MEAL_ITEM_FAILED = createAction(
  "[Get Meal Item] GET_MEAL_ITEM_FAILED",
  props<{ error: HttpErrorResponse }>()
);
