import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, of, catchError } from "rxjs";
import * as fromActions from "./deliveryDay.action";
import { DeliveryDayService } from "src/app/services/delivery-day.service";

@Injectable()
export class DeliveryDayEffect {
  constructor(
    private actions$: Actions,
    private _DeliveryDayService: DeliveryDayService
  ) {}

  Effect = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.GET_DELIVERY_DAY_START),
      exhaustMap((action) =>
        this._DeliveryDayService.GetDeliveryDays().pipe(
          map((res) =>
            fromActions.GET_DELIVERY_DAY_SUCCESS({ data: res })
          ),
          catchError((error: HttpErrorResponse) =>
            of(fromActions.GET_DELIVERY_DAY_FAILED({ error: error }))
          )
        )
      )
    )
  );
}
