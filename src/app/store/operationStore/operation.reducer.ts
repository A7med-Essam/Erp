import { createReducer, on } from "@ngrx/store";
import { IHttpResponse, IPaginatorResponse, IRequestStatus } from "../appStore";
import * as fromActions from "./operation.action";
import { IOperations } from "src/app/interfaces/operations.interface";

export interface IState
  extends IHttpResponse,
    IPaginatorResponse,
    IRequestStatus {
  data: IOperations[] | null;
}

const initalValue: IState = {
  error: null,
  loading: true,
  data: null,
  messages: [],
  succeeded: false,
  currentPage: 0,
  hasNextPage: false,
  hasPreviousPage: false,
  pageSize: 0,
  totalCount: 0,
  totalPages: 0,
};

export const Reducer = createReducer(
  initalValue,
  on(fromActions.GET_OPERATIONS_START, (state) => ({
    ...state,
    loading: true,
    error: null,
    succeeded: false,
  })),
  on(fromActions.GET_OPERATIONS_SUCCESS, (state, action) => ({
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
  })),
  on(fromActions.GET_OPERATIONS_FAILED, (state, action) => ({
    ...state,
    error: action.error,
    loading: false,
    data: null,
    messages: [action.error.message],
    succeeded: false,
  }))
);
