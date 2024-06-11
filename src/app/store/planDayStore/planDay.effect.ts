import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, of, catchError } from "rxjs";
import * as fromActions from "./planDay.action";
import { PlanDayService } from "src/app/services/plan-day.service";

@Injectable()
export class PlanDayEffect {
  constructor(
    private actions$: Actions,
    private _PlanDayService: PlanDayService
  ) {}

  Effect = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.GET_PLAN_DAYS_START),
      exhaustMap((action) =>
        this._PlanDayService.GetPlanDays(action.PlanID).pipe(
          map((res) => fromActions.GET_PLAN_DAYS_SUCCESS({ data: res })),
          catchError((error: HttpErrorResponse) =>
            of(fromActions.GET_PLAN_DAYS_FAILED({ error: error }))
          )
        )
      )
    )
  );
}
