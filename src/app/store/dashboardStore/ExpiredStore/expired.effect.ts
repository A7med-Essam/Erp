import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, of, catchError } from "rxjs";
import * as fromActions from "./expired.action";
import { DashboardService } from "src/app/services/dashboard.service";

@Injectable()
export class ExpiredEffect {
  constructor(
    private actions$: Actions,
    private _DashboardService: DashboardService
  ) {}

  Effect = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.GET_EXPIRED_START),
      exhaustMap((action) =>
        this._DashboardService.GetExpiredToday().pipe(
          map((res) => fromActions.GET_EXPIRED_SUCCESS({ data: res })),
          catchError((error: HttpErrorResponse) =>
            of(
              fromActions.GET_EXPIRED_FAILED({
                error: error,
              })
            )
          )
        )
      )
    )
  );
}
