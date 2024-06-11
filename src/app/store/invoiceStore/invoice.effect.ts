import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, of, catchError } from "rxjs";
import * as fromActions from "./invoice.action";
import { InvoiceService } from "src/app/services/invoice.service";

@Injectable()
export class InvoiceEffect {
  constructor(
    private actions$: Actions,
    private _InvoiceService: InvoiceService
  ) {}

  Effect = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.GET_INVOICE_START),
      exhaustMap((action) =>
        this._InvoiceService.GetInvoices(action.data).pipe(
          map((res) => fromActions.GET_INVOICE_SUCCESS({ data: res })),
          catchError((error: HttpErrorResponse) =>
            of(fromActions.GET_INVOICE_FAILED({ error: error }))
          )
        )
      )
    )
  );
}
