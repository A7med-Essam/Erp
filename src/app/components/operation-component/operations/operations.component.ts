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
import { TableComponent, IActions } from "src/app/pages/table/table.component";
import {
  ICustomersRetention,
  ICustomersRetentionRequest,
} from "src/app/interfaces/customer.interface";
import { RetentionSelector } from "src/app/store/retentionStore/retention.selector";
import { GET_RETENTION_START } from "src/app/store/retentionStore/retention.action";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { FormsModule } from "@angular/forms";
import { Subject, map, takeUntil } from "rxjs";
import {
  GET_OPERATIONS_FAILED,
  GET_OPERATIONS_START,
} from "src/app/store/operationStore/operation.action";
import { OperationSelector } from "src/app/store/operationStore/operation.selector";
import {
  IOperations,
  IOperationsRequest,
} from "src/app/interfaces/operations.interface";
import { ColumnTypeEnum } from "src/app/enums/columns.enum";
import { DeliveryStatusIndexEnum } from "src/app/enums/subscriptions.enum";
import { DayStateDialogComponent } from "../day-state-dialog/day-state-dialog.component";
import { IExportOperationsRequest, OperationService } from "src/app/services/operation.service";
import { HttpErrorResponse } from "@angular/common/http";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { PermissionService } from "src/app/services/permission.service";
import { AppService } from "src/app/services/app.service";

@Component({
  selector: "app-operations",
  standalone: true,
  templateUrl: "./operations.component.html",
  styleUrls: ["./operations.component.scss"],
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
    MatSlideToggleModule,
  ],
})
export class OperationsComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  Permissions = this._PermissionService.Permissions;
  selectedRows: IOperations[] = [];
  columns = [
    {
      columnDef: "customerId",
      header: "CID",
      cell: (element: IOperations) => `${element?.customerId}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "subscrbtionId",
      header: "SID",
      cell: (element: IOperations) => `${element?.subscrbtionId}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "deliveryDate",
      header: "Delivery Date",
      cell: (element: IOperations) => `${element?.deliveryDate}`,
      display: true,
      type: ColumnTypeEnum.date,
    },
    {
      columnDef: "customerName",
      header: "Customer Name",
      cell: (element: IOperations) => `${element?.customerName}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "customerBranchName",
      header: "Customer Branch",
      cell: (element: IOperations) => `${element?.customerBranchName}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "dayName",
      header: "Day Name",
      cell: (element: IOperations) => `${element?.dayName}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "dayNotes",
      header: "Day Notes",
      cell: (element: IOperations) => `${element?.dayNotes}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "dayNumber",
      header: "Day Number",
      cell: (element: IOperations) => `${element?.dayNumber}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "dayState",
      header: "Day State",
      cell: (element: IOperations) =>
        `${DeliveryStatusIndexEnum[Number(element?.dayState)]}`,
      display: true,
      type: ColumnTypeEnum.badge,
    },
    {
      columnDef: "deliverBranchName",
      header: "Delivery Branch",
      cell: (element: IOperations) => `${element?.deliverBranchName}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "driverName",
      header: "Driver Name",
      cell: (element: IOperations) => `${element?.driverName}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "inventoryEntry",
      header: "Inventory Entry",
      cell: (element: IOperations) => `${element?.inventoryEntry}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "planExpression",
      header: "Plan Expression",
      cell: (element: IOperations) => `${element?.planExpression}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "printDate",
      header: "Print Date",
      cell: (element: IOperations) => `${element?.printDate}`,
      display: false,
      type: ColumnTypeEnum.date,
    },
    {
      columnDef: "salesEntry",
      header: "Sales Entry",
      cell: (element: IOperations) => `${element?.salesEntry}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "type",
      header: "Type",
      cell: (element: IOperations) => `${element?.type}`,
      display: true,
      type: ColumnTypeEnum.badge,
    },
  ];
  TABLE_DATA = toSignal(this._Store.select(OperationSelector));
  isUpdating: boolean = false;
  DateFrom: string = this.getDateBefore();
  DateTo: string = new Date().toLocaleDateString("en-CA");
  selectedCID: number | null = null;
  selectedSID: number | null = null;
  isPrintDate: boolean = false;
  constructor(
    private _Store: Store,
    public _dialog: MatDialog,
    private _OperationService: OperationService,
    private _PermissionService: PermissionService,
    private _AppService: AppService
  ) {}

  ngOnInit(): void {
    this.GetData();
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  GetData(Options: IPaginateOptions = { pageIndex: 0, pageSize: 10 }) {
    if (!this.TABLE_DATA()?.data) {
      Options.pageIndex++;
      this._Store.dispatch(
        GET_OPERATIONS_START({
          data: {
            ...Options,
            dateFrom: this.DateFrom,
            dateTo: this.DateTo,
            isPrintDate: this.isPrintDate,
            customerID: this.selectedCID || null,
            subscriptionNumber: this.selectedSID || null,
          },
        })
      );
    }
  }
  getDateBefore() {
    const currentDate = new Date();
    const prevDate = new Date(currentDate);
    prevDate.setDate(prevDate.getDate() - 0);
    return prevDate.toLocaleDateString("en-CA");
  }
  Paginate(Options: IPaginateOptions = { pageIndex: 0, pageSize: 10 }) {
    Options.pageIndex++;
    this._Store.dispatch(
      GET_OPERATIONS_START({
        data: {
          ...Options,
          dateFrom: this.DateFrom
            ? new Date(this.DateFrom).toLocaleDateString("en-CA")
            : null,
          dateTo: this.DateTo
            ? new Date(this.DateTo).toLocaleDateString("en-CA")
            : null,
          customerID: this.selectedCID || null,
          subscriptionNumber: this.selectedSID || null,
        },
      })
    );
  }
  reset() {
    this.DateFrom = "";
    this.DateTo = "";
    this.selectedSID = null;
    this.selectedCID = null;
    this.filter();
  }
  filter() {
    if (this.Permissions.Operations.Search) {
      const data: IOperationsRequest = {
        pageIndex: 0,
        pageSize: 10,
        isPrintDate: this.isPrintDate,
        customerID: this.selectedCID || null,
        subscriptionNumber: this.selectedSID || null,
        dateFrom:
          this.DateFrom == ""
            ? null
            : new Date(this.DateFrom).toLocaleDateString("en-CA"),
        dateTo:
          this.DateTo == ""
            ? null
            : new Date(this.DateTo).toLocaleDateString("en-CA"),
      };
      this._Store.dispatch(GET_OPERATIONS_START({ data }));
      this.selectedSID = null;
      this.selectedCID = null;
    }
  }
  getSelectedRows(e: IOperations[]) {
    this.selectedRows = e;
  }
  update() {
    if (this.Permissions.Operations.ChangeDeliveryState) {
      if (this.selectedRows.length) {
        this._dialog
          .open(DayStateDialogComponent, {
            enterAnimationDuration: "100ms",
            exitAnimationDuration: "100ms",
            height: "250px",
            width: "800px",
            disableClose: true,
          })
          .afterClosed()
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe((res: DeliveryStatusIndexEnum) => {
            if (res) {
              this._OperationService
                .ChangeDeliveryStatus(
                  DeliveryStatusIndexEnum[res],
                  this.selectedRows.map((e) => e.id)
                )
                .subscribe((res) => {
                  this.selectedRows = [];
                  this.isUpdating = true;
                  setTimeout(() => {
                    this.filter();
                    this.isUpdating = false;
                  }, 0);
                });
            }
          });
      }
    }
  }

  // ============== EXPORT ================
  export() {
    if (this.Permissions.Operations.Export) {
      const request: IExportOperationsRequest = {
        dateFrom: this.DateFrom
          ? new Date(this.DateFrom).toLocaleDateString("en-CA")
          : null,
        dateTo: this.DateTo
          ? new Date(this.DateTo).toLocaleDateString("en-CA")
          : null,
        customerID: this.selectedCID || null,
        subscriptionNumber: this.selectedSID || null,
        isPrintDate: this.isPrintDate,
      };
      this._OperationService.Export(request).subscribe({
        next: (res) => {
          this._AppService.downloadBase64File(res);
        },
      });
    }
  }
}
