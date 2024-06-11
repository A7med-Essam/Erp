import { SelectionModel } from "@angular/cdk/collections";
import { CommonModule, DatePipe } from "@angular/common";
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatOptionModule } from "@angular/material/core";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import {
  MatSlideToggle,
  MatSlideToggleModule,
} from "@angular/material/slide-toggle";
import { MatSort } from "@angular/material/sort";
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from "@angular/material/table";
import { MatTableExporterModule } from "mat-table-exporter";
import { IPaginateOptions } from "src/app/interfaces/paginator.interface";
import { ConfirmationDialogComponent } from "../confirmationDialog/confirmationDialog.component";
import { DialogInfoComponent } from "../dialog-info/dialog-info.component";
import { BehaviorSubject, Subject, takeUntil } from "rxjs";
import {
  DeliveryStatusEnum,
  LineStateEnum,
  SubscriptionStatusEnum,
} from "src/app/enums/subscriptions.enum";
import { DragDropModule, moveItemInArray } from "@angular/cdk/drag-drop";
import { ActionEnum } from "src/app/enums/action.enum";
import { ColorEnum } from "src/app/enums/color.enum";
import { CustomerTypeEnum } from "src/app/enums/customer.enum";
import { InvoiceStateEnum, InvoiceTypeEnum } from "src/app/enums/invoice.enum";
import { ActionTypeEnum } from "src/app/enums/logs.enum";
import { ColumnTypeEnum } from "src/app/enums/columns.enum";
import { DislikePolicyEnum } from "src/app/enums/dislike.enum";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "generic-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
  standalone: true,
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
    DatePipe,
    CommonModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatTableExporterModule,
    DragDropModule,
  ],
})
export class TableComponent implements OnInit, OnChanges, OnDestroy {
  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar) {}
  baseUrl = `https://api.dashboard.${
    window.location.href.split("dashboard.")[1].split(".")[0]
  }.thelowcalories.com/`;

  private unsubscribe$ = new Subject<void>();
  private data$ = new BehaviorSubject<any>(null);
  selectedColumns: string[] = [];
  currentColumns: string[] = [];
  selection = new SelectionModel<any>(true, []);
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [];
  length: number = 0;
  pageSize: number = 0;
  pageIndex: number = 0;
  showSpinner: boolean = true;
  public get ColumnType(): typeof ColumnTypeEnum {
    return ColumnTypeEnum;
  }

  @ViewChild("table") table!: MatTable<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() actions: IActions[] = [];
  @Input() components!: IComponents;
  @Input() columns: any[] = [];
  @Input() TABLE_DATA: any;
  @Input() pageSizeOptions: number[] = [];
  @Input() currentSelectedRows: any[] = [];
  @Input() currentSelectedProperty: string = "";

  ngOnInit(): void {
    this.currentColumns = this.columns.map((c) => c.header);
    this.selectedColumns = this.columns
      .filter((cd) => cd.display)
      .map((c) => c.header);
    this.fixToggleColumns();
  }

  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.TABLE_DATA?.data);
    this.length = this.TABLE_DATA?.totalCount;
    this.pageIndex = this.TABLE_DATA?.currentPage;
    this.pageSize = this.TABLE_DATA?.pageSize;
    this.showSpinner = this.TABLE_DATA?.loading;
    this.displayedColumns = this.columns
      .filter((cd) => cd.display)
      .map((c) => c.columnDef);
    this.addColumnOption();
    this.data$.next(this.TABLE_DATA);
    this.manageDefualtSelectedRows();
  }

  fixToggleColumns() {
    this.data$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((_) => this.toggleColumns());
  }

  manageDefualtSelectedRows() {
    if (this.dataSource.data?.length) {
      const selectedProperty = this.currentSelectedRows.map(
        (m) => m?.[this.currentSelectedProperty]
      );
      const indexes = this.dataSource.data
        .map((e, index) =>
          selectedProperty.includes(e?.[this.currentSelectedProperty])
            ? index
            : -1
        )
        .filter((index) => index !== -1);
      indexes.forEach((index) =>
        this.selection.select(this.dataSource.data[index])
      );
      this.selectedRows();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getData() {
    this.PaginateOptions.emit({
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
    });
  }

  // =============================================================== Features ===============================================================
  copy(cell: string) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(cell).then(
        () => {
          this._snackBar.open("Copied to clipboard!", "✅", {
            duration: 2000,
          });
        },
        (err) => {
          this._snackBar.open("Failed to copy!", "✅", {
            duration: 2000,
          });
        }
      );
    } else {
      // Fallback method for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = cell;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        this._snackBar.open("Copied to clipboard!", "✅", {
          duration: 2000,
        });
      } catch (err) {
        this._snackBar.open("Failed to copy!", "✅", {
          duration: 2000,
        });
      }
      document.body.removeChild(textarea);
    }
  }

  dropTable(event: any) {
    const prevIndex = this.dataSource.data.findIndex(
      (d) => d === event.item.data
    );
    const dataCopy = [...this.dataSource.data];
    moveItemInArray(dataCopy, prevIndex, event.currentIndex);
    this.table.renderRows();
    this.dataSource.data = dataCopy;
    this.reorderData.emit(dataCopy);
  }

  calculateFooter(row: any) {
    const col = this.dataSource?.data?.map((e) => e[row.columnDef]);
    let sum = 0;
    if (col?.length) {
      sum = col.reduce((acc, current) => Number(acc) + Number(current), 0);
    }
    return isFinite(sum) ? sum?.toFixed(1) : "";
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: any, filter) => {
      const dataStr = JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1;
    };
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }

  toggleAllRows() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  handlePaginate(event: PageEvent) {
    this.length = event.length;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getData();
    this.fixToggleColumns();
  }

  getRecord(row: any, $event: any) {
    $event.stopPropagation();
  }

  toggleColumns() {
    this.displayedColumns = this.columns
      .filter((c) => this.selectedColumns.includes(c.header))
      .map((c) => c.columnDef);
    this.addColumnOption();
  }

  addColumnOption() {
    if (this.actions.length) {
      this.displayedColumns.unshift("Actions");
    }
    if (this.components != undefined && this.components.selection) {
      this.displayedColumns.unshift("select");
    }
    if (this.components != undefined && this.components.reorder) {
      this.displayedColumns.unshift("reorder");
    }
    if (this.components != undefined && this.components.index) {
      this.displayedColumns.unshift("index");
    }
  }

  fixDate(row: any) {
    const date = new Date(row);
    if (date.toString() === "Invalid Date") {
      return null;
    }
    return date;
  }

  // =============================================================== Dialogs ===============================================================
  openConfirmDialog(row: any): void {
    this.dialog
      .open(ConfirmationDialogComponent, {
        width: "300px",
        enterAnimationDuration: "100ms",
        exitAnimationDuration: "100ms",
      })
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: boolean) => {
        res && this.deleteRow(row);
      });
  }

  openDialogInfo(row: any) {
    this.dialog.open(DialogInfoComponent, {
      data: { data: row, type: "mealNote" },
    });
  }

  // =============================================================== Tag ===============================================================

  getTagColor(type: string): string {
    switch (type.toLowerCase()) {
      case DeliveryStatusEnum.Deliveried.toLocaleLowerCase():
        return ColorEnum.success;
      case DeliveryStatusEnum.Pending.toLocaleLowerCase():
        return ColorEnum.info;
      case DeliveryStatusEnum.Resticited.toLocaleLowerCase():
        return ColorEnum.warning;
      case DeliveryStatusEnum.Hold.toLocaleLowerCase():
        return ColorEnum.secondary;
      case DeliveryStatusEnum.Canceld.toLocaleLowerCase():
        return ColorEnum.danger;
      case LineStateEnum.Cancel.toLocaleLowerCase():
        return ColorEnum.danger;
      case LineStateEnum.Done.toLocaleLowerCase():
        return ColorEnum.success;
      case LineStateEnum.Pending.toLocaleLowerCase():
        return ColorEnum.info;
      case SubscriptionStatusEnum.Active.toLocaleLowerCase():
        return ColorEnum.success;
      case SubscriptionStatusEnum.Expired.toLocaleLowerCase():
        return ColorEnum.danger;
      case SubscriptionStatusEnum.Hold.toLocaleLowerCase():
        return ColorEnum.secondary;
      case CustomerTypeEnum.Sponser.toLocaleLowerCase():
      case CustomerTypeEnum.Sponsor.toLocaleLowerCase():
        return ColorEnum.success;
      case CustomerTypeEnum.Customer.toLocaleLowerCase():
        return ColorEnum.primary;
      case InvoiceTypeEnum.migrate.toLocaleLowerCase():
        return ColorEnum.warning;
      case InvoiceTypeEnum.new.toLocaleLowerCase():
        return ColorEnum.primary;
      case InvoiceTypeEnum.renew.toLocaleLowerCase():
        return ColorEnum.success;
      case InvoiceStateEnum.cancel.toLocaleLowerCase():
        return ColorEnum.danger;
      case InvoiceStateEnum.done.toLocaleLowerCase():
        return ColorEnum.success;
      case InvoiceStateEnum.pending.toLocaleLowerCase():
        return ColorEnum.info;
      case ActionTypeEnum.Active.toLocaleLowerCase():
        return ColorEnum.success;
      case ActionTypeEnum.AddDays.toLocaleLowerCase():
        return ColorEnum.success;
      case ActionTypeEnum.AddMeals.toLocaleLowerCase():
        return ColorEnum.success;
      case ActionTypeEnum.AddNotes.toLocaleLowerCase():
        return ColorEnum.success;
      case ActionTypeEnum.BagCount.toLocaleLowerCase():
        return ColorEnum.info;
      case ActionTypeEnum.ChangeAdress.toLocaleLowerCase():
        return ColorEnum.warning;
      case ActionTypeEnum.ChangeBranch.toLocaleLowerCase():
        return ColorEnum.warning;
      case ActionTypeEnum.ChangeName.toLocaleLowerCase():
        return ColorEnum.warning;
      case ActionTypeEnum.ChangePhone.toLocaleLowerCase():
        return ColorEnum.warning;
      case ActionTypeEnum.ChangeState.toLocaleLowerCase():
        return ColorEnum.warning;
      case ActionTypeEnum.Changedriver.toLocaleLowerCase():
        return ColorEnum.warning;
      case ActionTypeEnum.CustomMeals.toLocaleLowerCase():
        return ColorEnum.primary;
      case ActionTypeEnum.Detact.toLocaleLowerCase():
        return ColorEnum.danger;
      case ActionTypeEnum.Extend.toLocaleLowerCase():
        return ColorEnum.success;
      case ActionTypeEnum.Hold.toLocaleLowerCase():
        return ColorEnum.secondary;
      case ActionTypeEnum.Migrations.toLocaleLowerCase():
        return ColorEnum.primary;
      case ActionTypeEnum.Renew.toLocaleLowerCase():
        return ColorEnum.primary;
      case ActionTypeEnum.ReplaceMeals.toLocaleLowerCase():
        return ColorEnum.primary;
      case ActionTypeEnum.Resticit.toLocaleLowerCase():
        return ColorEnum.warning;
      case ActionTypeEnum.changeStartDate.toLocaleLowerCase():
        return ColorEnum.warning;
      case DislikePolicyEnum["Equational Policy"].toLocaleLowerCase():
        return ColorEnum.danger;
      case DislikePolicyEnum["Manual Policy"].toLocaleLowerCase():
        return ColorEnum.info;
      case DislikePolicyEnum["Regular Policy"].toLocaleLowerCase():
        return ColorEnum.primary;
      case DislikePolicyEnum["Spisific Qty Policy"].toLocaleLowerCase():
        return ColorEnum.secondary;
      default:
        return ColorEnum.primary;
    }
  }

  // =============================================================== Actions ===============================================================
  // EventEmitters
  @Output() PaginateOptions = new EventEmitter<IPaginateOptions>();
  @Output() clicked = new EventEmitter<any>();
  @Output() reorderData = new EventEmitter<any>();
  @Output() selected = new EventEmitter<any>();

  @Output() deliveryNote = new EventEmitter<any>();
  @Output() rowStatus = new EventEmitter<any>();
  @Output() DeliveryDetails = new EventEmitter<any>();
  @Output() filter = new EventEmitter<any>();
  @Output() details = new EventEmitter<any>();
  @Output() sub = new EventEmitter<any>();
  @Output() update = new EventEmitter<any>();
  @Output() changeMeal = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() toggle = new EventEmitter<any>();

  slideToggle(row: any, slide: MatSlideToggle) {
    this.toggle.emit({ row, slide: slide.checked });
  }

  selectedRows() {
    this.selected.emit(this.selection.selected);
  }

  clickedRow(row: any) {
    this.clicked.emit(row);
  }

  deleteRow(row: any) {
    this.delete.emit(row);
  }

  actionMethod(action: string, row: any) {
    switch (action) {
      case ActionEnum.view:
        this.details.emit(row);
        break;
      case ActionEnum.actions:
        this.details.emit(row);
        break;
      case ActionEnum.changeDeliveryDetails:
        this.DeliveryDetails.emit(row);
        break;
      case ActionEnum.changeMeal:
        this.changeMeal.emit(row);
        break;
      case ActionEnum.changeStatus:
        this.rowStatus.emit(row);
        break;
      case ActionEnum.createSubscription:
        this.sub.emit(row);
        break;
      case ActionEnum.update:
        this.update.emit(row);
        break;
      case ActionEnum.delete:
        this.openConfirmDialog(row);
        break;
      case ActionEnum.changeDeliveryNotes:
        this.deliveryNote.emit(row);
        break;
      case ActionEnum.filter:
        this.filter.emit(row);
        break;
    }
  }
}

export interface IActions {
  action: string;
  icon: string;
  label: string;
  permission: boolean;
}

export interface IComponents {
  filter?: boolean;
  columns?: boolean;
  export?: boolean;
  selection?: boolean;
  reorder?: boolean;
  footer?: boolean;
  index?: boolean;
}

export interface TableColumn {
  columnDef: string;
  header: string;
  cell: (element: any) => string;
  display: boolean;
  type: ColumnTypeEnum;
}
