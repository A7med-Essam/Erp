import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IState } from "./area.reducer";

const FeatureSelector = createFeatureSelector<IState>('GetAreas')
export const AreaSelector = createSelector(FeatureSelector, state => state)
