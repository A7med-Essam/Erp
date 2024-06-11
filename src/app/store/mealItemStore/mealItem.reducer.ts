import { createReducer, on } from "@ngrx/store";
import { IHttpResponse, IPaginatorResponse, IRequestStatus } from "../appStore";
import * as fromActions from "./mealItem.action";
import { IMealItem } from "src/app/interfaces/meals.interface";

export interface IState
  extends IHttpResponse,
    IRequestStatus,
    IPaginatorResponse {
  data: IMealItem[] | null;
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
  on(fromActions.GET_MEAL_ITEM_START, (state) => ({
    ...state,
    loading: true,
    error: null,
    succeeded: false,
  })),
  on(fromActions.GET_MEAL_ITEM_SUCCESS, (state, action) => ({
    ...state,
    messages: action.data.messages,
    error: null,
    loading: false,
    data: action.data.data,
    succeeded: action.data.succeeded,
    currentPage: action.data.currentPage,
    hasNextPage: action.data.hasNextPage,
    hasPreviousPage: action.data.hasPreviousPage,
    pageSize: action.data.pageSize,
    totalCount: action.data.totalCount,
    totalPages: action.data.totalPages,
  })),
  on(fromActions.GET_MEAL_ITEM_FAILED, (state, action) => ({
    ...state,
    error: action.error,
    loading: false,
    data: null,
    messages: [action.error.message],
    succeeded: false,
  }))
);
