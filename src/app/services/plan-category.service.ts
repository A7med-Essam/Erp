import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiConfigService } from "../core/api-config.service";
import { IPLAN_CATEGORY_RESPONSE } from "../interfaces/plan-category.interface";

@Injectable({
  providedIn: "root",
})
export class PlanCategoryService {
  constructor(private _ApiConfigService: ApiConfigService) {}

  GetPlansCategory(): Observable<IPLAN_CATEGORY_RESPONSE> {
    return this._ApiConfigService.getReq(
      `v1/CreateSubscriptions/GetPlansCategory`
    );
  }
}
