import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiConfigService } from "../core/api-config.service";
import { IDELIVERY_DAY_RESPONSE } from "../interfaces/delivery-day.interface";

@Injectable({
  providedIn: "root",
})
export class DeliveryDayService {
  constructor(private _ApiConfigService: ApiConfigService) {}

  GetDeliveryDays(): Observable<IDELIVERY_DAY_RESPONSE> {
    return this._ApiConfigService.getReq(
      `v1/CreateSubscriptions/GetDeliveryDays`
    );
  }
}
