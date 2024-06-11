import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, of, catchError } from "rxjs";
import * as fromActions from "./log.action";
import { LogService } from "src/app/services/log.service";

@Injectable()
export class LogEffect {
  constructor(private actions$: Actions, private _LogService: LogService) {}

  Effect = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.GET_LOGS_START),
      exhaustMap((action) =>
        this._LogService.GetAllLogs(action.data).pipe(
          map((res) => fromActions.GET_LOGS_SUCCESS({ data: res })),
          catchError((error: HttpErrorResponse) =>
            of(fromActions.GET_LOGS_FAILED({ error: error }))
          )
        )
      )
    )
  );
}
