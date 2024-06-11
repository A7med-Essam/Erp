import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IState } from "./permission.reducer";

const FeatureSelector = createFeatureSelector<IState>('roleClaim')
export const PermissionSelector = createSelector(FeatureSelector, state => state)
