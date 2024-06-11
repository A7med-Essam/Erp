import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IState } from "./deliveryNoteLog.reducer";

const FeatureSelector = createFeatureSelector<IState>('GetdeilveryNotes')
export const DeliveryNoteLogSelector = createSelector(FeatureSelector, state => state)
