import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IState } from "./dislike-item.reducer";

const FeatureSelector = createFeatureSelector<IState>('GetDislikeItem')
export const DislikeItemSelector = createSelector(FeatureSelector, state => state)
