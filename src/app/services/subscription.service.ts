import { HttpParams } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ApiConfigService } from "../core/api-config.service";
import {
  ICreateSubscriptionsRequest,
  ICreateSubscriptionsResponse,
  IGetAllSubscriptions,
  IGetFullDataByPhone,
  IGetPaymentTypeResponse,
  IGetSubscriptionsByPhone,
  IGetSubscriptionsBySID,
  IPaymentTypeRequest,
  ISubscriptionInfo,
  ISubscriptionRequest,
} from "../interfaces/subscription.interface";
import {
  IDiscountRequest,
  IDiscountResponse,
} from "../interfaces/discount.interface";
import { IExportRequest, IExportResponse } from "../store/appStore";

@Injectable({
  providedIn: "root",
})
export class SubscriptionService {
  constructor(private _ApiConfigService: ApiConfigService) {}
  SELECTED_SUBSCRIPTION = signal<ISubscriptionInfo | null>(null);
  currentSID = new BehaviorSubject<string>("");

  GetAllSubscriptions(
    request: ISubscriptionRequest
  ): Observable<IGetAllSubscriptions> {
    let params = new HttpParams()
      .set("pagenumber", request.pageIndex)
      .set("pagesize", request.pageSize)
      .set("Phone", request.Phone || "")
      .set("Sid", request.Sid || "")
      .set("oldSid", request.oldSid || "")
      .set("from", request?.from || "")
      .set("to", request?.to || "");
    return this._ApiConfigService.getReq(
      `v1/Subscriptions/GetAllSubscriptions`,
      params
    );
  }

  GetSubscriptionsByPhone(
    PhoneNumber: string
  ): Observable<IGetSubscriptionsByPhone> {
    return this._ApiConfigService.getReq(
      `v1/Subscriptions/GetSubscriptionsByPhone?PhoneNumber=${PhoneNumber}`
    );
  }

  GetFullDataByPhone(PhoneNumber: string): Observable<IGetFullDataByPhone> {
    return this._ApiConfigService.getReq(
      `v1/Subscriptions/GetFullDataByPhone?PhoneNumber=${PhoneNumber}`
    );
  }

  GetSubscriptionsBySID(SID: number): Observable<IGetSubscriptionsBySID> {
    return this._ApiConfigService.getReq(
      `v1/Subscriptions/GetSubscriptionsBySID?SID=${SID}`
    );
  }

  CreateSubscriptions(
    data: ICreateSubscriptionsRequest
  ): Observable<ICreateSubscriptionsResponse> {
    return this._ApiConfigService.postReq(
      `v1/CreateSubscriptions/CreateSubscriptions`,
      data
    );
  }

  ApplyDiscount(
    coupon: string,
    data: IDiscountRequest
  ): Observable<IDiscountResponse> {
    let params = new HttpParams().set("coupon", coupon);
    return this._ApiConfigService.postReq(
      `v1/CreateSubscriptions/ApplyDiscount`,
      data,
      params
    );
  }

  GetPaymentType(
    data: IPaymentTypeRequest
  ): Observable<IGetPaymentTypeResponse> {
    let params = new HttpParams()
      .set("SubscriptionType", data.SubscriptionType)
      .set("BranchID", data.BranchID);
    return this._ApiConfigService.getReq(
      `v1/CreateSubscriptions/GetPaymentType`,
      params
    );
  }

  Export(request:IExportRequest): Observable<IExportResponse> {
    let params = new HttpParams()
    .set("from", request.from)
    .set("to", request.to);
    return this._ApiConfigService.postReq(
      `v1/Subscriptions/ExportSubscriptions`,
      request.body,
      params
    );
  }
}
