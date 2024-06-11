import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IState } from "./user.reducer";

const FeatureSelector = createFeatureSelector<IState>('user')
export const UserSelector = createSelector(FeatureSelector, state => state)
