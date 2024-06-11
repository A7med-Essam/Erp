import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { GuardService } from "../services/guard.service";
import { snackBarConfig } from "../models/MatSnackBarConfig";

@Injectable({
  providedIn: "root",
})
export class PermissionGuard implements CanActivate {
  constructor(
    private _GuardService: GuardService,
    private _Router: Router,
    private _snackBar: MatSnackBar
  ) {}



  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // if (this._GuardService.isSuperAdmin()) return true;
    if (this._GuardService.getPermissionStatus(route.data["permission"][0]))
      return true;
    this._Router.navigate(["./home"]);
    this._snackBar.open(
      "You don't have permission to access this page",
      "Unauthorized",
      snackBarConfig
    );
    return false;
  }
}

