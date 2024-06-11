import { IRequestStatus } from "../store/appStore";

export interface IMEAL_TYPE_RESPONSE extends IRequestStatus {
  data: IMEAL_TYPE[];
}

export interface IMEAL_TYPE {
  mealTypeCategoryID: number;
  mealTypeCategoryName: string;
  mealTypeID: number;
  mealTypeName: string;
}
