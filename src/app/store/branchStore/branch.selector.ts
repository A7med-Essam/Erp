import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IState } from "./branch.reducer";

const FeatureSelector = createFeatureSelector<IState>('GetAllBranchies')
export const BranchSelector = createSelector(FeatureSelector, state => state)
