import { Component, OnDestroy, OnInit } from "@angular/core";
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
import { IActions, TableComponent } from "src/app/pages/table/table.component";
import { InvoiceSelector } from "src/app/store/invoiceStore/invoice.selector";
import { GET_INVOICE_FAILED, GET_INVOICE_START } from "src/app/store/invoiceStore/invoice.action";
import { InvoiceInfo } from "src/app/interfaces/invoice.interface";
import { ColumnTypeEnum } from "src/app/enums/columns.enum";
import { ActionEnum } from "src/app/enums/action.enum";
import { UpdateInvoiceDialogComponent } from "../update-invoice-dialog/update-invoice-dialog.component";
import { Subject, takeUntil } from "rxjs";
import { SubscribeOptionsEnum } from "src/app/enums/subscriptions.enum";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { FormsModule } from "@angular/forms";
import { PERMISSIONS } from "src/app/enums/permission.enum";
import { GuardService } from "src/app/services/guard.service";
import { PermissionService } from "src/app/services/permission.service";
import { InvoiceService } from "src/app/services/invoice.service";
import { AppService } from "src/app/services/app.service";
import { IExportRequest } from "src/app/store/appStore";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-invoice",
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    TableComponent,
    MatCardModule,
    FeatherModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    FormsModule,
  ],
  templateUrl: "./invoice.component.html",
  styleUrls: ["./invoice.component.scss"],
})
export class InvoiceComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  Permissions = this._PermissionService.Permissions;
  TABLE_DATA = toSignal(this._Store.select(InvoiceSelector));
  columns = [
    {
      columnDef: "id",
      header: "ID",
      cell: (element: InvoiceInfo) => `${element?.id}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "subscrbtionId",
      header: "SID",
      cell: (element: InvoiceInfo) => `${element?.subscrbtionId}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "customerId",
      header: "CID",
      cell: (element: InvoiceInfo) => `${element?.customerId}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "customerName",
      header: "Customer Name",
      cell: (element: InvoiceInfo) => `${element?.customerName}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "deliveryBranchName",
      header: "Delivery Branch Name",
      cell: (element: InvoiceInfo) => `${element?.deliveryBranchName}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "customerType",
      header: "Customer Type",
      cell: (element: InvoiceInfo) => `${element?.customerType}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "currancyRate",
      header: "Currancy Rate",
      cell: (element: InvoiceInfo) => `${element?.currancyRate}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "total",
      header: "Total",
      cell: (element: InvoiceInfo) => `${element?.total}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "discount",
      header: "Discount",
      cell: (element: InvoiceInfo) => `${element?.discount}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "manualDiscount",
      header: "Manual Discount",
      cell: (element: InvoiceInfo) => `${element?.manualDiscount}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "tax",
      header: "tax",
      cell: (element: InvoiceInfo) => `${element?.tax}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "net",
      header: "Net",
      cell: (element: InvoiceInfo) => `${element?.net}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "invoiceType",
      header: "Invoice Type",
      cell: (element: InvoiceInfo) => `${element?.invoiceType}`,
      display: true,
      type: ColumnTypeEnum.badge,
    },
    {
      columnDef: "subscriptionBranchName",
      header: "Subscription Branch Name",
      cell: (element: InvoiceInfo) => `${element?.subscriptionBranchName}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "notes",
      header: "Notes",
      cell: (element: InvoiceInfo) => `${element?.notes}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "actionDate",
      header: "Action Date",
      cell: (element: InvoiceInfo) => `${element?.actionDate}`,
      display: false,
      type: ColumnTypeEnum.date,
    },
    {
      columnDef: "expirationDate",
      header: "Expiration Date",
      cell: (element: InvoiceInfo) => `${element?.expirationDate}`,
      display: true,
      type: ColumnTypeEnum.date,
    },
    {
      columnDef: "payDate",
      header: "Pay Date",
      cell: (element: InvoiceInfo) => `${element?.payDate}`,
      display: false,
      type: ColumnTypeEnum.date,
    },
    {
      columnDef: "comfirmed",
      header: "Comfirmed",
      cell: (element: InvoiceInfo) => `${element?.comfirmed}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "invoiceSerial",
      header: "Invoice Serial",
      cell: (element: InvoiceInfo) => `${element?.invoiceSerial}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "subscriptionType",
      header: "Subscription Type",
      cell: (element: InvoiceInfo) =>
        `${SubscribeOptionsEnum[element?.subscriptionType]}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "subscripBranch",
      header: "Subscriped Branch",
      cell: (element: InvoiceInfo) => `${element?.subscripBranch}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "imgUrl",
      header: "Image Url",
      cell: (element: InvoiceInfo) => `${element?.imgUrl}`,
      display: false,
      type: ColumnTypeEnum.img,
    },
    {
      columnDef: "invoiceState",
      header: "Invoice State",
      cell: (element: InvoiceInfo) => `${element?.invoiceState}`,
      display: true,
      type: ColumnTypeEnum.badge,
    },
  ];
  actions: IActions[] = [
    {
      action: ActionEnum.update,
      icon: "edit",
      label: "Update Invoice",
      permission: this.Permissions.Invoices.Edit,
    },
  ];
  constructor(
    private _Store: Store,
    public _dialog: MatDialog,
    private _PermissionService: PermissionService,
    private _InvoiceService: InvoiceService,
    private _AppService: AppService
  ) {}
  ngOnInit(): void {
    this.GetData();
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this._Store.dispatch(
      GET_INVOICE_FAILED({ error: new HttpErrorResponse({ error: "" }) })
    );
  }
  GetData(Options: IPaginateOptions = { pageIndex: 0, pageSize: 10 }) {
    if (!this.TABLE_DATA()?.data) {
      Options.pageIndex++;
      this._Store.dispatch(
        GET_INVOICE_START({
          data: Options,
        })
      );
    }
  }
  Paginate(Options: IPaginateOptions = { pageIndex: 0, pageSize: 10 }) {
    Options.pageIndex++;
    this._Store.dispatch(
      GET_INVOICE_START({
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
  updateRow(e: InvoiceInfo) {
    this._dialog
      .open(UpdateInvoiceDialogComponent, {
        enterAnimationDuration: "100ms",
        exitAnimationDuration: "100ms",
        height: "650px",
        width: "1200px",
        data: e,
        disableClose: true,
      })
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: boolean) => {
        if (res) {
          this.Paginate();
        }
      });
  }

  // ============================ Filter ============================
  DateFrom: string = "";
  DateTo: string = "";

  filter(event: any) {
    if (event.value) {
      const data: any = {
        pageIndex: 0,
        pageSize: 10,
        from: this.DateFrom
          ? new Date(this.DateFrom).toLocaleDateString("en-CA")
          : "",
        to: this.DateTo
          ? new Date(this.DateTo).toLocaleDateString("en-CA")
          : "",
      };
      this._Store.dispatch(GET_INVOICE_START({ data }));
    }
  }

  // ============== EXPORT ================
  export() {
    if (this.Permissions.Invoices.Export) {
      const request: IExportRequest = {
        from: this.DateFrom
          ? new Date(this.DateFrom).toLocaleDateString("en-CA")
          : "",
        to: this.DateTo
          ? new Date(this.DateTo).toLocaleDateString("en-CA")
          : "",
        body: [],
      };
      this._InvoiceService.Export(request).subscribe({
        next: (res) => {
          this._AppService.downloadBase64File(res.data);
        },
      });
    }
  }
}
