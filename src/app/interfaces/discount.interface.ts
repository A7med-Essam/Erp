import { IRequestStatus } from "../store/appStore";

export interface IDiscountResponse extends IRequestStatus {
  data: IDiscountResult;
}

export interface IDiscountResult {
  errorList: string[];
  result: boolean;
  discounts: IDiscount[];
}

export interface IDiscount {
  id: number;
  paymentDetailsId: number;
  discountId: number;
  discountValue: number;
  couponCode: string;
  discountType: number;
  customerId: number;
}

export interface IDiscountRequest {
  customerId: number;
  total: number;
  discount: number;
  net: number;
  tax: number;
  manualDiscount: number;
  bageValue: number;
  paymentDiscounts: IDiscount[];
}
