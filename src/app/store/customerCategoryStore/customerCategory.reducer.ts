import { createReducer, on } from "@ngrx/store";
import { ICustomersCategory } from "src/app/interfaces/customer.interface";
import { IHttpResponse, IRequestStatus } from "../appStore";
import * as fromActions from "./customerCategory.action";

export interface IState extends IHttpResponse, IRequestStatus {
  data: ICustomersCategory[] | null;
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
  on(fromActions.GET_CUSTOMER_CATEGORY_START, (state) => ({
    ...state,
    loading: true,
    error: null,
    succeeded: false,
  })),
  on(
    fromActions.GET_CUSTOMER_CATEGORY_SUCCESS,
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
    fromActions.GET_CUSTOMER_CATEGORY_FAILED,
    (state, action) => ({
      ...state,
      error: action.error,
      loading: false,
      messages: [action.error.message],
      succeeded: false,
    })
  )
);
