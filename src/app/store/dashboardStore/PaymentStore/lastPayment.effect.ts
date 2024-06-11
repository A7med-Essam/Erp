import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, of, catchError } from "rxjs";
import * as fromActions from "./lastPayment.action";
import { DashboardService } from "src/app/services/dashboard.service";

@Injectable()
export class LastPaymentEffect {
  constructor(
    private actions$: Actions,
    private _DashboardService: DashboardService
  ) {}

  Effect = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.GET_LAST_PAYMENT_START),
      exhaustMap((action) =>
        this._DashboardService.GetLastPayment().pipe(
          map((res) =>
            fromActions.GET_LAST_PAYMENT_SUCCESS({ data: res })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              fromActions.GET_LAST_PAYMENT_FAILED({
                error: error,
              })
            )
          )
        )
      )
    )
  );
}
