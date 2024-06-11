import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IState } from "./auth.reducer";

const FeatureSelector = createFeatureSelector<IState>('login')
export const loginSelector = createSelector(FeatureSelector, state => state)

