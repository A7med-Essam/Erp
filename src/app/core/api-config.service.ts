import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, finalize, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { GuardService } from "../services/guard.service";
import { IRequestStatus } from "../store/appStore";
import { snackBarConfig } from "../models/MatSnackBarConfig";

@Injectable({
  providedIn: "root",
})
export class ApiConfigService {
  constructor(
    private _router: Router,
    private _http: HttpClient,
    private _ngxService: NgxUiLoaderService,
    private _snackBar: MatSnackBar,
    private _GuardService: GuardService
  ) {}

  private makeRequest(
    method: string,
    url: string,
    body?: any,
    params?: HttpParams
  ): Observable<IRequestStatus> {
    this._ngxService.start();

    const request =
      method === "get"
        ? this._http.get<IRequestStatus>(environment.BaseUrl + url, { params })
        : method === "delete"
        ? this._http.delete<IRequestStatus>(environment.BaseUrl + url, {
            params,
          })
        : method === "put"
        ? this._http.put<IRequestStatus>(environment.BaseUrl + url, body, {
            params,
          })
        : this._http.post<IRequestStatus>(environment.BaseUrl + url, body, {
            params,
          });

    return request.pipe(
      tap((res: IRequestStatus) => {
        if (!res.succeeded) {
          throw new Error(res.messages?.join(", ") || "Request failed");
        }
      }),
      catchError((err) => {
        if (err.status === 401) {
          this.handleAuthentication();
        } else if (err.status === 500 || err.status === 0) {
          this._router.navigate(["./error"]);
          this._snackBar.open("Internal Server Error", "500", snackBarConfig);
        } else if (err.status === 400) {
          this._snackBar.open("Invalid Request", "ERROR", snackBarConfig);
        } else if (err.status === 403) {
          this._snackBar.open(
            "You don't have permission to access this page",
            "Unauthorized",
            snackBarConfig
          );
          this._router.navigate(["./home"]);
        } else {
          this._snackBar.open(err.message, "ERROR", snackBarConfig);
        }
        return throwError(() => err);
      }),
      finalize(() => {
        this._ngxService.stop();
      })
    );
  }

  getReq(url: string, params?: HttpParams): Observable<any> {
    return this.makeRequest("get", url, undefined, params);
  }

  deleteReq(url: string, params?: HttpParams): Observable<any> {
    return this.makeRequest("delete", url, undefined, params);
  }

  postReq(url: string, body: any, params?: HttpParams): Observable<any> {
    return this.makeRequest("post", url, body, params);
  }

  putReq(url: string, body: any, params?: HttpParams): Observable<any> {
    return this.makeRequest("put", url, body, params);
  }

  public lockScreen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  private handleAuthentication() {
    if (this._GuardService.getUser()) {
      this._snackBar.open(
        "Please login again.",
        "Session Expired",
        snackBarConfig
      );
      this.lockScreen$.next(true);
    } else {
      this._snackBar.open(
        "Authentication failed. Please try again.",
        "Authentication",
        snackBarConfig
      );
    }
  }
}
