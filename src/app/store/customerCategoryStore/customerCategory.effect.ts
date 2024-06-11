import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, of, catchError } from "rxjs";
import * as fromActions from "./customerCategory.action";
import { CustomerService } from "src/app/services/customer.service";

@Injectable()
export class CustomerCategoryEffect {
  constructor(
    private actions$: Actions,
    private _CustomerService: CustomerService
  ) {}

  Effect = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.GET_CUSTOMER_CATEGORY_START),
      exhaustMap((action) =>
        this._CustomerService.GetCustomersCategory().pipe(
          map((res) =>
            fromActions.GET_CUSTOMER_CATEGORY_SUCCESS({
              data: res,
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              fromActions.GET_CUSTOMER_CATEGORY_FAILED({
                error: error,
              })
            )
          )
        )
      )
    )
  );
}
