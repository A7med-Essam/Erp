import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, of, catchError } from "rxjs";
import * as fromActions from "./paymentType.action";
import { SubscriptionService } from "src/app/services/subscription.service";

@Injectable()
export class PaymentTypeEffect {
  constructor(
    private actions$: Actions,
    private _SubscriptionService: SubscriptionService
  ) {}

  Effect = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.GET_PAYMENT_TYPE_START),
      exhaustMap((action) =>
        this._SubscriptionService.GetPaymentType(action.data).pipe(
          map((res) =>
            fromActions.GET_PAYMENT_TYPE_SUCCESS({ data: res })
          ),
          catchError((error: HttpErrorResponse) =>
            of(fromActions.GET_PAYMENT_TYPE_FAILED({ error: error }))
          )
        )
      )
    )
  );
}
