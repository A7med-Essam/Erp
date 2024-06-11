import { createReducer, on } from "@ngrx/store";
import { IHttpResponse, IRequestStatus } from "../appStore";
import * as fromDeliveryLogActions from "./deliveryLog.action";
import { IDeliveryLog } from "src/app/interfaces/log.interface";

export interface IState extends IHttpResponse, IRequestStatus {
  data: IDeliveryLog[] | null;
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
  on(fromDeliveryLogActions.GET_DELIVERY_LOG_START, (state) => ({
    ...state,
    loading: true,
    error: null,
    succeeded: false,
  })),
  on(fromDeliveryLogActions.GET_DELIVERY_LOG_SUCCESS, (state, action) => ({
    ...state,
    error: null,
    loading: false,
    data: action.data.data,
    succeeded: action.data.succeeded,
    messages: action.data.messages,
  })),
  on(fromDeliveryLogActions.GET_DELIVERY_LOG_FAILED, (state, action) => ({
    ...state,
    error: action.error,
    loading: false,
    data: null,
    messages: [action.error.message],
    succeeded: false,
  }))
);
