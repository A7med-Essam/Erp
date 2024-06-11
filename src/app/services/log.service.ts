import { Injectable } from "@angular/core";
import { ApiConfigService } from "../core/api-config.service";
import { Observable } from "rxjs";
import {
  IAllLogsRequest,
  ICustomerLogResponse,
  IDeliveryLogResponse,
  IDeliveryNoteLogResponse,
  IDislikeLogResponse,
  ILogsResponse,
  InvoiceLogResponse,
} from "../interfaces/log.interface";
import { HttpParams } from "@angular/common/http";
import {
  ICustomersRetentionRequest,
  ICustomersRetentionResponse,
} from "../interfaces/customer.interface";
import { IExportRequest, IExportResponse } from "../store/appStore";

@Injectable({
  providedIn: "root",
})
export class LogService {
  constructor(private _ApiConfigService: ApiConfigService) {}

  GetCustomerLog(SID: number): Observable<ICustomerLogResponse> {
    let params = new HttpParams().set("SID", SID);
    return this._ApiConfigService.getReq(`v1/Actions/GetCustomerLog`, params);
  }

  GetDeliveryLog(SID: number): Observable<IDeliveryLogResponse> {
    let params = new HttpParams().set("SID", SID);
    return this._ApiConfigService.getReq(`v1/Actions/GetDeliveryLog`, params);
  }

  GetInvoiceLog(SID: number): Observable<InvoiceLogResponse> {
    let params = new HttpParams().set("SID", SID);
    return this._ApiConfigService.getReq(
      `v1/Actions/GetSubscriptionInvoices`,
      params
    );
  }

  GetDislikeLog(SID: number): Observable<IDislikeLogResponse> {
    let params = new HttpParams().set("SID", SID);
    return this._ApiConfigService.getReq(`v1/Actions/GetDislikeMeal`, params);
  }

  DeleteDislikeLog(id: number): Observable<IDislikeLogResponse> {
    let params = new HttpParams().set("id", id);
    return this._ApiConfigService.deleteReq(`v1/Actions/DeleteDilikeMeal`, params);
  }

  GetDeilveryNotes(sid: number): Observable<IDeliveryNoteLogResponse> {
    let params = new HttpParams().set("SID", sid);
    return this._ApiConfigService.getReq(`v1/Actions/GetdeilveryNotes`, params);
  }

  GetAllLogs(request: IAllLogsRequest): Observable<ILogsResponse> {
    let params = new HttpParams()
      .set("pagenumber", request.pageIndex)
      .set("pagesize", request.pageSize)
      .set("from", request?.from || "")
      .set("to", request?.to || "");
    return this._ApiConfigService.getReq(`v1/Actions/GetAllLogs`, params);
  }

  Export(request: IExportRequest): Observable<IExportResponse> {
    let params = new HttpParams()
      .set("from", request?.from || "")
      .set("to", request?.to || "");
    return this._ApiConfigService.postReq(
      `v1/Actions/ExportAllLogs`,
      request.body,
      params
    );
  }
}
