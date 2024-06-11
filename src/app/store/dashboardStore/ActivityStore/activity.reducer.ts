import { createReducer, on } from "@ngrx/store";
import * as fromActions from "./activity.action";
import { IHttpResponse, IRequestStatus } from "../../appStore";
import { IActivity } from "src/app/interfaces/dashboard.interface";

export interface IState extends IHttpResponse, IRequestStatus {
  data: IActivity[] | null;
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
  on(fromActions.GET_ACTIVITY_START, (state) => ({
    ...state,
    loading: true,
    error: null,
    succeeded: false,
  })),
  on(fromActions.GET_ACTIVITY_SUCCESS, (state, action) => ({
    ...state,
    error: null,
    loading: false,
    data: action.data.data,
    succeeded: action.data.succeeded,
    messages: action.data.messages,
  })),
  on(fromActions.GET_ACTIVITY_FAILED, (state, action) => ({
    ...state,
    error: action.error,
    loading: false,
    data: null,
    messages: [action.error.message],
    succeeded: false,
  }))
);
