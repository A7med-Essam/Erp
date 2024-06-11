import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IState } from "./meals.reducer";

const FeatureSelector = createFeatureSelector<IState>('GetMealsByMealType')
export const MealSelector = createSelector(FeatureSelector, state => state)
