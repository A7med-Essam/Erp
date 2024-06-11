import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, of, catchError } from "rxjs";
import * as fromActions from "./subscription.action";
import { SubscriptionService } from "src/app/services/subscription.service";

@Injectable()
export class SubscriptionEffect {
  constructor(
    private actions$: Actions,
    private _SubscriptionService: SubscriptionService
  ) {}

  Effect = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.GET_ALL_SUBSCRIPTIONS_START),
      exhaustMap((action) =>
        this._SubscriptionService.GetAllSubscriptions(action.data).pipe(
          map((res) => fromActions.GET_ALL_SUBSCRIPTIONS_SUCCESS({ data: res })),
          catchError((error: HttpErrorResponse) =>
            of(fromActions.GET_ALL_SUBSCRIPTIONS_FAILED({ error: error }))
          )
        )
      )
    )
  );
}
