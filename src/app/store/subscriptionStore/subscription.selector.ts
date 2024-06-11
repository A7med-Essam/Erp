import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IState } from "./subscription.reducer";

const FeatureSelector = createFeatureSelector<IState>('GetAllSubscriptions')
export const allSubscriptionSelector = createSelector(FeatureSelector, state => state)

