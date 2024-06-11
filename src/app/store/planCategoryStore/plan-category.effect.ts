import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, of, catchError } from "rxjs";
import * as fromActions from "./plan-category.action";
import { PlanCategoryService } from "src/app/services/plan-category.service";

@Injectable()
export class PlanCategoryEffect {
  constructor(
    private actions$: Actions,
    private _PlanCategoryService: PlanCategoryService
  ) {}

  Effect = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.GET_PLAN_CATEGORY_START),
      exhaustMap((action) =>
        this._PlanCategoryService.GetPlansCategory().pipe(
          map((res) =>
            fromActions.GET_PLAN_CATEGORY_SUCCESS({ data: res })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              fromActions.GET_PLAN_CATEGORY_FAILED({ error: error })
            )
          )
        )
      )
    )
  );
}
