import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IState } from "./planDay.reducer";

const FeatureSelector = createFeatureSelector<IState>('GetPlanDays')
export const PlanDaySelector = createSelector(FeatureSelector, state => state)
