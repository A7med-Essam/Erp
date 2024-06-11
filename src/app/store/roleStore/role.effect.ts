import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, of, catchError } from "rxjs";
import * as fromActions from "./role.action";
import { IdentityService } from "src/app/services/identity.service";

@Injectable()
export class RoleEffect {
  constructor(
    private actions$: Actions,
    private _IdentityService: IdentityService
  ) {}

  Effect = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.GET_ROLE_START),
      exhaustMap((action) =>
        this._IdentityService.getRoles().pipe(
          map((res) => fromActions.GET_ROLE_SUCCESS({ data: res })),
          catchError((error: HttpErrorResponse) =>
            of(fromActions.GET_ROLE_FAILED({ error: error }))
          )
        )
      )
    )
  );
}
