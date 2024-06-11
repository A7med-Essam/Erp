import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IState } from "./InvoiceLog.reducer";

const FeatureSelector = createFeatureSelector<IState>('GetSubscriptionInvoices')
export const InvoiceLogSelector = createSelector(FeatureSelector, state => state)
