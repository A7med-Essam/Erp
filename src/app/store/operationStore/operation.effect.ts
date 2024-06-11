import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, of, catchError } from "rxjs";
import * as fromActions from "./operation.action";
import { OperationService } from "src/app/services/operation.service";

@Injectable()
export class OperationEffect {
  constructor(
    private actions$: Actions,
    private _OperationService: OperationService
  ) {}

  Effect = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.GET_OPERATIONS_START),
      exhaustMap((action) =>
        this._OperationService.GetOperations(action.data).pipe(
          map((res) =>
            fromActions.GET_OPERATIONS_SUCCESS({ data: res })
          ),
          catchError((error: HttpErrorResponse) =>
            of(fromActions.GET_OPERATIONS_FAILED({ error: error }))
          )
        )
      )
    )
  );
}
