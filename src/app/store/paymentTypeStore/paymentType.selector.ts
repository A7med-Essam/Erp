import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IState } from "./paymentType.reducer";

const FeatureSelector = createFeatureSelector<IState>('GetPaymentType')
export const PaymentTypeSelector = createSelector(FeatureSelector, state => state)
