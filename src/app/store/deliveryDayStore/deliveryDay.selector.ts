import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IState } from "./deliveryDay.reducer";

const FeatureSelector = createFeatureSelector<IState>('GetDeliveryDays')
export const DeliveryDaySelector = createSelector(FeatureSelector, state => state)
