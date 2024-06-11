import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IState } from "./governorate.reducer";

const FeatureSelector = createFeatureSelector<IState>('GetALLGovernorates')
export const GovernorateSelector = createSelector(FeatureSelector, state => state)
