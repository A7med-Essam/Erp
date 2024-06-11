import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, of, catchError } from "rxjs";
import * as fromActions from "./branch.action";
import { BranchService } from "src/app/services/branch.service";

@Injectable()
export class BranchEffect {
  constructor(
    private actions$: Actions,
    private _BranchService: BranchService
  ) {}

  Effect = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.GET_BRANCH_START),
      exhaustMap((action) =>
        this._BranchService.GetAllBranchies().pipe(
          map((res) => fromActions.GET_BRANCH_SUCCESS({ data: res })),
          catchError((error: HttpErrorResponse) =>
            of(fromActions.GET_BRANCH_FAILED({ error: error }))
          )
        )
      )
    )
  );
}
