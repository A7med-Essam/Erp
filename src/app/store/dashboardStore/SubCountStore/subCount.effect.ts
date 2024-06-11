import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, of, catchError } from "rxjs";
import * as fromActions from "./subCount.action";
import { DashboardService } from "src/app/services/dashboard.service";

@Injectable()
export class SubCountEffect {
  constructor(
    private actions$: Actions,
    private _DashboardService: DashboardService
  ) {}

  Effect = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.GET_SUBSCRIPTION_COUNT_START),
      exhaustMap((action) =>
        this._DashboardService.GetSubCounts().pipe(
          map((res) =>
            fromActions.GET_SUBSCRIPTION_COUNT_SUCCESS({ data: res })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              fromActions.GET_SUBSCRIPTION_COUNT_FAILED({
                error: error,
              })
            )
          )
        )
      )
    )
  );
}
