import { createReducer, on } from "@ngrx/store";
import { IPLAN_CATEGORY } from "src/app/interfaces/plan-category.interface";
import { IHttpResponse, IRequestStatus } from "../appStore";
import * as fromActions from "./plan-category.action";

export interface IState extends IHttpResponse, IRequestStatus {
  data: IPLAN_CATEGORY[] | null;
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
  on(fromActions.GET_PLAN_CATEGORY_START, (state) => ({
    ...state,
    loading: true,
    error: null,
    succeeded: false,
  })),
  on(fromActions.GET_PLAN_CATEGORY_SUCCESS, (state, action) => ({
    ...state,
    error: null,
    loading: false,
    data: action.data.data,
    succeeded: action.data.succeeded,
    messages: action.data.messages,
  })),
  on(fromActions.GET_PLAN_CATEGORY_FAILED, (state, action) => ({
    ...state,
    error: action.error,
    loading: false,
    data: null,
    messages: [action.error.message],
    succeeded: false,
  }))
);
