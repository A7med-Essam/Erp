import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IState } from "./deliveryLog.reducer";

const FeatureSelector = createFeatureSelector<IState>('GetDeliveryLog')
export const DeliveryLogSelector = createSelector(FeatureSelector, state => state)
