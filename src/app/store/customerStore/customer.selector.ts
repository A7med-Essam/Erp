import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IState } from "./customer.reducer";

const FeatureSelector =
  createFeatureSelector<IState>("GetAllCustomers");
export const customerSelector = createSelector(
  FeatureSelector,
  (state) => state
);
