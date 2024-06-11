import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, of, catchError } from "rxjs";
import * as fromActions from "./city.action";
import { LocationService } from "src/app/services/location.service";

@Injectable()
export class CityEffect {
  constructor(
    private actions$: Actions,
    private _LocationService: LocationService
  ) {}

  Effect = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.GET_CITY_START),
      exhaustMap((action) =>
        this._LocationService.GetALlCities().pipe(
          map((res) => fromActions.GET_CITY_SUCCESS({ data: res })),
          catchError((error: HttpErrorResponse) =>
            of(fromActions.GET_CITY_FAILED({ error: error }))
          )
        )
      )
    )
  );
}
