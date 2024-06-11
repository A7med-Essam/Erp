import { createReducer, on } from "@ngrx/store";
import { IHttpResponse, IRequestStatus } from "../appStore";
import * as fromActions from "./InvoiceLog.action";
import { InvoiceLog } from "src/app/interfaces/log.interface";

export interface IState extends IHttpResponse, IRequestStatus {
  data: InvoiceLog[] | null;
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
  on(fromActions.GET_INVOICE_LOG_START, (state) => ({
    ...state,
    loading: true,
    error: null,
    succeeded: false,
  })),
  on(fromActions.GET_INVOICE_LOG_SUCCESS, (state, action) => ({
    ...state,
    error: null,
    loading: false,
    data: action.data.data,
    succeeded: action.data.succeeded,
    messages: action.data.messages,
  })),
  on(fromActions.GET_INVOICE_LOG_FAILED, (state, action) => ({
    ...state,
    error: action.error,
    loading: false,
    data: null,
    messages: [action.error.message],
    succeeded: false,
  }))
);
