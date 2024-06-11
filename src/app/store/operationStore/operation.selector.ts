import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IState } from "./operation.reducer";

const FeatureSelector = createFeatureSelector<IState>('GetOperations')
export const OperationSelector = createSelector(FeatureSelector, state => state)
