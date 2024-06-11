import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, of, catchError } from "rxjs";
import * as fromActions from "./all-MealType.action";
import { PlanService } from "src/app/services/plan.service";

@Injectable()
export class AllMealTypeEffect {
  constructor(private actions$: Actions, private _PlanService: PlanService) {}

  Effect = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.GET_ALL_MEAL_TYPES_START),
      exhaustMap((action) =>
        this._PlanService.GetMealsType().pipe(
          map((res) => fromActions.GET_ALL_MEAL_TYPES_SUCCESS({ data: res })),
          catchError((error: HttpErrorResponse) =>
            of(fromActions.GET_ALL_MEAL_TYPES_FAILED({ error: error }))
          )
        )
      )
    )
  );
}
