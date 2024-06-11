import { createReducer, on } from "@ngrx/store";
import { ISubscription } from "src/app/interfaces/subscription.interface";
import { IHttpResponse, IRequestStatus } from "../appStore";
import * as fromActions from "./subscriptionByPhone.action";

export interface IState extends IHttpResponse, IRequestStatus {
  data: ISubscription | null;
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
  on(fromActions.GET_SUBSCRIPTIONS_BY_PHONE_START, (state) => ({
    ...state,
    loading: true,
    error: null,
    succeeded: false,
    messages:[]
  })),
  on(
    fromActions.GET_SUBSCRIPTIONS_BY_PHONE_SUCCESS,
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
    fromActions.GET_SUBSCRIPTIONS_BY_PHONE_FAILED,
    (state, action) => ({
      ...state,
      error: action.error,
      loading: false,
      messages: [action.error.message],
      succeeded: false,
      data: null,
    })
  )
);
