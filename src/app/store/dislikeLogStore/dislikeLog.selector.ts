import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IState } from "./dislikeLog.reducer";

const FeatureSelector = createFeatureSelector<IState>('GetDislikeMeal')
export const DislikeLogSelector = createSelector(FeatureSelector, state => state)
