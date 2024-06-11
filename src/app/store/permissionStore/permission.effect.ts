import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, of, catchError } from "rxjs";
import * as fromActions from "./permission.action";
import { IdentityService } from "src/app/services/identity.service";

@Injectable()
export class PermissionEffect {
  constructor(
    private actions$: Actions,
    private _IdentityService: IdentityService
  ) {}

  Effect = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.GET_PERMISSION_START),
      exhaustMap((action) =>
        this._IdentityService.getPermissions().pipe(
          map((res) =>
            fromActions.GET_PERMISSION_SUCCESS({ data: res })
          ),
          catchError((error: HttpErrorResponse) =>
            of(fromActions.GET_PERMISSION_FAILED({ error: error }))
          )
        )
      )
    )
  );
}
