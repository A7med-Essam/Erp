import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, of, catchError } from "rxjs";
import * as fromActions from "./all-area.action";
import { LocationService } from "src/app/services/location.service";

@Injectable()
export class AllAreaEffect {
  constructor(private actions$: Actions, private _LocationService: LocationService) {}

  Effect = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.GET_ALL_AREA_START),
      exhaustMap((action) =>
        this._LocationService.GetALlAreas().pipe(
          map((res) => fromActions.GET_ALL_AREA_SUCCESS({ data: res })),
          catchError((error: HttpErrorResponse) =>
            of(fromActions.GET_ALL_AREA_FAILED({ error: error }))
          )
        )
      )
    )
  );
}
