import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { IGetSubscriptionsByPhone } from "src/app/interfaces/subscription.interface";

export const GET_SUBSCRIPTIONS_BY_PHONE_START = createAction('[Get SubscriptionByPhone] GET_SUBSCRIPTIONS_BY_PHONE_START', props<{data:string}>())
export const GET_SUBSCRIPTIONS_BY_PHONE_SUCCESS = createAction('[Get SubscriptionByPhone] GET_SUBSCRIPTIONS_BY_PHONE_SUCCESS', props<{data:IGetSubscriptionsByPhone}>())
export const GET_SUBSCRIPTIONS_BY_PHONE_FAILED = createAction('[Get SubscriptionByPhone] GET_SUBSCRIPTIONS_BY_PHONE_FAILED', props<{error:HttpErrorResponse}>())