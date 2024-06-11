import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { CustomerInfoResponse } from "src/app/interfaces/customer.interface";

export const GET_CUSTOMER_ADDRESS_START = createAction(
  "[Get Customer Address] GET_CUSTOMER_ADDRESS_START",
  props<{ CustomerID: number }>()
);
export const GET_CUSTOMER_ADDRESS_SUCCESS = createAction(
  "[Get Customer Address] GET_CUSTOMER_ADDRESS_SUCCESS",
  props<{ data: CustomerInfoResponse }>()
);
export const GET_CUSTOMER_ADDRESS_FAILED = createAction(
  "[Get Customer Address] GET_CUSTOMER_ADDRESS_FAILED",
  props<{ error: HttpErrorResponse }>()
);
