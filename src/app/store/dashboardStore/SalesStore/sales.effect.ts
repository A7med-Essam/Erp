import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, of, catchError } from "rxjs";
import * as fromActions from "./sales.action";
import { DashboardService } from "src/app/services/dashboard.service";

@Injectable()
export class SalesEffect {
  constructor(
    private actions$: Actions,
    private _DashboardService: DashboardService
  ) {}

  Effect = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.GET_SALES_START),
      exhaustMap((action) =>
        this._DashboardService.GetSales().pipe(
          map((res) =>
            fromActions.GET_SALES_SUCCESS({ data: res })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              fromActions.GET_SALES_FAILED({
                error: error,
              })
            )
          )
        )
      )
    )
  );
}
