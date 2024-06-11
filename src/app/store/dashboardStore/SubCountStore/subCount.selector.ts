import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IState } from "./subCount.reducer";

const FeatureSelector = createFeatureSelector<IState>('GetSubCounts')
export const SubCountSelector = createSelector(FeatureSelector, state => state)
