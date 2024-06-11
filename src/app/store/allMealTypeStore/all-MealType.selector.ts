import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IState } from "./all-MealType.reducer";

const FeatureSelector = createFeatureSelector<IState>('GetAllMealsType')
export const AllMealTypeSelector = createSelector(FeatureSelector, state => state)
