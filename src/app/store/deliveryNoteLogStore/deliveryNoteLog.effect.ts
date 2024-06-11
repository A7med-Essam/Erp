import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, of, catchError } from "rxjs";
import * as fromActions from "./deliveryNoteLog.action";
import { LogService } from "src/app/services/log.service";

@Injectable()
export class DeliveryNoteLogEffect {
  constructor(private actions$: Actions, private _LogService: LogService) {}

  Effect = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.GET_DELIVERY_NOTE_LOG_START),
      exhaustMap((action) =>
        this._LogService.GetDeilveryNotes(action.SID).pipe(
          map((res) =>
            fromActions.GET_DELIVERY_NOTE_LOG_SUCCESS({
              data: res,
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              fromActions.GET_DELIVERY_NOTE_LOG_FAILED({
                error: error,
              })
            )
          )
        )
      )
    )
  );
}
