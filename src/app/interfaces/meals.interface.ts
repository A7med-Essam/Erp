import { IPaginatorResponse, IRequestStatus } from "../store/appStore";
import { IPaginateOptions2 } from "./paginator.interface";

export interface IGetMealsResponse extends IPaginatorResponse, IRequestStatus {
  data: IMEALS_BY_TYPE[];
}

export interface IGetMealsAction {
  MealTypeID: number;
  pagenumber: number;
  pagesize: number;
  mealname?: string;
}

export interface IMEALS_BY_TYPE {
  mealName: string;
  mealID: number;
}

export interface IMealItemRequest extends IPaginateOptions2 {
  ItemName?: string;
}

export interface IMealItemResponse extends IPaginatorResponse, IRequestStatus {
  data: IMealItem[];
}

export interface IMealItem {
  id: number;
  itemEnName: string;
  itemType: number;
  unitId: number;
  unitName: string;
  defQty: number;
  itemNutoritionResponses: INutorition[];
}

export interface INutorition {
  id: number;
  itemId: number;
  value: number;
  equation: string;
  percEquation: string;
  masterid: number;
  nutPerc: number;
  nutMasterName: string;
  calcRow: boolean;
  itemNutQty: number;
}

export interface IGetMealItemAction {
  pagenumber: number;
  pagesize: number;
  ItemName?: string;
}
// =========================================================

export interface IMealDetailsResponse extends IRequestStatus {
  data: IMealDetails;
}

export interface IMealDetails {
  id: number;
  mealId: number;
  mealName: string;
  planCategoryID: number;
  comId: number;
  tag: string;
  iscustom: boolean;
  typeId: number;
  mealLineResponse: IMealLine[];
  mealsNutoritionResponses: any;
}

export interface IMealLine {
  id: number;
  itemName: string;
  unitId: number;
  unitName: string;
  qty: number;
  itemType: number;
  itemId: number;
  mealId: number;
  itemNutoritionResponses: INutorition[];

  carb: number;
  protein: number;
  fat: number;
  sodium: number;
  calories: number;
  kjl: number;
}

// ============================================ Create Custom Meal =========================================

export interface ICreateCustomMealRequest {
  mealName: string;
  planCategoryID: number;
  mealLineResponse: CustomMealLineResponse[];
  mealsNutoritionResponses: CustomMealNutoritionResponse[];
}

export interface CustomMealLineResponse {
  id: number;
  itemName: string;
  unitId: number;
  unitName: string;
  qty: number;
  itemType: number;
  itemId: number;
  mealId: number;
  itemNutoritionResponses: CustomMealNutoritionResponse[];
}

export interface CustomMealNutoritionResponse {
  id: number;
  itemId?: number;
  value: number;
  equation: string;
  percEquation: string;
  masterid: number;
  nutPerc: number;
  nutMasterName: string;
  calcRow: boolean;
  itemNutQty?: number;
  mealId?: number;
}
// ======================================== Migration & Renew =========================================

export interface IMigration extends IRenew {}
export interface IRenew {
  sid: number;
  planCategory: number;
  planId: number;
  duration: number;
  startdate: Date;
  mealsType: IMealsType[];
  deliveryDays: IDeliveryDay[];
  subscriptionType: number;
  subscripBranch: null;
  sponsor: number;
  invoice: Invoice | null;
}

export interface IDeliveryDay {
  day_id: number;
  day_name: string;
  show: boolean;
}

export interface Invoice {
  customerId: number;
  total: number;
  discount: number;
  net: number;
  tax: number;
  notes: string;
  subscriptionType: number;
  subscripBranch: null;
  manualDiscount: number;
  url: string;
  bagCount: number;
  bageValue: number;
  paymentMethods: Payment[];
  payments: Payment[];
  paymentDiscounts: any[];
  TaxDicountOption: string;
  isIncluedTax: boolean;
  taxActive: boolean;
  taxAmount: number;
  uploadRequest: UploadRequest;
}

export interface Payment {
  id: number;
  paymentsDetailsId: number;
  methodId: number;
  methodName: string;
  amount: number;
  refrenceId: string;
}

export interface UploadRequest {
  fileName: string;
  extension: string;
  uploadType: number;
  data: string;
}

export interface IMealsType {
  mealTypeCategoryID: number;
  mealTypeCategoryName: string;
  mealTypeID: number;
  mealTypeName: string;
}
