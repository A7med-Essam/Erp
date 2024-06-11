import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IGENERATE_PLAN_STATE, IState } from "./plan.reducer";

const PlanFeatureSelector = createFeatureSelector<IState>('GetPlans')
export const PlanSelector = createSelector(PlanFeatureSelector, state => state)

const GeneratePlanFeatureSelector = createFeatureSelector<IGENERATE_PLAN_STATE>('GeneratePlan')
export const GeneratePlanSelector = createSelector(GeneratePlanFeatureSelector, state => state)
