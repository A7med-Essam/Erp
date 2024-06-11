import { IPaginatorResponse, IRequestStatus } from "../store/appStore";
import { IPaginateOptions } from "./paginator.interface";

export interface ICustomerRequest extends IPaginateOptions {
  Phone?: string;
}

export interface IGetAllCustomersResponse
  extends IPaginatorResponse,
    IRequestStatus {
  data: ICustomerInfo[];
}

export interface ICustomerInfo {
  id: number;
  customerId: number;
  customerName: string;
  customerType: string;
  regDate: Date;
  regType: string;
  birthDate: Date;
  phone: string;
  status: boolean;
  email: string;
  weight: string;
  height: string;
  customerCategory: number;
  customerAdress: ICustomerAddress[];
  customerPhon: ICustomerPhone[];
}

export interface IDeleteCustomerResponse extends IRequestStatus {
  data: ICustomerInfo[];
}

export interface IGetCustomersCategoryResponse extends IRequestStatus {
  data: ICustomersCategory[];
}

export interface ICustomersCategory {
  id: number;
  categoryID: number;
  categoryName: string;
  comID: number;
  userID: number;
  tb_Customers: any[];
}

// ============================ ADD CUSTOMER ================================
export interface IAddEditCustomerResponse extends IRequestStatus {
  data: number;
}
export interface IAddEditCustomer {
  customerName: string;
  birthDate: Date;
  email: string;
  customerType: number;
  categoryId: number;
  regType: string;
  status: boolean;
  weight: string;
  height: string;
  notes: string;
  customerAdresses: ICustomerAddress[];
  customerPhons: ICustomerPhone[];
}

export interface ICustomerAddress {
  areaId: number;
  adress: string;
  area: Area;
  id: number;
}

export interface Area {
  areaName: string;
  branchName: string;
}
export interface ICustomerPhoneResponse extends IRequestStatus {
  data: ICustomerPhone[];
}
export interface ICustomerPhone {
  phone: string;
  phoneType: string;
  id: number;
}

export interface CustomerInfoResponse extends IRequestStatus {
  data: ICustomerAddressDetails[];
}

export interface ICustomerAddressDetails {
  id: number;
  areaId: number;
  adress: string;
  defaultAdress: boolean;
  customerID: number;
  branchID: number;
  driverID: number;
}

export interface IAddCustomerAddressRequest {
  areaId: number;
  adress: string;
  defaultAdress: boolean;
  customerID: number;
}

export interface ICustomersRetentionResponse
  extends IPaginatorResponse,
    IRequestStatus {
  data: ICustomersRetention[];
}

export interface ICustomersRetention {
  customerID: number;
  customerName: string;
  sid: number;
  phone: string;
  branch: string;
  lastDay: string;
  remaingDays: number;
}

export interface ICustomersRetentionRequest extends IPaginateOptions {
  from: string;
  to: string;
}

export interface IUpdateCustomerAddressRequest {
  customerAdresses: ICustomerAddressDetails[];
  customerId: number;
  SID: number;
}