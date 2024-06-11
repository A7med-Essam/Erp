import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IState } from "./sales.reducer";

const FeatureSelector = createFeatureSelector<IState>('GetSales')
export const SalesSelector = createSelector(FeatureSelector, state => state)
