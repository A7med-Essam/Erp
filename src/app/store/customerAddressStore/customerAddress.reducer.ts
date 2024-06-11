import { createReducer, on } from "@ngrx/store";
import { ICustomerAddressDetails } from "src/app/interfaces/customer.interface";
import { IHttpResponse, IRequestStatus } from "../appStore";
import * as fromActions from "./customerAddress.action";

export interface IState extends IHttpResponse, IRequestStatus {
  data: ICustomerAddressDetails[] | null;
}

const initalValue: IState = {
  error: null,
  loading: true,
  data: null,
  messages: [],
  succeeded: false,
};

export const Reducer = createReducer(
  initalValue,
  on(fromActions.GET_CUSTOMER_ADDRESS_START, (state) => ({
    ...state,
    loading: true,
    error: null,
    succeeded: false,
  })),
  on(
    fromActions.GET_CUSTOMER_ADDRESS_SUCCESS,
    (state, action) => ({
      ...state,
      error: null,
      loading: false,
      data: action.data.data,
      succeeded: action.data.succeeded,
      messages: action.data.messages,
    })
  ),
  on(
    fromActions.GET_CUSTOMER_ADDRESS_FAILED,
    (state, action) => ({
      ...state,
      error: action.error,
      loading: false,
      messages: [action.error.message],
      succeeded: false,
    })
  )
);
