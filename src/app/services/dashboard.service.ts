import { Injectable } from "@angular/core";
import { ApiConfigService } from "../core/api-config.service";
import { Observable } from "rxjs";
import {
  IActivityResponse,
  IExpiredResponse,
  ILastPaymentResponse,
  ISalesResponse,
  ISubCountResponse,
} from "../interfaces/dashboard.interface";
import { HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  constructor(private _ApiConfigService: ApiConfigService) {}

  GetSubCounts(): Observable<ISubCountResponse> {
    return this._ApiConfigService.getReq(`v1/DashBoard/GetSubCounts`);
  }
  GetExpiredToday(): Observable<IExpiredResponse> {
    return this._ApiConfigService.getReq(`v1/DashBoard/GetExpiredToday`);
  }
  GetSales(): Observable<ISalesResponse> {
    return this._ApiConfigService.getReq(`v1/DashBoard/GetSales`);
  }
  GetLastPayment(): Observable<ILastPaymentResponse> {
    return this._ApiConfigService.getReq(`v1/DashBoard/GetLastPayment`);
  }
  GetLastActivity(): Observable<IActivityResponse> {
    return this._ApiConfigService.getReq(`v1/DashBoard/GetLastActivity`);
  }
}
