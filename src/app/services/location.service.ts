import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiConfigService } from "../core/api-config.service";
import {
  IAreaRequest,
  IAreaResponse,
  ICityRequest,
  ICityResponse,
  IDriverRequest,
  IDriverResponse,
  IGovernorateRequest,
  IGovernorateResponse,
} from "../interfaces/location.interface";
import { IRequestStatus } from "../store/appStore";

@Injectable({
  providedIn: "root",
})
export class LocationService {
  constructor(private _ApiConfigService: ApiConfigService) {}

  // driver
  GetAllDrivers(): Observable<IDriverResponse> {
    return this._ApiConfigService.getReq(`v1/BasicData/GetAllDrivers`);
  }
  CreateOrUpdateDriver(request: IDriverRequest): Observable<IRequestStatus> {
    request.id || delete request.id;
    return this._ApiConfigService.postReq(
      `v1/BasicData/ADDEditDriver`,
      request
    );
  }
  DeleteDriver(DriverID: number): Observable<IRequestStatus> {
    let params = new HttpParams().set("DriverID", DriverID);
    return this._ApiConfigService.deleteReq(
      `v1/BasicData/DeleteDriver`,
      params
    );
  }

  // governorate
  GetALLGovernorates(): Observable<IGovernorateResponse> {
    return this._ApiConfigService.getReq(`v1/BasicData/GetALLGovernorates`);
  }
  CreateOrUpdateGovernorate(
    request: IGovernorateRequest
  ): Observable<IRequestStatus> {
    let params = new HttpParams()
      .set("ID", request.ID || "")
      .set("Name", request.Name);
    request.ID || (params = params.delete("ID"));
    return this._ApiConfigService.postReq(
      `v1/BasicData/ADDEditGovernorate`,
      "",
      params
    );
  }
  DeleteGovernorate(GovernorateID: number): Observable<IRequestStatus> {
    let params = new HttpParams().set("GovernorateID", GovernorateID);
    return this._ApiConfigService.deleteReq(
      `v1/BasicData/DeleteGovernorate`,
      params
    );
  }

  // area
  GetALlAreas(): Observable<IAreaResponse> {
    return this._ApiConfigService.getReq(`v1/BasicData/GetALlAreas`);
  }
  CreateOrUpdateArea(request: IAreaRequest): Observable<IRequestStatus> {
    request.id || delete request.id;
    return this._ApiConfigService.postReq(`v1/BasicData/ADDEditArea`, request);
  }
  DeleteArea(AreaID: number): Observable<IRequestStatus> {
    let params = new HttpParams().set("AreaID", AreaID);
    return this._ApiConfigService.deleteReq(`v1/BasicData/DeleteArea`, params);
  }

  // city
  GetALlCities(): Observable<ICityResponse> {
    return this._ApiConfigService.getReq(`v1/BasicData/GetALlCities`);
  }
  CreateOrUpdateCity(request: ICityRequest): Observable<IRequestStatus> {
    request.id || delete request.id;
    return this._ApiConfigService.postReq(`v1/BasicData/ADDEditCites`, request);
  }
  DeleteCity(cityid: number): Observable<IRequestStatus> {
    let params = new HttpParams().set("cityid", cityid);
    return this._ApiConfigService.deleteReq(`v1/BasicData/DeleteCity`, params);
  }
}
