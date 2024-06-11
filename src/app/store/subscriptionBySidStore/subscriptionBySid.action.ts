import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { IGetSubscriptionsBySID } from "src/app/interfaces/subscription.interface";

export const GET_SUBSCRIPTIONS_BY_SID_START = createAction('[Get SubscriptionBySid] GET_SUBSCRIPTIONS_BY_SID_START', props<{data:number}>())
export const GET_SUBSCRIPTIONS_BY_SID_SUCCESS = createAction('[Get SubscriptionBySid] GET_SUBSCRIPTIONS_BY_SID_SUCCESS', props<{data:IGetSubscriptionsBySID}>())
export const GET_SUBSCRIPTIONS_BY_SID_FAILED = createAction('[Get SubscriptionBySid] GET_SUBSCRIPTIONS_BY_SID_FAILED', props<{error:HttpErrorResponse}>())