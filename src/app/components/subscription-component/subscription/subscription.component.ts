import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatTableModule } from "@angular/material/table";
import { Router, RouterModule } from "@angular/router";
import { Store } from "@ngrx/store";
import { FeatherModule } from "angular-feather";
import { ActionEnum } from "src/app/enums/action.enum";
import { ColumnTypeEnum } from "src/app/enums/columns.enum";
import { PERMISSIONS } from "src/app/enums/permission.enum";
import { IPaginateOptions } from "src/app/interfaces/paginator.interface";
import { ISubscriptionInfo } from "src/app/interfaces/subscription.interface";
import { IActions, TableComponent } from "src/app/pages/table/table.component";
import { AppService } from "src/app/services/app.service";
import { CustomerService } from "src/app/services/customer.service";
import { GuardService } from "src/app/services/guard.service";
import { PermissionService } from "src/app/services/permission.service";
import { SubscriptionService } from "src/app/services/subscription.service";
import { IExportRequest } from "src/app/store/appStore";
import { GET_ALL_SUBSCRIPTIONS_START } from "src/app/store/subscriptionStore/subscription.action";
import { allSubscriptionSelector } from "src/app/store/subscriptionStore/subscription.selector";

@Component({
  selector: "app-subscription",
  templateUrl: "./subscription.component.html",
  styleUrls: ["./subscription.component.scss"],
  standalone: true,
  imports: [
    MatTableModule,
    TableComponent,
    MatCardModule,
    FeatherModule,
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    RouterModule,
    MatDatepickerModule,
    FormsModule,
    MatSlideToggleModule
  ],
})
export class SubscriptionComponent implements OnInit {
  columns = [
    {
      columnDef: "subscriptionsID",
      header: "SID",
      cell: (element: ISubscriptionInfo) => `${element?.subscriptionsID}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "customerID",
      header: "CID",
      cell: (element: ISubscriptionInfo) => `${element?.customerID}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "customerName",
      header: "Customer Name",
      cell: (element: ISubscriptionInfo) => `${element?.customerName}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "driver",
      header: "Driver",
      cell: (element: ISubscriptionInfo) => `${element?.driver}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "startDate",
      header: "Start Date",
      cell: (element: ISubscriptionInfo) => `${element?.startDate}`,
      display: false,
      type: ColumnTypeEnum.date,
    },
    {
      columnDef: "subscriptionStatus",
      header: "Subscription Status",
      cell: (element: ISubscriptionInfo) => `${element?.subscriptionStatus}`,
      display: true,
      type: ColumnTypeEnum.badge,
    },
    {
      columnDef: "plan",
      header: "Plan",
      cell: (element: ISubscriptionInfo) => `${element?.plan}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "createDate",
      header: "Create Date",
      cell: (element: ISubscriptionInfo) => `${element?.createDate}`,
      display: true,
      type: ColumnTypeEnum.date,
    },
    {
      columnDef: "remaingDays",
      header: "Remaing Days",
      cell: (element: ISubscriptionInfo) => `${element?.remaingDays}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "lastDeliveryDay",
      header: "Last Delivery Day",
      cell: (element: ISubscriptionInfo) => `${element?.lastDeliveryDay}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "durations",
      header: "Durations",
      cell: (element: ISubscriptionInfo) => `${element?.durations}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "deliveryDays",
      header: "Delivery Days",
      cell: (element: ISubscriptionInfo) => `${element?.deliveryDays}`,
      display: false,
      type: ColumnTypeEnum.format,
    },
    {
      columnDef: "mealTypes",
      header: "Meal Types",
      cell: (element: ISubscriptionInfo) => `${element?.mealTypes}`,
      display: false,
      type: ColumnTypeEnum.format,
    },
    {
      columnDef: "phone",
      header: "Phone",
      cell: (element: ISubscriptionInfo) => `${element?.phone}`,
      display: true,
      type: ColumnTypeEnum.format,
    },
    {
      columnDef: "adress",
      header: "Adress",
      cell: (element: ISubscriptionInfo) => `${element?.adress}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "kotsid",
      header: "KOT SID",
      cell: (element: ISubscriptionInfo) => `${element?.kotsid}`,
      display: true,
      type: ColumnTypeEnum.text,
    }
  ];
  Permissions = this._PermissionService.Permissions;
  DateFrom: string = "";
  DateTo: string = "";
  phone: string = "";
  sid: string = "";
  oldSid: string = "";
  TABLE_DATA = toSignal(this._Store.select(allSubscriptionSelector));
  constructor(
    private _Store: Store,
    private _SubscriptionService: SubscriptionService,
    private _CustomerService: CustomerService,
    private _Router: Router,
    private _PermissionService: PermissionService,
    private _AppService: AppService
  ) {}

  ngOnInit(): void {
    this.GetData();
  }

  GetData(Options: IPaginateOptions = { pageIndex: 0, pageSize: 10 }) {
    if (!this.TABLE_DATA()?.data) {
      Options.pageIndex++;
      this._Store.dispatch(GET_ALL_SUBSCRIPTIONS_START({ data: Options }));
    }
  }

  Paginate(Options: IPaginateOptions = { pageIndex: 0, pageSize: 10 }) {
    Options.pageIndex++;
    this._Store.dispatch(
      GET_ALL_SUBSCRIPTIONS_START({
        data: {
          ...Options,
          from: this.DateFrom
            ? new Date(this.DateFrom).toLocaleDateString("en-CA")
            : "",
          to: this.DateTo
            ? new Date(this.DateTo).toLocaleDateString("en-CA")
            : "",
        },
      })
    );
  }

  showDetails(row: ISubscriptionInfo) {
    this._SubscriptionService.currentSID.next(row.subscriptionsID.toString());
    this._Router.navigate(["/manage-subscriptions"]);
  }

  createSubscription(row: ISubscriptionInfo) {
    if (this.Permissions.Subscriptions.Create) {
      this._SubscriptionService.SELECTED_SUBSCRIPTION.set(row);
      this._CustomerService.SELECTED_CUSTOMER.set(null);
      this._Router.navigate(["./create-subscription"]);
    }
  }

  toggleSID: boolean = false;
  filter() {
    const data = {
      pageIndex: 0,
      pageSize: 10,
      Phone: this.phone,
      Sid: this.sid,
      oldSid: this.oldSid,
      from: this.DateFrom
        ? new Date(this.DateFrom).toLocaleDateString("en-CA")
        : "",
      to: this.DateTo ? new Date(this.DateTo).toLocaleDateString("en-CA") : "",
    };
    this._Store.dispatch(GET_ALL_SUBSCRIPTIONS_START({ data }));
    this.sid = "";
    this.phone = "";
    this.oldSid = "";
  }

  reset() {
    this.DateFrom = "";
    this.DateTo = "";
    this.sid = "";
    this.oldSid = "";
    this.phone = "";
    this.filter();
  }

  actions: IActions[] = [
    {
      action: ActionEnum.actions,
      permission: this.Permissions.Subscriptions.View,
      icon: "stars",
      label: "Actions",
    },
    {
      action: ActionEnum.createSubscription,
      permission: this.Permissions.Subscriptions.Create,
      icon: "bookmark",
      label: "Create Subscription",
    },
  ];

  // ============== EXPORT ================
  export() {
    if (this.Permissions.Subscriptions.Export) {
      const request: IExportRequest = {
        from: this.DateFrom
          ? new Date(this.DateFrom).toLocaleDateString("en-CA")
          : "",
        to: this.DateTo
          ? new Date(this.DateTo).toLocaleDateString("en-CA")
          : "",
        body: [],
      };
      this._SubscriptionService.Export(request).subscribe({
        next: (res) => {
          this._AppService.downloadBase64File(res.data);
        },
      });
    }
  }
}
