import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { toSignal } from "@angular/core/rxjs-interop";
import { IPaginateOptions } from "src/app/interfaces/paginator.interface";
import { GET_MEAL_ITEM_START } from "src/app/store/mealItemStore/mealItem.action";
import { MealItemSelector } from "src/app/store/mealItemStore/mealItem.selector";
import {
  MatDialogRef,
  MatDialog,
  MatDialogModule,
} from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { FeatherModule } from "angular-feather";
import { TableComponent } from "src/app/pages/table/table.component";
import { IMealItem } from "src/app/interfaces/meals.interface";
import { ColumnTypeEnum } from "src/app/enums/columns.enum";

@Component({
  selector: "app-items-dialog",
  standalone: true,
  imports: [
    MatTableModule,
    TableComponent,
    MatCardModule,
    FeatherModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: "./items-dialog.component.html",
  styleUrls: ["./items-dialog.component.scss"],
})
export class ItemsDialogComponent implements OnInit, OnDestroy {
  ngOnInit(): void {
    setTimeout(() => {
      this.GetData();
    }, 10);
  }

  columns = [
    {
      columnDef: "id",
      header: "Item ID",
      cell: (element: IMealItem) => `${element?.id}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "itemEnName",
      header: "Item Name",
      cell: (element: IMealItem) => `${element?.itemEnName}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "unitName",
      header: "Unit",
      cell: (element: IMealItem) => `${element?.unitName}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
  ];

  constructor(
    public _dialogRef: MatDialogRef<ItemsDialogComponent>,
    private _Store: Store,
    public _dialog: MatDialog
  ) {}
  ngOnDestroy(): void {
    if (this.isFilter) {
      this._Store.dispatch(
        GET_MEAL_ITEM_START({
          data: {
            pagenumber: 0,
            pagesize: 10,
          },
        })
      );
    }
  }

  TABLE_DATA = toSignal(this._Store.select(MealItemSelector));

  GetData(Options: IPaginateOptions = { pageIndex: 0, pageSize: 10 }) {
    if (!this.TABLE_DATA()?.data) {
      Options.pageIndex++;
      this._Store.dispatch(
        GET_MEAL_ITEM_START({
          data: {
            pagenumber: Options.pageIndex,
            pagesize: Options.pageSize,
          },
        })
      );
    }
  }

  Paginate(Options: IPaginateOptions = { pageIndex: 0, pageSize: 10 }) {
    Options.pageIndex++;
    this._Store.dispatch(
      GET_MEAL_ITEM_START({
        data: {
          pagenumber: Options.pageIndex,
          pagesize: Options.pageSize,
        },
      })
    );
  }

  isFilter: boolean = false;
  filter(INPUT: HTMLInputElement) {
    if (this.isFilter || INPUT.value !== "") {
      const data = {
        pagenumber: 0,
        pagesize: 50,
        ItemName: INPUT.value,
      };
      this._Store.dispatch(GET_MEAL_ITEM_START({ data }));
    } else {
      this.isFilter && this.GetData();
    }
    INPUT.blur();
    INPUT.value == "" ? (this.isFilter = false) : (this.isFilter = true);
  }

  clickedRow(e: IMealItem) {
    this._dialogRef.close(e);
  }
}
