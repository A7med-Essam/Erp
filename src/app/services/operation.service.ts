import { Injectable } from "@angular/core";
import { ApiConfigService } from "../core/api-config.service";
import { Observable } from "rxjs";
import {
  IOperationsRequest,
  IOperationsResponse,
} from "../interfaces/operations.interface";
import { HttpParams } from "@angular/common/http";
import { IRequestStatus } from "../store/appStore";

@Injectable({
  providedIn: "root",
})
export class OperationService {
  constructor(private _ApiConfigService: ApiConfigService) {}

  GetOperations(request: IOperationsRequest): Observable<IOperationsResponse> {
    let params = new HttpParams()
      .set("PageSize", request.pageSize)
      .set("PageNumer", request.pageIndex);
    const data = {
      dateFrom: request.dateFrom,
      dateTo: request.dateTo,
      customerID: request.customerID,
      subscriptionNumber: request.subscriptionNumber,
      isPrintDate: request.isPrintDate,
    };
    return this._ApiConfigService.postReq(
      `v1/SupOperations/GetOperations`,
      data,
      params
    );
  }

  ChangeDeliveryStatus(status: any, ids: number[]): Observable<IRequestStatus> {
    let params = new HttpParams().set("Status", status);
    return this._ApiConfigService.postReq(
      `v1/SupOperations/ChangeDeliveryStatus`,
      ids,
      params
    );
  }

  Export(request: IExportOperationsRequest): Observable<string> {
    return this._ApiConfigService.postReq(
      `v1/SupOperations/ExportOperation`,
      request
    );
  }
}

export interface IExportOperationsRequest {
  dateFrom?: string | null;
  dateTo?: string | null;
  customerID?: number | null;
  isPrintDate?: boolean;
  subscriptionNumber?: number | null;
}