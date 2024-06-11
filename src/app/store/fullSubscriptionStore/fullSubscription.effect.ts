import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, of, catchError } from "rxjs";
import * as fromActions from "./fullSubscription.action";
import { SubscriptionService } from "src/app/services/subscription.service";

@Injectable()
export class FullSubscriptionEffect {
  constructor(
    private actions$: Actions,
    private _SubscriptionService: SubscriptionService
  ) {}

  Effect = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.GET_FULL_SUBSCRIPTIONS_START),
      exhaustMap((action) =>
        this._SubscriptionService.GetFullDataByPhone(action.data).pipe(
          map((res) =>
            fromActions.GET_FULL_SUBSCRIPTIONS_SUCCESS({
              data: res,
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              fromActions.GET_FULL_SUBSCRIPTIONS_FAILED({
                error: error,
              })
            )
          )
        )
      )
    )
  );
}
