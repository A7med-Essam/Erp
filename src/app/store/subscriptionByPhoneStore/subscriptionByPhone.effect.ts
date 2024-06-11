import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, of, catchError } from "rxjs";
import * as fromActions from "./subscriptionByPhone.action";
import { SubscriptionService } from "src/app/services/subscription.service";

@Injectable()
export class SubscriptionByPhoneEffect {
  constructor(
    private actions$: Actions,
    private _SubscriptionService: SubscriptionService
  ) {}

  Effect = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.GET_SUBSCRIPTIONS_BY_PHONE_START),
      exhaustMap((action) =>
        this._SubscriptionService.GetSubscriptionsByPhone(action.data).pipe(
          map((res) =>
            fromActions.GET_SUBSCRIPTIONS_BY_PHONE_SUCCESS({
              data: res,
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              fromActions.GET_SUBSCRIPTIONS_BY_PHONE_FAILED({
                error: error,
              })
            )
          )
        )
      )
    )
  );
}
