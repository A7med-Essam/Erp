import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialog } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { Store } from "@ngrx/store";
import { FeatherModule } from "angular-feather";
import { IPaginateOptions } from "src/app/interfaces/paginator.interface";
import { TableComponent, IActions } from "src/app/pages/table/table.component";
import { ICustomersRetentionRequest } from "src/app/interfaces/customer.interface";
import { GET_RETENTION_START } from "src/app/store/retentionStore/retention.action";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { FormsModule } from "@angular/forms";
import { IAllLogsRequest, ILogs } from "src/app/interfaces/log.interface";
import { LogSelector } from "src/app/store/logStore/log.selector";
import { GET_LOGS_START } from "src/app/store/logStore/log.action";
import { ColumnTypeEnum } from "src/app/enums/columns.enum";
import { PERMISSIONS } from "src/app/enums/permission.enum";
import { GuardService } from "src/app/services/guard.service";
import { PermissionService } from "src/app/services/permission.service";
import { AppService } from "src/app/services/app.service";
import { LogService } from "src/app/services/log.service";
import { IExportRequest } from "src/app/store/appStore";

@Component({
  selector: "app-all-log",
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
  templateUrl: "./all-log.component.html",
  styleUrls: ["./all-log.component.scss"],
})
export class AllLogComponent implements OnInit {
  columns = [
    {
      columnDef: "id",
      header: "ID",
      cell: (element: ILogs) => `${element?.id}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "customer",
      header: "Customer",
      cell: (element: ILogs) => `${element?.customer}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "date",
      header: "Date",
      cell: (element: ILogs) => `${element?.date}`,
      display: true,
      type: ColumnTypeEnum.date,
    },
    {
      columnDef: "sid",
      header: "SID",
      cell: (element: ILogs) => `${element?.sid}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "action",
      header: "Action",
      cell: (element: ILogs) => `${element?.action}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "user",
      header: "User",
      cell: (element: ILogs) => `${element?.user}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "actionstypes",
      header: "Actions Types",
      cell: (element: ILogs) => `${element?.actionstypes}`,
      display: true,
      type: ColumnTypeEnum.badge,
    },
    {
      columnDef: "deliveryDate",
      header: "Delivery Date",
      cell: (element: ILogs) => `${element?.deliveryDate}`,
      display: true,
      type: ColumnTypeEnum.date,
    },
    {
      columnDef: "remaingDays",
      header: "Remaing Days",
      cell: (element: ILogs) => `${element?.remaingDays}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "notes",
      header: "Notes",
      cell: (element: ILogs) => `${element?.notes}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
  ];
  TABLE_DATA = toSignal(this._Store.select(LogSelector));
  Permissions = this._PermissionService.Permissions;
  DateFrom: string = "";
  DateTo: string = "";

  constructor(
    private _Store: Store,
    public dialog: MatDialog,
    private _PermissionService: PermissionService,
    private _AppService: AppService,
    private _LogService: LogService
  ) {}

  ngOnInit(): void {
    this.GetData();
  }

  GetData(Options: IPaginateOptions = { pageIndex: 0, pageSize: 10 }) {
    if (!this.TABLE_DATA()?.data) {
      Options.pageIndex++;
      this._Store.dispatch(
        GET_LOGS_START({
          data: Options,
        })
      );
    }
  }

  Paginate(Options: IPaginateOptions = { pageIndex: 0, pageSize: 10 }) {
    Options.pageIndex++;
    this._Store.dispatch(
      GET_LOGS_START({
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

  filter(event: any) {
    if (event.value) {
      const data: IAllLogsRequest = {
        pageIndex: 0,
        pageSize: 10,
        from: this.DateFrom
          ? new Date(this.DateFrom).toLocaleDateString("en-CA")
          : "",
        to: this.DateTo
          ? new Date(this.DateTo).toLocaleDateString("en-CA")
          : "",
      };
      this._Store.dispatch(GET_LOGS_START({ data }));
    }
  }

  // ============== EXPORT ================
  export() {
    if (this.Permissions.AllLog.Export) {
      const request: IExportRequest = {
        from: this.DateFrom
          ? new Date(this.DateFrom).toLocaleDateString("en-CA")
          : "",
        to: this.DateTo
          ? new Date(this.DateTo).toLocaleDateString("en-CA")
          : "",
        body: [],
      };
      this._LogService.Export(request).subscribe({
        next: (res) => {
          this._AppService.downloadBase64File(res.data);
        },
      });
    }
  }
}
