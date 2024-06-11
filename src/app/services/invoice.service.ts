import { Injectable } from "@angular/core";
import { ApiConfigService } from "../core/api-config.service";
import { Observable } from "rxjs";
import {
  IGetInvoiceRequest,
  IGetInvoiceResponse,
  IUpdateInvoiceRequest,
  InvoiceDetailsResponse,
} from "../interfaces/invoice.interface";
import { HttpParams } from "@angular/common/http";
import { IExportRequest, IExportResponse, IRequestStatus } from "../store/appStore";

@Injectable({
  providedIn: "root",
})
export class InvoiceService {
  constructor(private _ApiConfigService: ApiConfigService) {}
  GetInvoices(request: IGetInvoiceRequest): Observable<IGetInvoiceResponse> {
    let params = new HttpParams()
      .set("PageNumber", request.pageIndex)
      .set("pageSize", request.pageSize)
      .set("from", request?.from || "")
      .set("to", request?.to || "");
    return this._ApiConfigService.getReq(`v1/Invoices/GetAllInvoice`, params);
  }

  UpdateInvoice(data: IUpdateInvoiceRequest): Observable<IRequestStatus> {
    return this._ApiConfigService.postReq(`v1/Invoices/UpdateInvoice`, data);
  }

  Export(request: IExportRequest): Observable<IExportResponse> {
    let params = new HttpParams()
      .set("from", request?.from || "")
      .set("to", request?.to || "");
    return this._ApiConfigService.postReq(
      `v1/Invoices/ExportInvoice`,
      request.body,
      params
    );
  }

  GetInvoiceDetails(InvoiceNumber: number): Observable<InvoiceDetailsResponse> {
    let params = new HttpParams().set("InvoiceNumber", InvoiceNumber);
    return this._ApiConfigService.getReq(
      `v1/Actions/GetInvoiceDetails`,
      params
    );
  }
}
