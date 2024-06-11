import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IState } from "./subscriptionByPhone.reducer";

const FeatureSelector = createFeatureSelector<IState>('GetSubscriptionsByPhone')
export const subscriptionByPhoneSelector = createSelector(FeatureSelector, state => state)

