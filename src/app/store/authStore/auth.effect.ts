import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType, OnInitEffects } from "@ngrx/effects";
import { exhaustMap, map, of, catchError, tap } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import * as fromActions from "./auth.action";
import { Router } from "@angular/router";
import { LocalService } from "src/app/services/local.service";
import { ILoginResponse } from "src/app/interfaces/auth.interface";
import { ApiConfigService } from "src/app/core/api-config.service";
import { PermissionService } from "src/app/services/permission.service";

@Injectable()
export class AuthEffect implements OnInitEffects {
  constructor(
    private actions$: Actions,
    private _AuthService: AuthService,
    private _Router: Router,
    private _LocalService: LocalService,
    private _ApiConfigService: ApiConfigService,
    private _PermissionService: PermissionService,
  ) {}

  ngrxOnInitEffects() {
    const data: ILoginResponse =
      this._LocalService.getJsonValue("ERP_CREDENTIALS");
    return fromActions.LOGIN_SUCCESS({ data });
  }

  loginEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.LOGIN_START),
      exhaustMap((action) =>
        this._AuthService.signIn(action.data).pipe(
          map((res) => fromActions.LOGIN_SUCCESS({ data: res })),
          tap((res) => {
              this._ApiConfigService.lockScreen$.next(false);
              this._LocalService.setJsonValue("ERP_CREDENTIALS", res.data);
              const redirectUrl = this._AuthService.getRedirectUrl() || "/home";
              this._PermissionService.refreshPermissions();
              this._Router.navigateByUrl(redirectUrl);
              if (this._AuthService.getRedirectUrl()) {
                window.location.reload();
              }
              this._AuthService.setRedirectUrl(null);
          }),
          catchError((error: HttpErrorResponse) =>
            of(fromActions.LOGIN_FAILED({ error: error }))
          )
        )
      )
    )
  );

  logout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.LOGOUT_START),
        tap(() => {
          this._ApiConfigService.lockScreen$.next(false);
          this._LocalService.removeItem("ERP_CREDENTIALS");
          this._Router.navigate(["login"]);
        })
      ),
    { dispatch: false }
  );
}
