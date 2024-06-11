import { HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { Observable } from "rxjs";
import { ApiConfigService } from "../core/api-config.service";
import {
  CustomerInfoResponse,
  IAddCustomerAddressRequest,
  IAddEditCustomer,
  ICustomerInfo,
  ICustomerRequest,
  ICustomersRetentionRequest,
  ICustomersRetentionResponse,
  IDeleteCustomerResponse,
  IGetAllCustomersResponse,
  IGetCustomersCategoryResponse,
} from "../interfaces/customer.interface";
import {
  ICreateResponse,
  IExportRequest,
  IExportResponse,
  IRequestStatus,
} from "../store/appStore";

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  constructor(private _ApiConfigService: ApiConfigService) {}
  SELECTED_CUSTOMER = signal<ICustomerInfo | null>(null);

  GetAllCustomers(
    request: ICustomerRequest
  ): Observable<IGetAllCustomersResponse> {
    let params = new HttpParams()
      .set("pagenumber", request.pageIndex)
      .set("pagesize", request.pageSize)
      .set("Phone", request.Phone || "");
    return this._ApiConfigService.getReq(
      `v1/Customers/GetAllCustomers`,
      params
    );
  }

  DeleteCustomer(customerID: number): Observable<IDeleteCustomerResponse> {
    return this._ApiConfigService.deleteReq(
      `v1/Customers/DeleteCustomer?customerID=${customerID}`
    );
  }

  AddEditCustomer(customer: IAddEditCustomer): Observable<ICreateResponse> {
    return this._ApiConfigService.postReq(
      `v1/Customers/AddEditCustomer`,
      customer
    );
  }

  AddCustomerAddress(
    address: IAddCustomerAddressRequest
  ): Observable<ICreateResponse> {
    return this._ApiConfigService.postReq(
      `v1/CreateSubscriptions/AddCustomerAdress`,
      address
    );
  }

  GetCustomersCategory(): Observable<IGetCustomersCategoryResponse> {
    return this._ApiConfigService.getReq(`v1/Customers/GetCustomersCategory`);
  }

  GetcustomerAdress(CustomerID: number): Observable<CustomerInfoResponse> {
    let params = new HttpParams().set("CustomerID", CustomerID);
    return this._ApiConfigService.getReq(
      `v1/CreateSubscriptions/GetcustomerAdress`,
      params
    );
  }

  GetCustomerRetention(
    request: ICustomersRetentionRequest
  ): Observable<ICustomersRetentionResponse> {
    let params = new HttpParams()
      .set("pagenumber", request.pageIndex)
      .set("pagesize", request.pageSize)
      .set("from", request.from)
      .set("to", request.to);
    return this._ApiConfigService.getReq(
      `v1/Subscriptions/CustomersRetintion`,
      params
    );
  }

  ExportCustomers(request: string[]): Observable<IExportResponse> {
    return this._ApiConfigService.postReq(
      `v1/Customers/ExportAllCusomers`,
      request
    );
  }

  ExportCustomersRetintion(
    request: IExportRequest
  ): Observable<IExportResponse> {
    let params = new HttpParams()
      .set("from", request?.from || "")
      .set("to", request?.to || "");
    return this._ApiConfigService.postReq(
      `v1/Subscriptions/ExportCustomersRetintion`,
      request.body,
      params
    );
  }
}
