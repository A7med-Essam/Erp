import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IState } from "./driver.reducer";

const FeatureSelector = createFeatureSelector<IState>('GetAllDrivers')
export const DriverSelector = createSelector(FeatureSelector, state => state)
