import { IPaginatorResponse, IRequestStatus } from "../store/appStore";
import { IPaginateOptions } from "./paginator.interface";

export interface ISubscriptionRequest extends IPaginateOptions {
  Sid?: string;
  oldSid?: string;
  Phone?: string;
  from?: string;
  to?: string;
}

//  ALl Subscriptions
export interface IGetAllSubscriptions
  extends IPaginatorResponse,
    IRequestStatus {
  data: ISubscriptionInfo;
}
export interface ISubscriptionInfo {
  subscriptionsID: number;
  customerID: number;
  customerName: string;
  driver: null;
  startDate: Date;
  subscriptionStatus: number;
  plan: string;
  createDate: Date;
  remaingDays: number;
  lastDeliveryDay: string;
  durations: number;
  deliveryDays: string;
  mealTypes: string;
  kotsid: number;
  phone: string;
  adress: string;
}

// GetFullDataByPhone
export interface IGetFullDataByPhone extends IRequestStatus {
  data: IFullSubscription;
}
export interface IFullSubscription {
  customer: ICustomer;
  subscriptions: ISubscription[];
}
interface ICustomer {
  customerId: number;
  customerName: string;
  customerType: number;
  phone: string;
}

// GetSubscriptionsByPhone
export interface IGetSubscriptionsByPhone extends IRequestStatus {
  data: ISubscription;
}
export interface ISubscription {
  subscriptionsID: number;
  plan: string;
  planID: number;
  planCategory: number;
  createDate: Date;
  remaingDays: number;
  lastDeliveryDay: string;
  durations: number;
  deliveryDays: string;
  mealTypes: string;
  isStatrDeliverd: boolean;
  customerID: number;
  customerName: string;
  branch: IBranch;
  driver: IDriver;
  adress: IAdress;
  phone: IPhone;
  notes: string;
  status: string;
  customerType: string;
}

export interface IAdress {
  id: number;
  areaId: number;
  adress: string;
  defaultAdress: boolean;
}

export interface IBranch {
  branchID: number;
  branchName: string;
}

export interface IDriver {
  driverID: number;
  driverName: string;
}

export interface IPhone {
  id: number;
  phone: string;
  phoneType: null;
}

// GetSubscriptionsBySID
export interface IGetSubscriptionsBySID extends IRequestStatus {
  data: ISubscriptionDetail;
}
export interface ISubscriptionDetail {
  subscriptionHeader: ISubscription;
  subscriptionDetails: ISubDetail[];
  dislikeCategory: string;
}
export interface ISubDetail {
  id: number;
  deliveryAdress: number;
  driver: string;
  branch: string;
  mealID: number;
  mealTypeID: number;
  mealName: string;
  mealTypeName: string;
  dayID: number;
  dayName: string;
  deliveryDate: string;
  dayNumberCount: number;
  paymentsDetailsID: number;
  lineState: string;
  deliveryStatus: string;
  notes: string;
  deliveryNotes: string;
  autoDislikeMeal: boolean;
  isDislikeMeal: boolean;
  extraCarb: number;
  extraProtin: number;
  mealNote: string;
}

// GetPaymentType
export interface IGetPaymentTypeResponse extends IRequestStatus {
  data: IPaymentType[];
}

export interface IPaymentType {
  paymentID: number;
  paymentName: string;
}

export interface IPaymentTypeRequest {
  SubscriptionType: number;
  BranchID: number;
}

// ========================================== Create Subscription ==========================================
export interface ICreateSubscriptionsResponse extends IRequestStatus {
  data: number;
}

export interface ICreateSubscriptionsRequest {
  planCategory: number;
  planId: number;
  duration: number;
  startdate: Date;
  mealsType: MealsType[];
  deliveryDays: DeliveryDay[];
  dislikeDategory: DislikeDategory[];
  customerID: number;
  driverID: number;
  branchID: number;
  adressID: number;
  isSponsor: boolean;
  bagCount: number;
  invoice: Invoice;
}

export interface DeliveryDay {
  day_id: number;
  day_name: string;
  show: boolean;
}

export interface DislikeDategory {
  dilikeCategoryID: number;
  dilikeCategoryName: string;
}

export interface Invoice {
  customerId: number;
  total: number;
  discount: number;
  net: number;
  tax: number;
  subscriptionType: number;
  subscripBranch: number;
  notes: string;
  manualDiscount: number;
  invoiceAttatchment: string;
  bageValue: number;
  paymentDiscounts: PaymentDiscount[];
  paymentMethods: PaymentMethod[];
}

export interface PaymentDiscount {
  id: number;
  paymentDetailsId: number;
  discountId: number;
  discountValue: number;
  couponCode: string;
  discountType: number;
  customerId: number;
}

export interface PaymentMethod {
  id: number;
  paymentsDetailsId: number;
  methodId: number;
  amount: number;
  refrenceId: string;
}

export interface MealsType {
  mealTypeCategoryID: number;
  mealTypeCategoryName: string;
  mealTypeID: number;
  mealTypeName: string;
}
