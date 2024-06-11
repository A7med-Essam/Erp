import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IState } from "./all-PlanDays.reducer";

const FeatureSelector = createFeatureSelector<IState>('GetAllPlanDays')
export const AllPlanDaySelector = createSelector(FeatureSelector, state => state)
