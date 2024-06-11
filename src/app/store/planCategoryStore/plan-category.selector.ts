import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IState } from "./plan-category.reducer";

const FeatureSelector = createFeatureSelector<IState>('GetPlansCategory')
export const PlanCategorySelector = createSelector(FeatureSelector, state => state)
