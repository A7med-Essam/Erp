import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IState } from "./invoice.reducer";

const FeatureSelector = createFeatureSelector<IState>('GetAllInvoice')
export const InvoiceSelector = createSelector(FeatureSelector, state => state)
