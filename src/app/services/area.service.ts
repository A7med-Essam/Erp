import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiConfigService } from "../core/api-config.service";
import { IAreaResponse } from "../interfaces/area.interface";

@Injectable({
  providedIn: "root",
})
export class AreaService {
  constructor(private _ApiConfigService: ApiConfigService) {}

  GetAreas(): Observable<IAreaResponse> {
    return this._ApiConfigService.getReq(`v1/Customers/GetAreas`);
  }
}
