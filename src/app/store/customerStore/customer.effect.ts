import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, of, catchError, tap, withLatestFrom } from "rxjs";
import * as fromActions from "./customer.action";
import { CustomerService } from "src/app/services/customer.service";
import { select, Store } from "@ngrx/store";
import { customerSelector } from "./customer.selector";
import { MatSnackBar } from "@angular/material/snack-bar";
import { snackBarConfig } from "src/app/models/MatSnackBarConfig";

@Injectable()
export class CustomerEffect {
  constructor(
    private actions$: Actions,
    private _CustomerService: CustomerService,
    private _Store: Store,
    private _snackBar: MatSnackBar
  ) {}

  customerEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.GET_CUSTOMER_START),
      exhaustMap((action) =>
        this._CustomerService.GetAllCustomers(action.data).pipe(
          map((res) => fromActions.GET_CUSTOMER_SUCCESS({ data: res })),
          catchError((error: HttpErrorResponse) =>
            of(fromActions.GET_CUSTOMER_FAILED({ error: error }))
          )
        )
      )
    )
  );

  deleteCustomerEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.DELETE_CUSTOMER_START),
      withLatestFrom(this._Store.pipe(select(customerSelector))),
      exhaustMap((action, currentCustomerState) =>
        this._CustomerService.DeleteCustomer(action[0].customerID).pipe(
          map((res) =>
            fromActions.DELETE_CUSTOMER_SUCCESS({ data: res })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              fromActions.DELETE_CUSTOMER_FAILED({ error: error })
            ).pipe(
              tap((res) => {
                this._Store.dispatch(
                  fromActions.GET_CUSTOMER_START({
                    data: { pageIndex: 0, pageSize: 10 },
                  })
                );
              })
            )
          )
        )
      )
    )
  );

  createCustomerEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.CREATE_CUSTOMER_START),
      exhaustMap((action) =>
        this._CustomerService.AddEditCustomer(action.data).pipe(
          tap((res) => {
            if (!res.succeeded) {
              this._snackBar.open(
                res.messages.join(" , "),
                "Failed",
                snackBarConfig
              );
            } else {
              this._Store.dispatch(
                fromActions.GET_CUSTOMER_START({
                  data: { pageIndex: 0, pageSize: 10 },
                })
              );
            }
          }),
          map((res) =>
            fromActions.CREATE_CUSTOMER_SUCCESS({ data: res })
          ),
          catchError((error: HttpErrorResponse) =>
            of(fromActions.CREATE_CUSTOMER_FAILED({ error: error }))
          )
        )
      )
    )
  );
}
