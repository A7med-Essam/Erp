import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiConfigService } from "../core/api-config.service";
import { IPLAN_DAYS_RESPONSE } from "../interfaces/plan-days.interface";

@Injectable({
  providedIn: "root",
})
export class PlanDayService {
  constructor(private _ApiConfigService: ApiConfigService) {}

  GetPlanDays(PlanID: number): Observable<IPLAN_DAYS_RESPONSE> {
    return this._ApiConfigService.getReq(
      `v1/CreateSubscriptions/GetPlanDays?PlanID=${PlanID}`
    );
  }
}
