import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IState } from "./activity.reducer";

const FeatureSelector = createFeatureSelector<IState>('GetLastActivity')
export const ActivitySelector = createSelector(FeatureSelector, state => state)
