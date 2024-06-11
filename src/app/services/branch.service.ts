import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiConfigService } from "../core/api-config.service";
import {
  IBRANCH_DRIVER_RESPONSE,
  IBRANCH_RESPONSE,
} from "../interfaces/branch.interface";

@Injectable({
  providedIn: "root",
})
export class BranchService {
  constructor(private _ApiConfigService: ApiConfigService) {}

  GetAllBranchies(): Observable<IBRANCH_RESPONSE> {
    return this._ApiConfigService.getReq(
      `v1/CreateSubscriptions/GetAllBranchies`
    );
  }

  GetBranchiesDrivers(): Observable<IBRANCH_DRIVER_RESPONSE> {
    return this._ApiConfigService.getReq(
      `v1/CreateSubscriptions/GetBranchiesDrivers`
    );
  }
}
