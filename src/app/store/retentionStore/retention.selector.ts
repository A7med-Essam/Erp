import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IState } from "./retention.reducer";

const FeatureSelector = createFeatureSelector<IState>('CustomersRetintion')
export const RetentionSelector = createSelector(FeatureSelector, state => state)
