import { createReducer, on } from "@ngrx/store";
import { IGENERATE_PLAN, IPLAN } from "src/app/interfaces/plan.interface";
import { IHttpResponse, IRequestStatus } from "../appStore";
import * as fromPlanActions from "./plan.action";

export interface IState extends IHttpResponse, IRequestStatus {
  data: IPLAN[] | null;
}

const initalValue: IState = {
  error: null,
  loading: true,
  data: null,
  messages: [],
  succeeded: false,
};

export const getPlanReducer = createReducer(
  initalValue,
  on(fromPlanActions.GET_PLAN_START, (state) => ({
    ...state,
    loading: true,
    error: null,
    succeeded: false,
  })),
  on(fromPlanActions.GET_PLAN_SUCCESS, (state, action) => ({
    ...state,
    error: null,
    loading: false,
    data: action.data.data,
    succeeded: action.data.succeeded,
    messages: action.data.messages,
  })),
  on(fromPlanActions.GET_PLAN_FAILED, (state, action) => ({
    ...state,
    error: action.error,
    loading: false,
    data: null,
    messages: [action.error.message],
    succeeded: false,
  }))
);

// =====================================

export interface IGENERATE_PLAN_STATE extends IHttpResponse, IRequestStatus {
  data: IGENERATE_PLAN | null;
}

const generatedPlan_initalValue: IGENERATE_PLAN_STATE = {
  error: null,
  loading: true,
  data: null,
  messages: [],
  succeeded: false,
};

export const generatePlanReducer = createReducer(
  generatedPlan_initalValue,
  on(fromPlanActions.GENERATE_PLAN_START, (state) => ({
    ...state,
    loading: true,
    error: null,
    succeeded: false,
  })),
  on(fromPlanActions.GENERATE_PLAN_SUCCESS, (state, action) => ({
    ...state,
    error: null,
    loading: false,
    data: action.data.data,
    succeeded: action.data.succeeded,
    messages: action.data.messages,
  })),
  on(fromPlanActions.GENERATE_PLAN_FAILED, (state, action) => ({
    ...state,
    error: action.error,
    loading: false,
    data: null,
    messages: [action.error.message],
    succeeded: false,
  }))
);
