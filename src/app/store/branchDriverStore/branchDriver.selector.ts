import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IState } from "./branchDriver.reducer";

const FeatureSelector = createFeatureSelector<IState>('GetBranchiesDrivers')
export const BranchDriverSelector = createSelector(FeatureSelector, state => state)
