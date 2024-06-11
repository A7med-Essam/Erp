import { Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { ICustomerInfo } from "src/app/interfaces/customer.interface";
import { IPaginateOptions } from "src/app/interfaces/paginator.interface";
import { CustomerService } from "src/app/services/customer.service";
import { SubscriptionService } from "src/app/services/subscription.service";
import { GET_AREA_START } from "src/app/store/areaStore/area.action";
import { AreaSelector } from "src/app/store/areaStore/area.selector";
import { GET_CUSTOMER_CATEGORY_START } from "src/app/store/customerCategoryStore/customerCategory.action";
import { customerCategorySelector } from "src/app/store/customerCategoryStore/customerCategory.selector";
import {
  DELETE_CUSTOMER_START,
  GET_CUSTOMER_START,
} from "src/app/store/customerStore/customer.action";
import { customerSelector } from "src/app/store/customerStore/customer.selector";
import { AddCustomerComponent } from "../add-customer/add-customer.component";
import { MatTableModule } from "@angular/material/table";
import { IActions, TableComponent } from "src/app/pages/table/table.component";
import { MatCardModule } from "@angular/material/card";
import { FeatherModule } from "angular-feather";
import { CommonModule } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { ActionEnum } from "src/app/enums/action.enum";
import { ColumnTypeEnum } from "src/app/enums/columns.enum";
import { GuardService } from "src/app/services/guard.service";
import { PERMISSIONS } from "src/app/enums/permission.enum";
import { PermissionService } from "src/app/services/permission.service";
import { AppService } from "src/app/services/app.service";

@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.scss"],
  standalone: true,
  imports: [
    MatTableModule,
    TableComponent,
    MatCardModule,
    FeatherModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class CustomerComponent implements OnInit {
  columns = [
    {
      columnDef: "customerId",
      header: "CID",
      cell: (element: ICustomerInfo) => `${element?.customerId}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "customerName",
      header: "Customer Name",
      cell: (element: ICustomerInfo) => `${element?.customerName}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "phone",
      header: "Phone",
      cell: (element: ICustomerInfo) => `${element?.phone}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "birthDate",
      header: "Birth Date",
      cell: (element: ICustomerInfo) => `${element?.birthDate}`,
      display: true,
      type: ColumnTypeEnum.date,
    },
    {
      columnDef: "customerType",
      header: "Customer Type",
      cell: (element: ICustomerInfo) => `${element?.customerType}`,
      display: true,
      type: ColumnTypeEnum.badge,
    },
    {
      columnDef: "regDate",
      header: "Register Date",
      cell: (element: ICustomerInfo) => `${element?.regDate}`,
      display: true,
      type: ColumnTypeEnum.date,
    },
    {
      columnDef: "regType",
      header: "Register Type",
      cell: (element: ICustomerInfo) => `${element?.regType}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "status",
      header: "Status",
      cell: (element: ICustomerInfo) => `${element?.status}`,
      display: true,
      type: ColumnTypeEnum.toggle,
    },
  ];
  TABLE_DATA = toSignal(this._Store.select(customerSelector));
  AREA_DATA = toSignal(this._Store.select(AreaSelector));
  CATEGORY_DATA = toSignal(this._Store.select(customerCategorySelector));
  Permissions = this._PermissionService.Permissions;

  constructor(
    private _Store: Store,
    public dialog: MatDialog,
    private _CustomerService: CustomerService,
    private _SubscriptionService: SubscriptionService,
    private _Router: Router,
    private _PermissionService: PermissionService,
    private _AppService: AppService
  ) {}

  openCreateDialog(
    enterAnimationDuration: string = "100ms",
    exitAnimationDuration: string = "100ms",
    row: any = null
  ): void {
    if (this.Permissions.Customers.Create) {
      this.dialog.open(AddCustomerComponent, {
        enterAnimationDuration,
        exitAnimationDuration,
        height: "600px",
        width: "1200px",
        data: {
          category: this.CATEGORY_DATA(),
          area: this.AREA_DATA(),
          row,
        },
        disableClose: true,
      });
    }
  }

  ngOnInit(): void {
    this.GetData();
    this.GetArea();
    this.GetCategory();
  }

  GetData(Options: IPaginateOptions = { pageIndex: 0, pageSize: 10 }) {
    if (!this.TABLE_DATA()?.data) {
      Options.pageIndex++;
      this._Store.dispatch(GET_CUSTOMER_START({ data: Options }));
    }
  }

  GetArea() {
    if (!this.AREA_DATA()?.data) {
      this._Store.dispatch(GET_AREA_START());
    }
  }

  GetCategory() {
    if (!this.CATEGORY_DATA()?.data) {
      this._Store.dispatch(GET_CUSTOMER_CATEGORY_START());
    }
  }

  Paginate(Options: IPaginateOptions = { pageIndex: 0, pageSize: 10 }) {
    Options.pageIndex++;
    this._Store.dispatch(GET_CUSTOMER_START({ data: Options }));
  }

  updateRow(row: ICustomerInfo) {
    this.openCreateDialog("100ms", "100ms", row);
  }

  createSubscription(row: ICustomerInfo) {
    this._CustomerService.SELECTED_CUSTOMER.set(row);
    this._SubscriptionService.SELECTED_SUBSCRIPTION.set(null);
    this._Router.navigate(["./create-subscription"]);
  }

  deleteRow(row: ICustomerInfo) {
    this._Store.dispatch(DELETE_CUSTOMER_START({ customerID: row.id }));
  }

  isFilter: boolean = false;
  filter(INPUT: HTMLInputElement) {
    if (this.isFilter || INPUT.value !== "") {
      const data = {
        pageIndex: 0,
        pageSize: 10,
        Phone: INPUT.value,
      };
      this._Store.dispatch(GET_CUSTOMER_START({ data }));
    }
    INPUT.blur();
    INPUT.value == "" ? (this.isFilter = false) : (this.isFilter = true);
  }

  actions: IActions[] = [
    {
      action: ActionEnum.createSubscription,
      permission: this.Permissions.Subscriptions.Create,
      icon: "bookmark",
      label: "Create Subscription",
    },
    {
      action: ActionEnum.update,
      permission: this.Permissions.Customers.Edit,
      icon: "edit",
      label: "Update",
    },
    {
      action: ActionEnum.delete,
      permission: this.Permissions.Customers.Delete,
      icon: "delete",
      label: "Delete",
    },
  ];

  // ============== EXPORT ================
  export() {
    if (this.Permissions.Customers.Export) {
      this._CustomerService.ExportCustomers([]).subscribe({
        next: (res) => {
          this._AppService.downloadBase64File(res.data);
        },
      });
    }
  }
}
