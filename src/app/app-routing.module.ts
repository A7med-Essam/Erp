import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddSubscriptionComponent } from "./components/subscription-component/add-subscription/add-subscription.component";
import { CustomerComponent } from "./components/customer-component/customer/customer.component";
import { ErrorComponent } from "./pages/error/error.component";
import { LoginComponent } from "./pages/login/login.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { SubscriptionManagerComponent } from "./components/subscription-component/subscription-manager/subscription-manager.component";
import { SubscriptionComponent } from "./components/subscription-component/subscription/subscription.component";
import { AuthGuard } from "./core/auth.guard";
import { PermissionGuard } from "./core/permission.guard";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { FullComponent } from "./layouts/full/full.component";
import { InvoiceComponent } from "./components/invoice-component/invoice/invoice.component";
import { CustomerRetentionComponent } from "./components/customer-component/customer-retention/customer-retention.component";
import { AllLogComponent } from "./components/log-component/all-log/all-log.component";
import { OperationsComponent } from "./components/operation-component/operations/operations.component";
import { UserComponent } from "./components/identity-component/user/user.component";
import { RoleComponent } from "./components/identity-component/role/role.component";
import { PermissionComponent } from "./components/identity-component/permission/permission.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { ForgotPasswordComponent } from "./pages/forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./pages/reset-password/reset-password.component";
import { PERMISSIONS } from "./enums/permission.enum";
import { DislikesComponent } from "./components/dislike-component/dislikes/dislikes.component";
import { GovernorateComponent } from "./components/location-component/governorate/governorate.component";
import { CityComponent } from "./components/location-component/city/city.component";
import { AreaComponent } from "./components/location-component/area/area.component";
import { DriverComponent } from "./components/location-component/driver/driver.component";
import { PlanComponent } from "./components/plan-component/plan/plan.component";
import { CreatePlanComponent } from "./components/plan-component/create-plan/create-plan.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "reset", component: ResetPasswordComponent },
  { path: "forgot", component: ForgotPasswordComponent },
  {
    path: "",
    component: FullComponent,
    children: [
      { path: "", redirectTo: "/home", pathMatch: "full" },
      { path: "home", component: DashboardComponent },
      {
        canActivate: [PermissionGuard],
        data: {
          permission: [PERMISSIONS.Customers.View],
        },
        path: "customer",
        component: CustomerComponent,
      },
      {
        canActivate: [PermissionGuard],
        data: {
          permission: [PERMISSIONS.Subscriptions.View],
        },
        path: "subscriptions",
        component: SubscriptionComponent,
      },
      {
        canActivate: [PermissionGuard],
        data: {
          permission: [PERMISSIONS.SubscriptionManager.View],
        },
        path: "manage-subscriptions",
        component: SubscriptionManagerComponent,
      },
      {
        canActivate: [PermissionGuard],
        data: {
          permission: [PERMISSIONS.Subscriptions.Create],
        },
        path: "create-subscription",
        component: AddSubscriptionComponent,
      },
      {
        canActivate: [PermissionGuard],
        data: {
          permission: [PERMISSIONS.Invoices.View],
        },
        path: "invoice",
        component: InvoiceComponent,
      },
      {
        canActivate: [PermissionGuard],
        data: {
          permission: [PERMISSIONS.CustomersRetention.View],
        },
        path: "retention",
        component: CustomerRetentionComponent,
      },
      {
        canActivate: [PermissionGuard],
        data: {
          permission: [PERMISSIONS.AllLog.View],
        },
        path: "logs",
        component: AllLogComponent,
      },
      {
        canActivate: [PermissionGuard],
        data: {
          permission: [PERMISSIONS.Operations.View],
        },
        path: "operations",
        component: OperationsComponent,
      },
      {
        canActivate: [PermissionGuard],
        data: {
          permission: [PERMISSIONS.Users.View],
        },
        path: "users",
        component: UserComponent,
      },
      {
        canActivate: [PermissionGuard],
        data: {
          permission: [PERMISSIONS.Roles.View],
        },
        path: "roles",
        component: RoleComponent,
      },
      // {
      //   canActivate: [PermissionGuard],
      //   data: {
      //     permission: [PERMISSIONS.RoleClaims.View],
      //   },
      //   path: "claims",
      //   component: PermissionComponent,
      // },
      {
        canActivate: [PermissionGuard],
        data: {
          permission: [PERMISSIONS.AutoDislike.View],
        },
        path: "dislike",
        component: DislikesComponent,
      },
      {
        canActivate: [PermissionGuard],
        data: {
          permission: [PERMISSIONS.Plan.View],
        },
        path: "plans",
        component: PlanComponent,
      },
      {
        canActivate: [PermissionGuard],
        data: {
          permission: [PERMISSIONS.Plan.Create],
        },
        path: "plans/create",
        component: CreatePlanComponent,
      },
      {
        canActivate: [PermissionGuard],
        data: {
          permission: [PERMISSIONS.Governorate.View],
        },
        path: "governorate",
        component: GovernorateComponent,
      },
      {
        canActivate: [PermissionGuard],
        data: {
          permission: [PERMISSIONS.City.View],
        },
        path: "city",
        component: CityComponent,
      },
      {
        canActivate: [PermissionGuard],
        data: {
          permission: [PERMISSIONS.Area.View],
        },
        path: "area",
        component: AreaComponent,
      },
      {
        canActivate: [PermissionGuard],
        data: {
          permission: [PERMISSIONS.Driver.View],
        },
        path: "driver",
        component: DriverComponent,
      },
      {
        path: "profile",
        component: ProfileComponent,
      },
    ],
    canActivate: [AuthGuard],
  },
  { path: "error", component: ErrorComponent, canActivate: [AuthGuard] },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
