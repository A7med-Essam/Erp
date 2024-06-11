import { Injectable } from "@angular/core";
import { GuardService } from "./guard.service";
import { PERMISSIONS } from "../enums/permission.enum";
import { BehaviorSubject } from "rxjs";
import { IPermissions } from "../interfaces/permissions.interface";

@Injectable({
  providedIn: "root",
})
export class PermissionService {
  constructor(private _GuardService: GuardService) {
    this.permissionsSubject.next(this.PermissionObj);
  }
  private PermissionObj = this.initializePermissions();
  private permissionsSubject = new BehaviorSubject<IPermissions>(
    this.PermissionObj
  );

  private initializePermissions(): IPermissions {
    return {
      Customers: {
        View: this._GuardService.getPermissionStatus(
          PERMISSIONS.Customers.View
        ),
        Create: this._GuardService.getPermissionStatus(
          PERMISSIONS.Customers.Create
        ),
        Edit: this._GuardService.getPermissionStatus(
          PERMISSIONS.Customers.Edit
        ),
        Delete: this._GuardService.getPermissionStatus(
          PERMISSIONS.Customers.Delete
        ),
        Search: this._GuardService.getPermissionStatus(
          PERMISSIONS.Customers.Search
        ),
        Export: this._GuardService.getPermissionStatus(
          PERMISSIONS.Customers.Export
        ),
      },
      Roles: {
        View: this._GuardService.getPermissionStatus(PERMISSIONS.Roles.View),
        Create: this._GuardService.getPermissionStatus(
          PERMISSIONS.Roles.Create
        ),
        Edit: this._GuardService.getPermissionStatus(PERMISSIONS.Roles.Edit),
        Delete: this._GuardService.getPermissionStatus(
          PERMISSIONS.Roles.Delete
        ),
        Search: this._GuardService.getPermissionStatus(
          PERMISSIONS.Roles.Search
        ),
      },
      RoleClaims: {
        View: this._GuardService.getPermissionStatus(
          PERMISSIONS.RoleClaims.View
        ),
        Create: this._GuardService.getPermissionStatus(
          PERMISSIONS.RoleClaims.Create
        ),
        Edit: this._GuardService.getPermissionStatus(
          PERMISSIONS.RoleClaims.Edit
        ),
        Delete: this._GuardService.getPermissionStatus(
          PERMISSIONS.RoleClaims.Delete
        ),
        Search: this._GuardService.getPermissionStatus(
          PERMISSIONS.RoleClaims.Search
        ),
      },
      Subscriptions: {
        View: this._GuardService.getPermissionStatus(
          PERMISSIONS.Subscriptions.View
        ),
        Create: this._GuardService.getPermissionStatus(
          PERMISSIONS.Subscriptions.Create
        ),
        Edit: this._GuardService.getPermissionStatus(
          PERMISSIONS.Subscriptions.Edit
        ),
        Search: this._GuardService.getPermissionStatus(
          PERMISSIONS.Subscriptions.Search
        ),
        Export: this._GuardService.getPermissionStatus(
          PERMISSIONS.Subscriptions.Export
        ),
      },
      SubscriptionActions: {
        ChangeStatus: this._GuardService.getPermissionStatus(
          PERMISSIONS.SubscriptionActions.ChangeStatus
        ),
        Extend: this._GuardService.getPermissionStatus(
          PERMISSIONS.SubscriptionActions.Extend
        ),
        EditCustomerData: this._GuardService.getPermissionStatus(
          PERMISSIONS.SubscriptionActions.EditCustomerData
        ),
        Deduct: this._GuardService.getPermissionStatus(
          PERMISSIONS.SubscriptionActions.Deduct
        ),
        Renew: this._GuardService.getPermissionStatus(
          PERMISSIONS.SubscriptionActions.Renew
        ),
        Migrate: this._GuardService.getPermissionStatus(
          PERMISSIONS.SubscriptionActions.Migrate
        ),
        DeleteDays: this._GuardService.getPermissionStatus(
          PERMISSIONS.SubscriptionActions.DeleteDays
        ),
        ChangeDayState: this._GuardService.getPermissionStatus(
          PERMISSIONS.SubscriptionActions.ChangeDayState
        ),
        UpdateNutiration: this._GuardService.getPermissionStatus(
          PERMISSIONS.SubscriptionActions.UpdateNutiration
        ),
        ViewLog: this._GuardService.getPermissionStatus(
          PERMISSIONS.SubscriptionActions.ViewLog
        ),
        ViewDeliveryLog: this._GuardService.getPermissionStatus(
          PERMISSIONS.SubscriptionActions.ViewDeliveryLog
        ),
        ViewInvoiceLog: this._GuardService.getPermissionStatus(
          PERMISSIONS.SubscriptionActions.ViewInvoiceLog
        ),
        ViewDislikeLog: this._GuardService.getPermissionStatus(
          PERMISSIONS.SubscriptionActions.ViewDislikeLog
        ),
        ViewDeliveryNoteLog: this._GuardService.getPermissionStatus(
          PERMISSIONS.SubscriptionActions.ViewDeliveryNoteLog
        ),
        ChangeDeliveryDetails: this._GuardService.getPermissionStatus(
          PERMISSIONS.SubscriptionActions.ChangeDeliveryDetails
        ),
        ChangeDeliveryNotes: this._GuardService.getPermissionStatus(
          PERMISSIONS.SubscriptionActions.ChangeDeliveryNotes
        ),
        hold: this._GuardService.getPermissionStatus(
          PERMISSIONS.SubscriptionActions.hold
        ),
        UpdateNotes: this._GuardService.getPermissionStatus(
          PERMISSIONS.SubscriptionActions.UpdateNotes
        ),
        Active: this._GuardService.getPermissionStatus(
          PERMISSIONS.SubscriptionActions.Active
        ),
        ChangeMealTypes: this._GuardService.getPermissionStatus(
          PERMISSIONS.SubscriptionActions.ChangeMealTypes
        ),
        ChangeDeliveryDays: this._GuardService.getPermissionStatus(
          PERMISSIONS.SubscriptionActions.ChangeDeliveryDays
        ),
        CreateCustomMeal: this._GuardService.getPermissionStatus(
          PERMISSIONS.SubscriptionActions.CreateCustomMeal
        ),
        ChangeMeal: this._GuardService.getPermissionStatus(
          PERMISSIONS.SubscriptionActions.ChangeMeal
        ),
        ChangeStartDate: this._GuardService.getPermissionStatus(
          PERMISSIONS.SubscriptionActions.ChangeStartDate
        ),
        Restrict: this._GuardService.getPermissionStatus(
          PERMISSIONS.SubscriptionActions.Restrict
        ),
        Unrestrict: this._GuardService.getPermissionStatus(
          PERMISSIONS.SubscriptionActions.Unrestrict
        ),
        Dislike: this._GuardService.getPermissionStatus(
          PERMISSIONS.SubscriptionActions.Dislike
        ),
        DeleteDislike: this._GuardService.getPermissionStatus(
          PERMISSIONS.SubscriptionActions.DeleteDislike
        ),
        Merge: this._GuardService.getPermissionStatus(
          PERMISSIONS.SubscriptionActions.Merge
        ),
      },
      Invoices: {
        View: this._GuardService.getPermissionStatus(PERMISSIONS.Invoices.View),
        ViewDetails: this._GuardService.getPermissionStatus(
          PERMISSIONS.Invoices.ViewDetails
        ),
        Edit: this._GuardService.getPermissionStatus(PERMISSIONS.Invoices.Edit),
        Search: this._GuardService.getPermissionStatus(
          PERMISSIONS.Invoices.Search
        ),
        Export: this._GuardService.getPermissionStatus(
          PERMISSIONS.Invoices.Export
        ),
      },
      CustomersRetention: {
        View: this._GuardService.getPermissionStatus(
          PERMISSIONS.CustomersRetention.View
        ),
        Search: this._GuardService.getPermissionStatus(
          PERMISSIONS.CustomersRetention.Search
        ),
        Export: this._GuardService.getPermissionStatus(
          PERMISSIONS.CustomersRetention.Export
        ),
      },
      AllLog: {
        View: this._GuardService.getPermissionStatus(PERMISSIONS.AllLog.View),
        Search: this._GuardService.getPermissionStatus(
          PERMISSIONS.AllLog.Search
        ),
        Export: this._GuardService.getPermissionStatus(
          PERMISSIONS.AllLog.Export
        ),
      },
      Operations: {
        View: this._GuardService.getPermissionStatus(
          PERMISSIONS.Operations.View
        ),
        Search: this._GuardService.getPermissionStatus(
          PERMISSIONS.Operations.Search
        ),
        ChangeDeliveryState: this._GuardService.getPermissionStatus(
          PERMISSIONS.Operations.ChangeDeliveryState
        ),
        Export: this._GuardService.getPermissionStatus(
          PERMISSIONS.Operations.Export
        ),
      },
      Users: {
        View: this._GuardService.getPermissionStatus(PERMISSIONS.Users.View),
        Create: this._GuardService.getPermissionStatus(
          PERMISSIONS.Users.Create
        ),
        Edit: this._GuardService.getPermissionStatus(PERMISSIONS.Users.Edit),
        Delete: this._GuardService.getPermissionStatus(
          PERMISSIONS.Users.Delete
        ),
        Search: this._GuardService.getPermissionStatus(
          PERMISSIONS.Users.Search
        ),
      },
      SubscriptionManager: {
        View: this._GuardService.getPermissionStatus(
          PERMISSIONS.SubscriptionManager.View
        ),
        Search: this._GuardService.getPermissionStatus(
          PERMISSIONS.SubscriptionManager.Search
        ),
      },
      AutoDislike: {
        View: this._GuardService.getPermissionStatus(
          PERMISSIONS.AutoDislike.View
        ),
        Create: this._GuardService.getPermissionStatus(
          PERMISSIONS.AutoDislike.Create
        ),
        Edit: this._GuardService.getPermissionStatus(
          PERMISSIONS.AutoDislike.Edit
        ),
        Delete: this._GuardService.getPermissionStatus(
          PERMISSIONS.AutoDislike.Delete
        ),
        Search: this._GuardService.getPermissionStatus(
          PERMISSIONS.AutoDislike.Search
        ),
      },
      Area: {
        View: this._GuardService.getPermissionStatus(PERMISSIONS.Area.View),
        Create: this._GuardService.getPermissionStatus(PERMISSIONS.Area.Create),
        Edit: this._GuardService.getPermissionStatus(PERMISSIONS.Area.Edit),
        Delete: this._GuardService.getPermissionStatus(PERMISSIONS.Area.Delete),
        Search: this._GuardService.getPermissionStatus(PERMISSIONS.Area.Search),
      },
      Governorate: {
        View: this._GuardService.getPermissionStatus(
          PERMISSIONS.Governorate.View
        ),
        Create: this._GuardService.getPermissionStatus(
          PERMISSIONS.Governorate.Create
        ),
        Edit: this._GuardService.getPermissionStatus(
          PERMISSIONS.Governorate.Edit
        ),
        Delete: this._GuardService.getPermissionStatus(
          PERMISSIONS.Governorate.Delete
        ),
        Search: this._GuardService.getPermissionStatus(
          PERMISSIONS.Governorate.Search
        ),
      },
      City: {
        View: this._GuardService.getPermissionStatus(PERMISSIONS.City.View),
        Create: this._GuardService.getPermissionStatus(PERMISSIONS.City.Create),
        Edit: this._GuardService.getPermissionStatus(PERMISSIONS.City.Edit),
        Delete: this._GuardService.getPermissionStatus(PERMISSIONS.City.Delete),
        Search: this._GuardService.getPermissionStatus(PERMISSIONS.City.Search),
      },
      Driver: {
        View: this._GuardService.getPermissionStatus(PERMISSIONS.Driver.View),
        Create: this._GuardService.getPermissionStatus(
          PERMISSIONS.Driver.Create
        ),
        Edit: this._GuardService.getPermissionStatus(PERMISSIONS.Driver.Edit),
        Delete: this._GuardService.getPermissionStatus(
          PERMISSIONS.Driver.Delete
        ),
        Search: this._GuardService.getPermissionStatus(
          PERMISSIONS.Driver.Search
        ),
      },
      Plan: {
        View: this._GuardService.getPermissionStatus(PERMISSIONS.Plan.View),
        Create: this._GuardService.getPermissionStatus(
          PERMISSIONS.Plan.Create
        ),
        Edit: this._GuardService.getPermissionStatus(PERMISSIONS.Plan.Edit),
        Delete: this._GuardService.getPermissionStatus(
          PERMISSIONS.Plan.Delete
        ),
        Search: this._GuardService.getPermissionStatus(
          PERMISSIONS.Plan.Search
        ),
      }
    };
  }

  public refreshPermissions() {
    this.permissionsSubject.next(this.initializePermissions());
  }
  public get Permissions(): IPermissions {
    return this.permissionsSubject.value;
  }
}
