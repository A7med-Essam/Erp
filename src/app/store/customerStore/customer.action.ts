import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import {
  IAddEditCustomer,
  IAddEditCustomerResponse,
  ICustomerRequest,
  IGetAllCustomersResponse,
} from "src/app/interfaces/customer.interface";
import { IRequestStatus } from "../appStore";

export const GET_CUSTOMER_START = createAction(
  "[Get Customer] GET_CUSTOMER_START",
  props<{ data: ICustomerRequest }>()
);
export const GET_CUSTOMER_SUCCESS = createAction(
  "[Get Customer] GET_CUSTOMER_SUCCESS",
  props<{ data: IGetAllCustomersResponse }>()
);
export const GET_CUSTOMER_FAILED = createAction(
  "[Get Customer] GET_CUSTOMER_FAILED",
  props<{ error: HttpErrorResponse }>()
);

export const DELETE_CUSTOMER_START = createAction(
  "[Delete Customer] DELETE_CUSTOMER_START",
  props<{ customerID: number }>()
);
export const DELETE_CUSTOMER_SUCCESS = createAction(
  "[Delete Customer] DELETE_CUSTOMER_SUCCESS",
  props<{ data: IRequestStatus }>()
);
export const DELETE_CUSTOMER_FAILED = createAction(
  "[Delete Customer] DELETE_CUSTOMER_FAILED",
  props<{ error: HttpErrorResponse }>()
);

export const CREATE_CUSTOMER_START = createAction(
  "[Create Customer] CREATE_CUSTOMER_START",
  props<{ data: IAddEditCustomer }>()
);
export const CREATE_CUSTOMER_SUCCESS = createAction(
  "[Create Customer] CREATE_CUSTOMER_SUCCESS",
  props<{ data: IAddEditCustomerResponse }>()
);
export const CREATE_CUSTOMER_FAILED = createAction(
  "[Create Customer] CREATE_CUSTOMER_FAILED",
  props<{ error: HttpErrorResponse }>()
);
