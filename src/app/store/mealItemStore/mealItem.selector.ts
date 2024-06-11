import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IState } from "./mealItem.reducer";

const FeatureSelector = createFeatureSelector<IState>('GetItems')
export const MealItemSelector = createSelector(FeatureSelector, state => state)
