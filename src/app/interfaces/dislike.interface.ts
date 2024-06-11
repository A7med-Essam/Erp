import { IRequestStatus } from "../store/appStore";
import { ISubDetail } from "./subscription.interface";

export interface IDISLIKE_RESPONSE extends IRequestStatus {
  data: IDISLIKE[];
}

export interface IDISLIKE {
  dilikeCategoryID: number;
  dilikeCategoryName: string;
}

export interface IDislikeRequest {
  id?: number;
  CategoryName: string;
}

// =========================== Dislike ITEM ===========================
export interface IDislikeItemResponse extends IRequestStatus {
  data: IDislikeItem[];
}

export interface IDislikeItem {
  id: number;
  categoryID: number;
  categoryName: string;
  itemID: number;
  itemName: string;
  oppsiteItemID: number;
  oppsiteItemName: string;
  itemUnitID: number;
  itemUnitName: string;
  oppsiteItemUNitID: number;
  oppsiteItemUNitName: string;
  qty: number;
  oppsiteQty: number;
  forEashQty: number;
  oppsiteForEashQty: number;
  replacePolicy: number;
}

export interface IDislikeItemRequest {
  id?: number;
  categoryID: number;
  itemID: number;
  oppsiteItemID: number;
  itemUnitID: number;
  oppsiteItemUNitID: number;
  qty: number;
  oppsiteQty: number;
  forEashQty: number;
  oppsiteForEashQty: number;
  replacePolicy: number;
}
// =========================== Auto Dislike Response ===========================

export interface IAutoDislikeResponse extends IRequestStatus {
  data: IAutoDislike;
}

export interface IAutoDislike {
  mealsToChange: ISubDetail[];
  mealsToSave: ISubDetail[];
}
