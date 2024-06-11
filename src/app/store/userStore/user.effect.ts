import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, of, catchError } from "rxjs";
import * as fromActions from "./user.action";
import { IdentityService } from "src/app/services/identity.service";

@Injectable()
export class UserEffect {
  constructor(
    private actions$: Actions,
    private _IdentityService: IdentityService
  ) {}

  Effect = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.GET_USER_START),
      exhaustMap((action) =>
        this._IdentityService.getUsers().pipe(
          map((res) => fromActions.GET_USER_SUCCESS({ data: res })),
          catchError((error: HttpErrorResponse) =>
            of(fromActions.GET_USER_FAILED({ error: error }))
          )
        )
      )
    )
  );
}
