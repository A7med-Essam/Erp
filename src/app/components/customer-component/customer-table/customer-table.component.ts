import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { ICustomerInfo } from "src/app/interfaces/customer.interface";
import { IPaginateOptions } from "src/app/interfaces/paginator.interface";
import { GET_AREA_START } from "src/app/store/areaStore/area.action";
import { AreaSelector } from "src/app/store/areaStore/area.selector";
import { GET_CUSTOMER_CATEGORY_START } from "src/app/store/customerCategoryStore/customerCategory.action";
import { customerCategorySelector } from "src/app/store/customerCategoryStore/customerCategory.selector";
import {
  GET_CUSTOMER_FAILED,
  GET_CUSTOMER_START,
} from "src/app/store/customerStore/customer.action";
import { customerSelector } from "src/app/store/customerStore/customer.selector";
import { AddCustomerComponent } from "../add-customer/add-customer.component";
import { Subject, takeUntil } from "rxjs";
import { MatTableModule } from "@angular/material/table";
import { IActions, TableComponent } from "src/app/pages/table/table.component";
import { MatCardModule } from "@angular/material/card";
import { FeatherModule } from "angular-feather";
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { ColumnTypeEnum } from "src/app/enums/columns.enum";

@Component({
  selector: "app-customer-table",
  templateUrl: "./customer-table.component.html",
  styleUrls: ["./customer-table.component.scss"],
  standalone: true,
  imports: [
    MatTableModule,
    TableComponent,
    MatCardModule,
    FeatherModule,
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
})
export class CustomerTableComponent implements OnInit, OnDestroy {
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
      columnDef: "customerType",
      header: "Customer Type",
      cell: (element: ICustomerInfo) => `${element?.customerType}`,
      display: true,
      type: ColumnTypeEnum.badge,
    },
  ];
  TABLE_DATA = toSignal(this._Store.select(customerSelector));
  AREA_DATA = toSignal(this._Store.select(AreaSelector));
  CATEGORY_DATA = toSignal(this._Store.select(customerCategorySelector));
  private unsubscribe$ = new Subject<void>();

  constructor(
    private _Store: Store,
    public dialog: MatDialog,
    public _DialogRef: MatDialogRef<CustomerTableComponent>
  ) {
    this.GetArea();
    this.GetCategory();
  }
  ngOnDestroy(): void {
    this._Store.dispatch(
      GET_CUSTOMER_FAILED({
        error: new HttpErrorResponse({ error: "" }),
      })
    );
    this.GetData();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.GetData();
  }

  openCreateDialog(
    enterAnimationDuration: string = "100ms",
    exitAnimationDuration: string = "100ms",
    row: any = null
  ): void {
    this.dialog
      .open(AddCustomerComponent, {
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
      })
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: boolean) => {
        this._DialogRef.close(res);
      });
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

  GetData(Options: IPaginateOptions = { pageIndex: 0, pageSize: 10 }) {
    if (!this.TABLE_DATA()?.data) {
      Options.pageIndex++;
      this._Store.dispatch(GET_CUSTOMER_START({ data: Options }));
    }
  }

  clickedRow(e: ICustomerInfo) {
    this._DialogRef.close(e);
  }

  Paginate(Options: IPaginateOptions = { pageIndex: 0, pageSize: 10 }) {
    Options.pageIndex++;
    this._Store.dispatch(GET_CUSTOMER_START({ data: Options }));
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

}
