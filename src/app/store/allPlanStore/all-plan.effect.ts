import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, of, catchError } from "rxjs";
import * as fromActions from "./all-plan.action";
import { PlanService } from "src/app/services/plan.service";

@Injectable()
export class AllPlanEffect {
  constructor(private actions$: Actions, private _PlanService: PlanService) {}

  Effect = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.GET_ALL_PLAN_START),
      exhaustMap((action) =>
        this._PlanService.GetAllPlans().pipe(
          map((res) => fromActions.GET_ALL_PLAN_SUCCESS({ data: res })),
          catchError((error: HttpErrorResponse) =>
            of(fromActions.GET_ALL_PLAN_FAILED({ error: error }))
          )
        )
      )
    )
  );
}
