import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { IGetCustomersCategoryResponse } from "src/app/interfaces/customer.interface";

export const GET_CUSTOMER_CATEGORY_START = createAction(
  "[Get Customer Category] GET_CUSTOMER_CATEGORY_START"
);
export const GET_CUSTOMER_CATEGORY_SUCCESS = createAction(
  "[Get Customer Category] GET_CUSTOMER_CATEGORY_SUCCESS",
  props<{ data: IGetCustomersCategoryResponse }>()
);
export const GET_CUSTOMER_CATEGORY_FAILED = createAction(
  "[Get Customer Category] GET_CUSTOMER_CATEGORY_FAILED",
  props<{ error: HttpErrorResponse }>()
);
