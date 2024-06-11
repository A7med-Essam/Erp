import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IState } from "./log.reducer";

const FeatureSelector = createFeatureSelector<IState>('GetAllLogs')
export const LogSelector = createSelector(FeatureSelector, state => state)
