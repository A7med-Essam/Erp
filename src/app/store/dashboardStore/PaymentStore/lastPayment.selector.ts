import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IState } from "./lastPayment.reducer";

const FeatureSelector = createFeatureSelector<IState>('GetLastPayment')
export const LastPaymentSelector = createSelector(FeatureSelector, state => state)
