import { createReducer, on } from "@ngrx/store";
import { IBRANCH_DRIVER } from "src/app/interfaces/branch.interface";
import { IHttpResponse, IRequestStatus } from "../appStore";
import * as fromActions from "./branchDriver.action";

export interface IState extends IHttpResponse, IRequestStatus {
  data: IBRANCH_DRIVER[] | null;
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
  on(fromActions.GET_BRANCH_DRIVER_START, (state) => ({
    ...state,
    loading: true,
    error: null,
    succeeded: false,
  })),
  on(fromActions.GET_BRANCH_DRIVER_SUCCESS, (state, action) => ({
    ...state,
    error: null,
    loading: false,
    data: action.data.data,
    succeeded: action.data.succeeded,
    messages: action.data.messages,
  })),
  on(fromActions.GET_BRANCH_DRIVER_FAILED, (state, action) => ({
    ...state,
    error: action.error,
    loading: false,
    data: null,
    messages: [action.error.message],
    succeeded: false,
  }))
);
