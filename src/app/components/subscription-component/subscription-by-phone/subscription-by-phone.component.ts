import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { FeatherModule } from "angular-feather";
import { ColumnTypeEnum } from "src/app/enums/columns.enum";
import { PERMISSIONS } from "src/app/enums/permission.enum";
import { ISubscription } from "src/app/interfaces/subscription.interface";
import { IActions, TableComponent } from "src/app/pages/table/table.component";
import { GuardService } from "src/app/services/guard.service";
import { PermissionService } from "src/app/services/permission.service";
import { SubscriptionService } from "src/app/services/subscription.service";
import { GET_SUBSCRIPTIONS_BY_PHONE_START } from "src/app/store/subscriptionByPhoneStore/subscriptionByPhone.action";
import { subscriptionByPhoneSelector } from "src/app/store/subscriptionByPhoneStore/subscriptionByPhone.selector";

@Component({
  selector: "app-subscription-by-phone",
  templateUrl: "./subscription-by-phone.component.html",
  styleUrls: ["./subscription-by-phone.component.scss"],
  standalone: true,
  imports: [
    MatTableModule,
    TableComponent,
    MatCardModule,
    FeatherModule,
    CommonModule,
  ],
})
export class SubscriptionByPhoneComponent {
  columns = [
    {
      columnDef: "createDate",
      header: "Create Date",
      cell: (element: ISubscription) => `${element?.createDate}`,
      display: false,
      type: ColumnTypeEnum.date,
    },
    {
      columnDef: "deliveryDays",
      header: "Delivery Days",
      cell: (element: ISubscription) => `${element?.deliveryDays}`,
      display: false,
      type: ColumnTypeEnum.format,
    },
    {
      columnDef: "durations",
      header: "Durations",
      cell: (element: ISubscription) => `${element?.durations}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "lastDeliveryDay",
      header: "Last Delivery Day",
      cell: (element: ISubscription) => `${element?.lastDeliveryDay}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "mealTypes",
      header: "Meal Types",
      cell: (element: ISubscription) => `${element?.mealTypes}`,
      display: true,
      type: ColumnTypeEnum.format,
    },
    {
      columnDef: "plan",
      header: "Plan",
      cell: (element: ISubscription) => `${element?.plan}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "remaingDays",
      header: "Remaing Days",
      cell: (element: ISubscription) => `${element?.remaingDays}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
  ];
  Permissions = this._PermissionService.Permissions;

  @Input() Phone: string = "";

  TABLE_DATA = toSignal(this._Store.select(subscriptionByPhoneSelector));
  constructor(
    private _Store: Store,
    private _PermissionService: PermissionService
  ) {}

  ngOnInit(): void {
    this.GetData(this.Phone);
  }

  GetData(phone: string) {
    if (phone) {
      this._Store.dispatch(GET_SUBSCRIPTIONS_BY_PHONE_START({ data: phone }));
    }
  }

  @Output() sid = new EventEmitter<any>();
  showDetails(row: ISubscription) {
    this.sid.emit(row.subscriptionsID.toString());
  }

  actions: IActions[] = [
    {
      action: "view",
      permission: this.Permissions.Subscriptions.View,
      icon: "visibility",
      label: "View",
    },
  ];
}
