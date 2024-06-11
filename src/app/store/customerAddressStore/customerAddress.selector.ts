import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IState } from "./customerAddress.reducer";

const FeatureSelector = createFeatureSelector<IState>('GetcustomerAdress')
export const CustomerAddressSelector = createSelector(FeatureSelector, state => state)
