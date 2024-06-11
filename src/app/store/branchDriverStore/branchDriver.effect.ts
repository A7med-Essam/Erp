import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, of, catchError } from "rxjs";
import * as fromActions from "./branchDriver.action";
import { BranchService } from "src/app/services/branch.service";

@Injectable()
export class BranchDriverEffect {
  constructor(
    private actions$: Actions,
    private _BranchService: BranchService
  ) {}

  Effect = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.GET_BRANCH_DRIVER_START),
      exhaustMap((action) =>
        this._BranchService.GetBranchiesDrivers().pipe(
          map((res) =>
            fromActions.GET_BRANCH_DRIVER_SUCCESS({ data: res })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              fromActions.GET_BRANCH_DRIVER_FAILED({ error: error })
            )
          )
        )
      )
    )
  );
}
