import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { IGetFullDataByPhone } from "src/app/interfaces/subscription.interface";

export const GET_FULL_SUBSCRIPTIONS_START = createAction('[Get Full Subscription] GET_FULL_SUBSCRIPTIONS_START', props<{data:string}>())
export const GET_FULL_SUBSCRIPTIONS_SUCCESS = createAction('[Get Full Subscription] GET_FULL_SUBSCRIPTIONS_SUCCESS', props<{data:IGetFullDataByPhone}>())
export const GET_FULL_SUBSCRIPTIONS_FAILED = createAction('[Get Full Subscription] GET_FULL_SUBSCRIPTIONS_FAILED', props<{error:HttpErrorResponse}>())