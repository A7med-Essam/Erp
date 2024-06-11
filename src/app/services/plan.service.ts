import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ApiConfigService } from "../core/api-config.service";
import {
  IGENERATE_PLAN_REQUEST,
  IGENERATE_PLAN_RESPONSE,
  IPLAN_RESPONSE,
} from "../interfaces/plan.interface";
import {
  IGeneratePlanRequest,
  ICreatePlanResponse,
  IFullMealTypeResponse,
  IFullPlanDaysResponse,
  IFullPlanResponse,
  IAddPlanRequest,
  IFullPlan,
} from "../interfaces/allPlan.interface";
import { IRequestStatus } from "../store/appStore";
import { HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class PlanService {
  constructor(private _ApiConfigService: ApiConfigService) {}
  plan = new BehaviorSubject<IFullPlan | null>(null);
  GetPlans(PlanCategoryID: number): Observable<IPLAN_RESPONSE> {
    return this._ApiConfigService.getReq(
      `v1/CreateSubscriptions/GetPlans?PlanCategoryID=${PlanCategoryID}`
    );
  }

  GeneratePlan(
    plan: IGENERATE_PLAN_REQUEST
  ): Observable<IGENERATE_PLAN_RESPONSE> {
    return this._ApiConfigService.postReq(
      `v1/CreateSubscriptions/GeneratePlan`,
      plan
    );
  }

  // ================== Get All Plans ===================
  GetAllPlans(): Observable<IFullPlanResponse> {
    return this._ApiConfigService.getReq(`v1/Plans/GetAllPlans`);
  }
  GetMealsType(): Observable<IFullMealTypeResponse> {
    return this._ApiConfigService.getReq(`v1/Plans/GetMealsType`);
  }
  GetPlanDays(): Observable<IFullPlanDaysResponse> {
    return this._ApiConfigService.getReq(`v1/Plans/GetPlanDays`);
  }
  CreatePlan(request: IGeneratePlanRequest): Observable<ICreatePlanResponse> {
    return this._ApiConfigService.postReq(`v1/Plans/CreatePlan`, request);
  }

  AddEditPlans(request: IAddPlanRequest): Observable<IRequestStatus> {
    return this._ApiConfigService.postReq(`v1/Plans/AddEditPlans`, request);
  }

  deletePlan(id: number): Observable<IRequestStatus> {
    let params = new HttpParams().set("id", id);
    return this._ApiConfigService.deleteReq(`v1/Plans/deletePlan`, params);
  }
}
