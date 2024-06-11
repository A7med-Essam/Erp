import { createReducer, on } from "@ngrx/store";
import { IPaymentType } from "src/app/interfaces/subscription.interface";
import { IHttpResponse, IRequestStatus } from "../appStore";
import * as fromActions from "./paymentType.action";

export interface IState extends IHttpResponse, IRequestStatus {
  data: IPaymentType[] | null;
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
  on(fromActions.GET_PAYMENT_TYPE_START, (state) => ({
    ...state,
    loading: true,
    error: null,
    succeeded: false,
  })),
  on(fromActions.GET_PAYMENT_TYPE_SUCCESS, (state, action) => ({
    ...state,
    error: null,
    loading: false,
    data: action.data.data,
    succeeded: action.data.succeeded,
    messages: action.data.messages,
  })),
  on(fromActions.GET_PAYMENT_TYPE_FAILED, (state, action) => ({
    ...state,
    error: action.error,
    loading: false,
    data: null,
    messages: [action.error.message],
    succeeded: false,
  }))
);
