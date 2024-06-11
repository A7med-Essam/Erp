import { createReducer, on } from "@ngrx/store";
import { IDELIVERY_DAY } from "src/app/interfaces/delivery-day.interface";
import { IHttpResponse, IRequestStatus } from "../appStore";
import * as fromDeliveryDayActions from "./deliveryDay.action";

export interface IState extends IHttpResponse, IRequestStatus {
  data: IDELIVERY_DAY[] | null;
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
  on(fromDeliveryDayActions.GET_DELIVERY_DAY_START, (state) => ({
    ...state,
    loading: true,
    error: null,
    succeeded: false,
  })),
  on(fromDeliveryDayActions.GET_DELIVERY_DAY_SUCCESS, (state, action) => ({
    ...state,
    error: null,
    loading: false,
    data: action.data.data,
    succeeded: action.data.succeeded,
    messages: action.data.messages,
  })),
  on(fromDeliveryDayActions.GET_DELIVERY_DAY_FAILED, (state, action) => ({
    ...state,
    error: action.error,
    loading: false,
    data: null,
    messages: [action.error.message],
    succeeded: false,
  }))
);
