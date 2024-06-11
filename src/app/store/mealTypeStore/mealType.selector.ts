import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IState } from "./mealType.reducer";

const FeatureSelector = createFeatureSelector<IState>('GetMealsTypes')
export const MealTypeSelector = createSelector(FeatureSelector, state => state)
