import { createReducer, on } from "@ngrx/store";
import { IFullSubscription } from "src/app/interfaces/subscription.interface";
import { IHttpResponse, IRequestStatus } from "../appStore";
import * as fromActions from "./fullSubscription.action";

export interface IState extends IHttpResponse, IRequestStatus {
  data: IFullSubscription | null;
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
  on(fromActions.GET_FULL_SUBSCRIPTIONS_START, (state) => ({
    ...state,
    loading: true,
    error: null,
    succeeded: false,
    messages:[]
  })),
  on(fromActions.GET_FULL_SUBSCRIPTIONS_SUCCESS, (state, action) => ({
    ...state,
    error: null,
    loading: false,
    data: action.data.data,
    messages:action.data.messages,
    succeeded: action.data.succeeded,
  })),
  on(fromActions.GET_FULL_SUBSCRIPTIONS_FAILED, (state, action) => ({
    ...state,
    error: action.error,
    loading: false,
    data: null,
    messages: [action.error.message],
    succeeded: false,
  }))
);
