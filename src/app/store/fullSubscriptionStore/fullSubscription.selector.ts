import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IState } from "./fullSubscription.reducer";

const FeatureSelector = createFeatureSelector<IState>('GetFullDataByPhone')
export const fullSubscriptionSelector = createSelector(FeatureSelector, state => state)

