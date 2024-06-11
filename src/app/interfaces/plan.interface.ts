import { IRequestStatus } from "../store/appStore";

export interface IPLAN_RESPONSE extends IRequestStatus {
  data: IPLAN[];
}

export interface IPLAN {
  planID: number;
  planName: string;
}

export interface IGENERATE_PLAN_RESPONSE extends IRequestStatus {
  data: IGENERATE_PLAN;
}

export interface IGENERATE_PLAN {
  subscriptionDetails: IPLAN_DETAILS[];
  planExpresion: string;
  planPrice: number;
  taxSettings:{
    isIncluedTax:boolean;
    taxActive:boolean;
    taxDicountOption:number
    taxPercent:number
    bagValue:number
  }
}

export interface IPLAN_DETAILS {
  mealID: number;
  mealTypeID: number;
  dayID: number;
  dayName: string;
  deliveryDate: string;
  dayNumberCount: number;
  mealTypeName: string;
  mealName: string;
}

// ======

export interface IGENERATE_PLAN_REQUEST {
  customerID: number;
  planCategory: number;
  planId: number;
  duration: string;
  startdate: Date;
  mealsType: MealsType[];
  deliveryDays: DeliveryDay[];
  subscripBranch: number;
  dislikeDategory: DislikeDategory[];
  branchID: number;
  // invoice: Invoice;
}

interface DeliveryDay {
  day_id: number;
  day_name: string;
  show: boolean;
}

interface DislikeDategory {
  dilikeCategoryID: number;
  dilikeCategoryName: string;
}

interface Invoice {
  subscriptionsID: number;
  customerId: number;
  total: number;
  discount: number;
  net: number;
  tax: number;
  subscriptionType: number;
  subscripBranch: number;
  notes: string;
  manualDiscount: number;
  bageValue: number;
  paymentDiscounts: PaymentDiscount[];
  paymentMethods: PaymentMethod[];
}

interface PaymentDiscount {
  id: number;
  paymentDetailsId: number;
  discountId: number;
  discountValue: number;
  couponCode: string;
  discountType: number;
  customerId: number;
}

interface PaymentMethod {
  id: number;
  paymentsDetailsId: number;
  methodId: number;
  amount: number;
  refrenceId: string;
  type: number;
}

interface MealsType {
  mealTypeCategoryID: number;
  mealTypeCategoryName: string;
  mealTypeID: number;
  mealTypeName: string;
}
