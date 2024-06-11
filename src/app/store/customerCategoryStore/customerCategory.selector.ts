import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IState } from "./customerCategory.reducer";

const FeatureSelector = createFeatureSelector<IState>('GetCustomersCategory')
export const customerCategorySelector = createSelector(FeatureSelector, state => state)

