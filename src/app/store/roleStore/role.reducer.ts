import { createReducer, on } from "@ngrx/store";
import { IHttpResponse, IRequestStatus } from "../appStore";
import * as fromActions from "./role.action";
import { IRole } from "src/app/interfaces/identity.interface";

export interface IState extends IHttpResponse, IRequestStatus {
  data: IRole[] | null;
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
  on(fromActions.GET_ROLE_START, (state) => ({
    ...state,
    loading: true,
    error: null,
    succeeded: false,
  })),
  on(fromActions.GET_ROLE_SUCCESS, (state, action) => ({
    ...state,
    error: null,
    loading: false,
    data: action.data.data,
    succeeded: action.data.succeeded,
    messages: action.data.messages,
  })),
  on(fromActions.GET_ROLE_FAILED, (state, action) => ({
    ...state,
    error: action.error,
    loading: false,
    data: null,
    messages: [action.error.message],
    succeeded: false,
  }))
);
