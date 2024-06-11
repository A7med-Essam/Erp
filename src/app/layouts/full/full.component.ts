import { Component } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { LOGIN_START, LOGOUT_START } from "src/app/store/authStore/auth.action";
import { ApiConfigService } from "src/app/core/api-config.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ISignInData } from "src/app/interfaces/auth.interface";
import { loginSelector } from "src/app/store/authStore/auth.selector";
import { IState } from "src/app/store/authStore/auth.reducer";
import { toSignal } from "@angular/core/rxjs-interop";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { MatSidenav } from "@angular/material/sidenav";
import { GuardService } from "src/app/services/guard.service";
import { PERMISSIONS } from "src/app/enums/permission.enum";
import { PermissionService } from "src/app/services/permission.service";

interface sidebarMenu {
  link: string;
  icon: string;
  menu: string;
  permission: boolean;
}

@Component({
  selector: "app-full",
  templateUrl: "./full.component.html",
  styleUrls: ["./full.component.scss"],
})
export class FullComponent {
  public displayLockScreen$: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );
  loginForm!: FormGroup;
  login$!: Observable<IState>;
  isSidebarOpened: boolean = true;
  currentYear = new Date().getFullYear();
  constructor(
    private breakpointObserver: BreakpointObserver,
    private _Store: Store,
    private _ApiConfigService: ApiConfigService,
    private _AuthService: AuthService,
    private _Router: Router,
    private _PermissionService: PermissionService,
    private _GuardService: GuardService
  ) {
    this.displayLockScreen$ = this._ApiConfigService.lockScreen$;
    this.login$ = _Store.select(loginSelector);
    this.createLoginForm();
  }

  toggleSidebar(drawer: MatSidenav) {
    drawer.toggle();
    this.isSidebarOpened = !this.isSidebarOpened;
  }

  goToLogin() {
    this._Store.dispatch(LOGOUT_START());
  }

  login(data: FormGroup) {
    if (data.valid) {
      this._AuthService.setRedirectUrl(this._Router.routerState.snapshot.url);
      this._Store.dispatch(LOGIN_START({ data: data.value }));
    }
  }

  createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(
        this._GuardService.getDecodedAccessToken()?.emailAddress,
        [Validators.required]
      ),
      password: new FormControl(null, [Validators.required]),
    });
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  logout() {
    this._Store.dispatch(LOGOUT_START());
  }

  sidebarMenu: sidebarMenu[] = [
    {
      link: "/home",
      icon: "home",
      menu: "Dashboard",
      permission: true,
    },
    {
      link: "/subscriptions",
      icon: "bookmark",
      permission: this._PermissionService.Permissions.Subscriptions.View,
      menu: "Subscriptions",
    },
    {
      link: "/manage-subscriptions",
      icon: "key",
      permission: this._PermissionService.Permissions.SubscriptionManager.View,
      menu: "Manage Subscriptions",
    },
    {
      link: "/customer",
      icon: "users",
      permission: this._PermissionService.Permissions.Customers.View,
      menu: "Customers",
    },
    {
      link: "/invoice",
      icon: "award",
      permission: this._PermissionService.Permissions.Invoices.View,
      menu: "Invoices",
    },
    {
      link: "/retention",
      icon: "zoom-in",
      permission: this._PermissionService.Permissions.CustomersRetention.View,
      menu: "Customer Retention",
    },
    {
      link: "/logs",
      icon: "file-text",
      permission: this._PermissionService.Permissions.AllLog.View,
      menu: "All Logs",
    },
    {
      link: "/operations",
      icon: "command",
      permission: this._PermissionService.Permissions.Operations.View,
      menu: "Operations",
    },
    {
      link: "/dislike",
      icon: "thumbs-down",
      permission: this._PermissionService.Permissions.AutoDislike.View,
      menu: "Dislikes",
    },
    {
      link: "/plans",
      icon: "calendar",
      permission: this._PermissionService.Permissions.Plan.View,
      menu: "Plans",
    },
    {
      link: "/governorate",
      icon: "map",
      permission: this._PermissionService.Permissions.Governorate.View,
      menu: "Governorate",
    },
    {
      link: "/city",
      icon: "navigation",
      permission: this._PermissionService.Permissions.City.View,
      menu: "City",
    },
    {
      link: "/area",
      icon: "map-pin",
      permission: this._PermissionService.Permissions.Area.View,
      menu: "Area",
    },
    {
      link: "/driver",
      icon: "truck",
      permission: this._PermissionService.Permissions.Driver.View,
      menu: "Drivers",
    },
    {
      link: "/users",
      icon: "at-sign",
      permission: this._PermissionService.Permissions.Users.View,
      menu: "Users",
    },
    {
      link: "/roles",
      icon: "layers",
      permission: this._PermissionService.Permissions.Roles.View,
      menu: "Roles",
    },
    // {
    //   link: "/claims",
    //   icon: "aperture",
    //   permission: this._PermissionService.Permissions.RoleClaims.View,
    //   menu: "Role Claims",
    // },
  ];
}
