import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatCardModule } from "@angular/material/card";
import { MatDialog } from "@angular/material/dialog";
import { MatTableModule } from "@angular/material/table";
import { Store } from "@ngrx/store";
import { FeatherModule } from "angular-feather";
import { ActionEnum } from "src/app/enums/action.enum";
import { ColumnTypeEnum } from "src/app/enums/columns.enum";
import { InvoiceLog } from "src/app/interfaces/log.interface";
import { IActions, TableComponent } from "src/app/pages/table/table.component";
import { PermissionService } from "src/app/services/permission.service";
import { InvoiceLogSelector } from "src/app/store/InvoiceLogStore/InvoiceLog.selector";
import { InvoiceDetailsComponent } from "../../invoice-component/invoice-details/invoice-details.component";

@Component({
  selector: "app-invoice-log",
  templateUrl: "./invoice-log.component.html",
  styleUrls: ["./invoice-log.component.scss"],
  standalone: true,
  imports: [
    MatTableModule,
    TableComponent,
    MatCardModule,
    FeatherModule,
    CommonModule,
  ],
})
export class InvoiceLogComponent {
  TABLE_DATA = toSignal(this._Store.select(InvoiceLogSelector));
  Permissions = this._PermissionService.Permissions;

  actions: IActions[] = [
    {
      action: ActionEnum.filter,
      permission: this.Permissions.SubscriptionActions.ViewInvoiceLog,
      icon: "filter_alt",
      label: "Filter By Invoice",
    },
    {
      action: ActionEnum.view,
      permission: this.Permissions.SubscriptionActions.ViewInvoiceLog,
      icon: "remove_red_eye",
      label: "View Details",
    },
  ];
  columns = [
    {
      columnDef: "SID",
      header: "SID",
      cell: (element: InvoiceLog) => `${element?.sid}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "payDate",
      header: "Pay Date",
      cell: (element: InvoiceLog) => `${element?.payDate}`,
      display: true,
      type: ColumnTypeEnum.date,
    },
    {
      columnDef: "invoiceNumber",
      header: "Invoice Number",
      cell: (element: InvoiceLog) => `${element?.invoiceNumber}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "serial",
      header: "Serial",
      cell: (element: InvoiceLog) => `${element?.serial}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "branch",
      header: "Branch",
      cell: (element: InvoiceLog) => `${element?.branch}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "user",
      header: "User",
      cell: (element: InvoiceLog) => `${element?.user}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "total",
      header: "Total",
      cell: (element: InvoiceLog) => `${element?.total}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "tax",
      header: "Tax",
      cell: (element: InvoiceLog) => `${element?.tax}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "discount",
      header: "Discount",
      cell: (element: InvoiceLog) => `${element?.discount}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "net",
      header: "Net",
      cell: (element: InvoiceLog) => `${element?.net}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "bagValue",
      header: "Bag Value",
      cell: (element: InvoiceLog) => `${element?.bagValue}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "payStatus",
      header: "Pay Status",
      cell: (element: InvoiceLog) => `${element?.payStatus}`,
      display: true,
      type: ColumnTypeEnum.badge,
    },
    {
      columnDef: "invoiceType",
      header: "Invoice Type",
      cell: (element: InvoiceLog) => `${element?.invoiceType}`,
      display: true,
      type: ColumnTypeEnum.badge,
    },
    {
      columnDef: "year",
      header: "Year",
      cell: (element: InvoiceLog) => `${element?.year}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
  ];

  constructor(
    private _Store: Store,
    private _PermissionService: PermissionService,
    private _dialog: MatDialog
  ) {}

  @Output() invoice = new EventEmitter<InvoiceLog>();
  filter(row: InvoiceLog) {
    this.invoice.emit(row);
  }

  view(row: InvoiceLog) {
    if (this.Permissions.SubscriptionActions.ViewInvoiceLog) {
      this._dialog
        .open(InvoiceDetailsComponent, {
          enterAnimationDuration: "100ms",
          exitAnimationDuration: "100ms",
          height: "700px",
          width: "1200px",
          data: row,
          disableClose: true,
        })
        .afterClosed();
    }
  }
}
