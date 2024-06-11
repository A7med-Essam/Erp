import { IPaginatorResponse, IRequestStatus } from "../store/appStore";
import { IPaginateOptions } from "./paginator.interface";
import { PaymentDiscount, PaymentMethod } from "./subscription.interface";

export interface IGetInvoiceResponse
  extends IPaginatorResponse,
    IRequestStatus {
  data: InvoiceInfo[];
}

export interface IGetInvoiceRequest extends IPaginateOptions {
  from?: string;
  to?: string;
}

export interface InvoiceInfo {
  id: number;
  customerId: number;
  customerName: string;
  deliveryBranchName: string;
  deliveryBranchId: number;
  customerType: string;
  currancyId: number;
  currancyRate: number;
  total: number;
  discount: number;
  net: number;
  tax: number;
  invoiceType: string;
  invoiceState: string;
  subscriptionBranchId: null;
  subscriptionBranchName: string;
  notes: null;
  actionDate: Date;
  expirationDate: Date;
  payDate: Date;
  manualDiscount: number;
  comfirmed: boolean;
  invoiceSerial: string;
  bagValue: number;
  subscrbtionId: number;
  finId: number;
  subscriptionType: number;
  subscripBranch: null;
  imgUrl: null;
  paymentDiscounts: any[];
  paymentMethods: PaymentMethod[];
}

export interface IUpdateInvoiceRequest {
  invoiceID: number;
  customerId: number;
  total: number;
  discount: number;
  net: number;
  tax: number;
  subscriptionType: number;
  subscripBranch: number | null;
  notes: string;
  manualDiscount: number;
  url: string | null;
  bageValue: number;
  paymentDiscounts: PaymentDiscount[] | null;
  paymentMethods: PaymentMethod[];
  uploadRequest: any;
}

// =================================== invoice details interface =============================

export interface InvoiceDetailsResponse extends IRequestStatus {
  data: InvoiceDetails;
}
export interface InvoiceDetails {
  invoiceNO: string;
  program: string;
  planTiltle: string;
  mealTypes: string;
  headCountry: boolean;
  dislikeMeals: string;
  paymentType: string;
  agent: string;
  createBranchAgent: string;
  firstName: string;
  lastName: string;
  gender: string;
  height: string;
  weight: string;
  birthDate: string;
  email: string;
  mobileNumber: string;
  secondMobileNumber: string;
  notes: string;
  startDate: string;
  emirate: string;
  landMark: string;
  vilaFlat: string;
  area: string;
  deliveryDays: string;
  total: number;
  discount: number;
  netTotal: number;
  vat: number;
  netTotalWithVat: number;
  granTotal: number;
}
