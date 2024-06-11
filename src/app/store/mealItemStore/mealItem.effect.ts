import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, of, catchError } from "rxjs";
import * as fromActions from "./mealItem.action";
import { ActionsService } from "src/app/services/actions.service";

@Injectable()
export class MealItemEffect {
  constructor(
    private actions$: Actions,
    private _ActionsService: ActionsService
  ) {}

  Effect = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.GET_MEAL_ITEM_START),
      exhaustMap((action) =>
        this._ActionsService.GetMealsItems(action.data).pipe(
          map((res) =>
            fromActions.GET_MEAL_ITEM_SUCCESS({ data: res })
          ),
          catchError((error: HttpErrorResponse) =>
            of(fromActions.GET_MEAL_ITEM_FAILED({ error: error }))
          )
        )
      )
    )
  );
}
