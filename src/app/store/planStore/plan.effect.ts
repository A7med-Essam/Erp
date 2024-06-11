import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, of, catchError } from "rxjs";
import * as fromPlanActions from "./plan.action";
import { PlanService } from "src/app/services/plan.service";

@Injectable()
export class PlanEffect {
  constructor(private actions$: Actions, private _PlanService: PlanService) {}

  planEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPlanActions.GET_PLAN_START),
      exhaustMap((action) =>
        this._PlanService.GetPlans(action.PlanCategoryID).pipe(
          map((res) => fromPlanActions.GET_PLAN_SUCCESS({ data: res })),
          catchError((error: HttpErrorResponse) =>
            of(fromPlanActions.GET_PLAN_FAILED({ error: error }))
          )
        )
      )
    )
  );

  generatePlanEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPlanActions.GENERATE_PLAN_START),
      exhaustMap((action) =>
        this._PlanService.GeneratePlan(action.data).pipe(
          map((res) => fromPlanActions.GENERATE_PLAN_SUCCESS({ data: res })),
          catchError((error: HttpErrorResponse) =>
            of(fromPlanActions.GENERATE_PLAN_FAILED({ error: error }))
          )
        )
      )
    )
  );
}
