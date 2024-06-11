import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IState } from "./subscriptionBySid.reducer";

const FeatureSelector = createFeatureSelector<IState>('GetSubscriptionsBySID')
export const subscriptionBySidSelector = createSelector(FeatureSelector, state => state)

