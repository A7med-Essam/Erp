import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IState } from "./all-plan.reducer";

const FeatureSelector = createFeatureSelector<IState>('GetAllPlans')
export const AllPlanSelector = createSelector(FeatureSelector, state => state)
