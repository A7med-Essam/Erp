import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, of, catchError } from "rxjs";
import * as fromActions from "./InvoiceLog.action";
import { LogService } from "src/app/services/log.service";

@Injectable()
export class InvoiceLogEffect {
  constructor(private actions$: Actions, private _LogService: LogService) {}

  Effect = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.GET_INVOICE_LOG_START),
      exhaustMap((action) =>
        this._LogService.GetInvoiceLog(action.SID).pipe(
          map((res) =>
            fromActions.GET_INVOICE_LOG_SUCCESS({ data: res })
          ),
          catchError((error: HttpErrorResponse) =>
            of(fromActions.GET_INVOICE_LOG_FAILED({ error: error }))
          )
        )
      )
    )
  );
}
