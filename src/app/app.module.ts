// Modules
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FeatherModule } from "angular-feather";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { DemoFlexyModule } from "./demo-flexy-module";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DashboardModule } from "./dashboard/dashboard.module";
import { AuthInterceptor } from "./core/http.interceptor";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ngxUiLoaderConfig } from "./models/ngxUiLoaderConfig";
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { StoreModule } from "@ngrx/store";
import { OnlineStatusModule } from "ngx-online-status";

// NGRX
import { EffectsModule } from "@ngrx/effects";
import { APP_EFFECTS, APP_STORE } from "./store/appStore";

// Components
import { AppComponent } from "./app.component";
import { FullComponent } from "./layouts/full/full.component";
import { allIcons } from "angular-feather/icons";

@NgModule({
  declarations: [AppComponent, FullComponent],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FeatherModule.pick(allIcons),
    DemoFlexyModule,
    DashboardModule,
    FormsModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    StoreModule.forRoot(APP_STORE),
    EffectsModule.forRoot(APP_EFFECTS),
    ReactiveFormsModule,
    OnlineStatusModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
