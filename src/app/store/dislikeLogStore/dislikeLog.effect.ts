import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, of, catchError } from "rxjs";
import * as fromActions from "./dislikeLog.action";
import { LogService } from "src/app/services/log.service";

@Injectable()
export class DislikeLogEffect {
  constructor(private actions$: Actions, private _LogService: LogService) {}

  Effect = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.GET_DISLIKE_LOG_START),
      exhaustMap((action) =>
        this._LogService.GetDislikeLog(action.SID).pipe(
          map((res) =>
            fromActions.GET_DISLIKE_LOG_SUCCESS({ data: res })
          ),
          catchError((error: HttpErrorResponse) =>
            of(fromActions.GET_DISLIKE_LOG_FAILED({ error: error }))
          )
        )
      )
    )
  );
}
