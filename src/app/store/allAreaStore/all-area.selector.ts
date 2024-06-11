import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IState } from "./all-area.reducer";

const FeatureSelector = createFeatureSelector<IState>('GetALlAreas')
export const AllAreaSelector = createSelector(FeatureSelector, state => state)
