import { createReducer, on } from "@ngrx/store";
import { ISubscriptionInfo } from "src/app/interfaces/subscription.interface";
import { IHttpResponse, IPaginatorResponse, IRequestStatus } from "../appStore";
import * as fromActions from "./subscription.action";

export interface IState
  extends IHttpResponse,
    IPaginatorResponse,
    IRequestStatus {
  data: ISubscriptionInfo | null;
}

const initalValue: IState = {
  error: null,
  loading: true,
  data: null,
  messages: [],
  currentPage: 0,
  hasNextPage: false,
  hasPreviousPage: false,
  pageSize: 0,
  totalCount: 0,
  totalPages: 0,
  succeeded: false,
};

export const Reducer = createReducer(
  initalValue,
  on(fromActions.GET_ALL_SUBSCRIPTIONS_START, (state) => ({
    ...state,
    loading: true,
    error: null,
    data: null,
    succeeded: false,
    messages: [],
  })),
  on(
    fromActions.GET_ALL_SUBSCRIPTIONS_SUCCESS,
    (state, action) => ({
      ...state,
      error: null,
      loading: false,
      data: action.data.data,
      messages: action.data.messages,
      succeeded: action.data.succeeded,
      currentPage: action.data.currentPage,
      hasNextPage: action.data.hasNextPage,
      hasPreviousPage: action.data.hasPreviousPage,
      pageSize: action.data.pageSize,
      totalCount: action.data.totalCount,
      totalPages: action.data.totalPages,
    })
  ),
  on(fromActions.GET_ALL_SUBSCRIPTIONS_FAILED, (state, action) => ({
    ...state,
    error: action.error,
    data: null,
    loading: false,
    messages: [action.error.message],
    succeeded: false,
  }))
);
