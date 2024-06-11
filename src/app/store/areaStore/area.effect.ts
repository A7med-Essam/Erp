import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, of, catchError } from "rxjs";
import * as fromActions from "./area.action";
import { AreaService } from "src/app/services/area.service";

@Injectable()
export class AreaEffect {
  constructor(private actions$: Actions, private _AreaService: AreaService) {}

  Effect = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.GET_AREA_START),
      exhaustMap((action) =>
        this._AreaService.GetAreas().pipe(
          map((res) => fromActions.GET_AREA_SUCCESS({ data: res })),
          catchError((error: HttpErrorResponse) =>
            of(fromActions.GET_AREA_FAILED({ error: error }))
          )
        )
      )
    )
  );
}
