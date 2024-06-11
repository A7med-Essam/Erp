import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IState } from "./role.reducer";

const FeatureSelector = createFeatureSelector<IState>('role')
export const RoleSelector = createSelector(FeatureSelector, state => state)
