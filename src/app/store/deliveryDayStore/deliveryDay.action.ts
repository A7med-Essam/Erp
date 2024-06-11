import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { IDELIVERY_DAY_RESPONSE } from "src/app/interfaces/delivery-day.interface";

export const GET_DELIVERY_DAY_START = createAction("[Delivery Days] GET_DELIVERY_DAY_START");
export const GET_DELIVERY_DAY_SUCCESS = createAction("[Delivery Days] GET_DELIVERY_DAY_SUCCESS",props<{ data: IDELIVERY_DAY_RESPONSE }>());
export const GET_DELIVERY_DAY_FAILED = createAction("[Delivery Days] GET_DELIVERY_DAY_FAILED",props<{ error: HttpErrorResponse }>());
