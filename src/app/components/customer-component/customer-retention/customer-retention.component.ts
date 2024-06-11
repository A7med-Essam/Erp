import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialog } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { FeatherModule } from "angular-feather";
import { IPaginateOptions } from "src/app/interfaces/paginator.interface";
import { TableComponent, IActions } from "src/app/pages/table/table.component";
import { CustomerService } from "src/app/services/customer.service";
import { SubscriptionService } from "src/app/services/subscription.service";
import { AreaSelector } from "src/app/store/areaStore/area.selector";
import { customerCategorySelector } from "src/app/store/customerCategoryStore/customerCategory.selector";
import { GET_CUSTOMER_START } from "src/app/store/customerStore/customer.action";
import { customerSelector } from "src/app/store/customerStore/customer.selector";
import {
  ICustomersRetention,
  ICustomersRetentionRequest,
} from "src/app/interfaces/customer.interface";
import { RetentionSelector } from "src/app/store/retentionStore/retention.selector";
import { GET_RETENTION_START } from "src/app/store/retentionStore/retention.action";
import {
  MatDatepicker,
  MatDatepickerInputEvent,
  MatDatepickerModule,
} from "@angular/material/datepicker";
import { FormsModule } from "@angular/forms";
import { map } from "rxjs";
import { ColumnTypeEnum } from "src/app/enums/columns.enum";
import { PermissionService } from "src/app/services/permission.service";
import { AppService } from "src/app/services/app.service";
import { IExportRequest } from "src/app/store/appStore";

@Component({
  selector: "app-customer-retention",
  standalone: true,
  imports: [
    MatTableModule,
    TableComponent,
    MatCardModule,
    FeatherModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    FormsModule,
  ],
  templateUrl: "./customer-retention.component.html",
  styleUrls: ["./customer-retention.component.scss"],
})
export class CustomerRetentionComponent implements OnInit {
  columns = [
    {
      columnDef: "customerId",
      header: "CID",
      cell: (element: ICustomersRetention) => `${element?.customerID}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "sid",
      header: "SID",
      cell: (element: ICustomersRetention) => `${element?.sid}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "customerName",
      header: "customer Name",
      cell: (element: ICustomersRetention) => `${element?.customerName}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "branch",
      header: "Branch",
      cell: (element: ICustomersRetention) => `${element?.branch}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "lastDay",
      header: "Last Day",
      cell: (element: ICustomersRetention) => `${element?.lastDay}`,
      display: true,
      type: ColumnTypeEnum.date,
    },
    {
      columnDef: "phone",
      header: "Phone",
      cell: (element: ICustomersRetention) => `${element?.phone}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "remaingDays",
      header: "Remaing Days",
      cell: (element: ICustomersRetention) => `${element?.remaingDays}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
  ];
  Permissions = this._PermissionService.Permissions;

  TABLE_DATA = toSignal(
    this._Store.select(RetentionSelector).pipe(
      map((res) => {
        const modifiedResponse = { ...res };
        if (modifiedResponse.data) {
          modifiedResponse.data = [...modifiedResponse.data].sort(
            (a, b) => a.sid - b.sid
          );
        }
        return modifiedResponse;
      })
    )
  );

  DateFrom: string = this.getOneMonthAgoDate();
  DateTo: string = new Date().toLocaleDateString("en-CA");

  constructor(
    private _Store: Store,
    public dialog: MatDialog,
    private _PermissionService: PermissionService,
    private _AppService: AppService,
    private _CustomerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.GetData();
  }

  GetData(Options: IPaginateOptions = { pageIndex: 0, pageSize: 10 }) {
    if (!this.TABLE_DATA()?.data) {
      Options.pageIndex++;
      this._Store.dispatch(
        GET_RETENTION_START({
          data: {
            ...Options,
            from: this.DateFrom,
            to: this.DateTo,
          },
        })
      );
    }
  }

  getOneMonthAgoDate() {
    const currentDate = new Date();
    const oneMonthAgo = new Date(currentDate);
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    return oneMonthAgo.toLocaleDateString("en-CA");
  }

  Paginate(Options: IPaginateOptions = { pageIndex: 0, pageSize: 10 }) {
    Options.pageIndex++;
    this._Store.dispatch(
      GET_RETENTION_START({
        data: {
          ...Options,
          from: new Date(this.DateFrom).toLocaleDateString("en-CA"),
          to: new Date(this.DateTo).toLocaleDateString("en-CA"),
        },
      })
    );
  }

  filter(event: any) {
    if (event.value) {
      const data: ICustomersRetentionRequest = {
        pageIndex: 0,
        pageSize: 10,
        from: new Date(this.DateFrom).toLocaleDateString("en-CA"),
        to: new Date(this.DateTo).toLocaleDateString("en-CA"),
      };
      this._Store.dispatch(GET_RETENTION_START({ data }));
    }
  }

  // ============== EXPORT ================
  export() {
    if (this.Permissions.CustomersRetention.Export) {
      const request: IExportRequest = {
        from: this.DateFrom
          ? new Date(this.DateFrom).toLocaleDateString("en-CA")
          : "",
        to: this.DateTo
          ? new Date(this.DateTo).toLocaleDateString("en-CA")
          : "",
        body: [],
      };
      this._CustomerService.ExportCustomersRetintion(request).subscribe({
        next: (res) => {
          this._AppService.downloadBase64File(res.data);
        },
      });
    }
  }
}
