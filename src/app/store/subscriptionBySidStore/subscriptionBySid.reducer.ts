import { createReducer, on } from "@ngrx/store";
import { ISubscriptionDetail } from "src/app/interfaces/subscription.interface";
import { IHttpResponse, IRequestStatus } from "../appStore";
import * as fromActions from "./subscriptionBySid.action";

export interface IState extends IHttpResponse, IRequestStatus {
  data: ISubscriptionDetail | null;
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
  on(fromActions.GET_SUBSCRIPTIONS_BY_SID_START, (state) => ({
    ...state,
    loading: true,
    error: null,
    data: null,
    succeeded: false,
    messages:[]
  })),
  on(
    fromActions.GET_SUBSCRIPTIONS_BY_SID_SUCCESS,
    (state, action) => ({
      ...state,
      error: null,
      loading: false,
      data: action.data.data,
      succeeded: action.data.succeeded,
      messages:action.data.messages
    })
  ),
  on(
    fromActions.GET_SUBSCRIPTIONS_BY_SID_FAILED,
    (state, action) => ({
      ...state,
      data:null,
      error: action.error,
      loading: false,
      messages: [action.error.message],
      succeeded: false,
    })
  )
);
