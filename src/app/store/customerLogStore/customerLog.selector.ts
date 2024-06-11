import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IState } from "./customerLog.reducer";

const FeatureSelector = createFeatureSelector<IState>('GetCustomerLog')
export const CustomerLogSelector = createSelector(FeatureSelector, state => state)
