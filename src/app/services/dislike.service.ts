import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiConfigService } from "../core/api-config.service";
import {
  IDISLIKE_RESPONSE,
  IDislikeItemRequest,
  IDislikeItemResponse,
  IDislikeRequest,
} from "../interfaces/dislike.interface";
import { ICreateResponse, IRequestStatus } from "../store/appStore";
import { HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class DislikeService {
  constructor(private _ApiConfigService: ApiConfigService) {}

  GetDislikeCategory(): Observable<IDISLIKE_RESPONSE> {
    return this._ApiConfigService.getReq(
      `v1/CreateSubscriptions/GetDislikeCategory`
    );
  }
  DeleteCategory(id: number): Observable<IRequestStatus> {
    let params = new HttpParams().set("id", id);
    return this._ApiConfigService.deleteReq(
      `v1/AutoDislike/DeleteCategory`,
      params
    );
  }
  AddEditDislikeCategory(request: IDislikeRequest): Observable<IRequestStatus> {
    let params = new HttpParams().set("CategoryName", request.CategoryName);
    if (request.id) {
      params.set("id", request.id || "");
    }
    return this._ApiConfigService.postReq(
      `v1/AutoDislike/AddEditDislikeCategory`,
      "",
      params
    );
  }

  // =========================== Dislike ITEM ===========================
  GetDislikeItem(): Observable<IDislikeItemResponse> {
    return this._ApiConfigService.getReq(`v1/AutoDislike/GetDislikeItem`);
  }
  DeleteDislikeItem(id: number): Observable<IRequestStatus> {
    let params = new HttpParams().set("id", id);
    return this._ApiConfigService.deleteReq(
      `v1/AutoDislike/DeleteDislikeItem`,
      params
    );
  }
  AddEditDislikeItem(request: IDislikeItemRequest): Observable<ICreateResponse> {
    return this._ApiConfigService.postReq(
      `v1/AutoDislike/AddEditDislikeItem`,
      request
    );
  }
}
