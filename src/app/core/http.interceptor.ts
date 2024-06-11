import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { GuardService } from "../services/guard.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _GuardService: GuardService) {}
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const currentUrlAddress = window.location.href;
    const baseUrl = request.url;
    const country = currentUrlAddress.split("dashboard.")[1].split(".")[0];

    const modifiedRequest = request.clone({
      url: baseUrl.split("country")[0] + country + baseUrl.split("country")[1],
      headers: request.headers
        .set(
          "Authorization",
          `Bearer ${this._GuardService.getUser()?.data?.token}`
        )
        .set("content-type", "application/json"),
    });
    return next.handle(modifiedRequest);
  }
}
