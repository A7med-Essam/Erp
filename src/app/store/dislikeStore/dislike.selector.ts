import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IState } from "./dislike.reducer";

const FeatureSelector = createFeatureSelector<IState>('GetDislikeCategory')
export const DislikeSelector = createSelector(FeatureSelector, state => state)
