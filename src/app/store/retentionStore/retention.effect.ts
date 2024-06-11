import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, of, catchError } from "rxjs";
import * as fromActions from "./retention.action";
import { CustomerService } from "src/app/services/customer.service";

@Injectable()
export class RetentionEffect {
  constructor(private actions$: Actions, private _CustomerService: CustomerService) {}

  Effect = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.GET_RETENTION_START),
      exhaustMap((action) =>
        this._CustomerService.GetCustomerRetention(action.data).pipe(
          map((res) => fromActions.GET_RETENTION_SUCCESS({ data: res })),
          catchError((error: HttpErrorResponse) =>
            of(fromActions.GET_RETENTION_FAILED({ error: error }))
          )
        )
      )
    )
  );
}
