import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { IGetAllSubscriptions, ISubscriptionRequest } from "src/app/interfaces/subscription.interface";

export const GET_ALL_SUBSCRIPTIONS_START = createAction('[Get All Subscription] GET_ALL_SUBSCRIPTIONS_START', props<{data:ISubscriptionRequest}>())
export const GET_ALL_SUBSCRIPTIONS_SUCCESS = createAction('[Get All Subscription] GET_ALL_SUBSCRIPTIONS_SUCCESS', props<{data:IGetAllSubscriptions}>())
export const GET_ALL_SUBSCRIPTIONS_FAILED = createAction('[Get All Subscription] GET_ALL_SUBSCRIPTIONS_FAILED', props<{error:HttpErrorResponse}>())