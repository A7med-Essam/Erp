import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, of, catchError } from "rxjs";
import * as fromActions from "./activity.action";
import { DashboardService } from "src/app/services/dashboard.service";

@Injectable()
export class ActivityEffect {
  constructor(
    private actions$: Actions,
    private _DashboardService: DashboardService
  ) {}

  Effect = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.GET_ACTIVITY_START),
      exhaustMap((action) =>
        this._DashboardService.GetLastActivity().pipe(
          map((res) => fromActions.GET_ACTIVITY_SUCCESS({ data: res })),
          catchError((error: HttpErrorResponse) =>
            of(fromActions.GET_ACTIVITY_FAILED({ error: error }))
          )
        )
      )
    )
  );
}
