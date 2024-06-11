import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, of, catchError } from "rxjs";
import * as fromActions from "./mealType.action";
import { MealTypeService } from "src/app/services/meal-type.service";

@Injectable()
export class MealTypeEffect {
  constructor(
    private actions$: Actions,
    private _MealTypeService: MealTypeService
  ) {}

  Effect = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.GET_MEAL_TYPE_START),
      exhaustMap((action) =>
        this._MealTypeService.GetMealsTypes(action.PlanID).pipe(
          map((res) =>
            fromActions.GET_MEAL_TYPE_SUCCESS({ data: res })
          ),
          catchError((error: HttpErrorResponse) =>
            of(fromActions.GET_MEAL_TYPE_FAILED({ error: error }))
          )
        )
      )
    )
  );
}
