import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IState } from "./expired.reducer";

const FeatureSelector = createFeatureSelector<IState>("GetExpiredToday");
export const ExpiredSelector = createSelector(
  FeatureSelector,
  (state) => state
);
