import { createReducer, on } from "@ngrx/store";
import * as fromActions from "./lastPayment.action";
import { ILastPayment } from "src/app/interfaces/dashboard.interface";
import { IHttpResponse, IRequestStatus } from "../../appStore";

export interface IState extends IHttpResponse, IRequestStatus {
  data: ILastPayment[] | null;
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
  on(fromActions.GET_LAST_PAYMENT_START, (state) => ({
    ...state,
    loading: true,
    error: null,
    succeeded: false,
  })),
  on(fromActions.GET_LAST_PAYMENT_SUCCESS, (state, action) => ({
    ...state,
    error: null,
    loading: false,
    data: action.data.data,
    succeeded: action.data.succeeded,
    messages: action.data.messages,
  })),
  on(fromActions.GET_LAST_PAYMENT_FAILED, (state, action) => ({
    ...state,
    error: action.error,
    loading: false,
    data: null,
    messages: [action.error.message],
    succeeded: false,
  }))
);
