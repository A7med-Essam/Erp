import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiConfigService } from "../core/api-config.service";
import { IMEAL_TYPE_RESPONSE } from "../interfaces/meal-type.interface";

@Injectable({
  providedIn: "root",
})
export class MealTypeService {
  constructor(private _ApiConfigService: ApiConfigService) {}

  GetMealsTypes(PlanID: number): Observable<IMEAL_TYPE_RESPONSE> {
    return this._ApiConfigService.getReq(
      `v1/CreateSubscriptions/GetMealsTypes?PlanID=${PlanID}`
    );
  }
}
