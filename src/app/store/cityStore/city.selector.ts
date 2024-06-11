import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IState } from "./city.reducer";

const FeatureSelector = createFeatureSelector<IState>("GetALlCities");
export const CitySelector = createSelector(
  FeatureSelector,
  (state) => state
);
