import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, of, catchError } from "rxjs";
import * as fromActions from "./customerAddress.action";
import { CustomerService } from "src/app/services/customer.service";

@Injectable()
export class CustomerAddressEffect {
  constructor(
    private actions$: Actions,
    private _CustomerService: CustomerService
  ) {}

  Effect = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.GET_CUSTOMER_ADDRESS_START),
      exhaustMap((action) =>
        this._CustomerService.GetcustomerAdress(action.CustomerID).pipe(
          map((res) =>
            fromActions.GET_CUSTOMER_ADDRESS_SUCCESS({
              data: res,
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              fromActions.GET_CUSTOMER_ADDRESS_FAILED({
                error: error,
              })
            )
          )
        )
      )
    )
  );
}
