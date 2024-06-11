import { createReducer, on } from "@ngrx/store";
import { ILoginResponse } from "src/app/interfaces/auth.interface";
import { IHttpResponse, IRequestStatus } from "../appStore";
import * as fromActions from "./auth.action";

// ================================================================ LOGIN ================================================================
export interface IState extends IHttpResponse, IRequestStatus {
  data: ILoginResponse | null;
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
  on(fromActions.LOGIN_START, (state) => ({
    ...state,
    loading: true,
    error: null,
    succeeded: false,
    messages: [],
  })),
  on(fromActions.LOGIN_SUCCESS, (state, action) => ({
    ...state,
    error: null,
    loading: false,
    data: action.data,
    messages: [],
    succeeded: true,
  })),
  on(fromActions.LOGIN_FAILED, (state, action) => ({
    ...state,
    error: action.error,
    loading: false,
    messages: [action.error.message],
    succeeded: false,
  })),
  on(fromActions.LOGOUT_START, (state) => ({
    ...state,
    loading: false,
    data: null,
    succeeded: true,
    messages: [],
  })),
);
