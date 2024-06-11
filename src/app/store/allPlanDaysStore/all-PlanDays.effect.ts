import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, of, catchError } from "rxjs";
import * as fromActions from "./all-PlanDays.action";
import { PlanService } from "src/app/services/plan.service";

@Injectable()
export class AllPlanDaysEffect {
  constructor(private actions$: Actions, private _PlanService: PlanService) {}

  Effect = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.GET_ALL_PLAN_DAYS_START),
      exhaustMap((action) =>
        this._PlanService.GetPlanDays().pipe(
          map((res) => fromActions.GET_ALL_PLAN_DAYS_SUCCESS({ data: res })),
          catchError((error: HttpErrorResponse) =>
            of(fromActions.GET_ALL_PLAN_DAYS_FAILED({ error: error }))
          )
        )
      )
    )
  );
}
