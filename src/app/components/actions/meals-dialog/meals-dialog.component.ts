import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDatepickerModule } from "@angular/material/datepicker";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { SelectSearchDirective } from "src/app/directives/select-search.directive";
import { TableComponent } from "src/app/pages/table/table.component";
import { IMeal } from "../../subscription-component/subscription-details/subscription-details.component";
import { IMEALS_BY_TYPE } from "src/app/interfaces/meals.interface";
import { Store } from "@ngrx/store";
import {
  GET_MEALS_FAILED,
  GET_MEALS_START,
} from "src/app/store/mealsStore/meals.action";
import { HttpErrorResponse } from "@angular/common/http";
import { toSignal } from "@angular/core/rxjs-interop";
import { MealSelector } from "src/app/store/mealsStore/meals.selector";
import { ColumnTypeEnum } from "src/app/enums/columns.enum";

@Component({
  selector: "app-meals-dialog",
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSelectModule,
    SelectSearchDirective,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    TableComponent,
    MatCardModule,
  ],
  templateUrl: "./meals-dialog.component.html",
  styleUrls: ["./meals-dialog.component.scss"],
})
export class MealsDialogComponent implements OnInit, OnDestroy {
  TABLE_DATA = toSignal(this._Store.select(MealSelector));
  columns = [
    {
      columnDef: "mealID",
      header: "Meal ID",
      cell: (element: IMEALS_BY_TYPE) => `${element?.mealID}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "mealName",
      header: "Meal Name",
      cell: (element: IMEALS_BY_TYPE) => `${element?.mealName}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
  ];
  isFilter: boolean = false;

  constructor(
    public _dialogRef: MatDialogRef<MealsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IMeal,
    private _Store: Store
  ) {}
  ngOnDestroy(): void {
    this._Store.dispatch(
      GET_MEALS_FAILED({ error: new HttpErrorResponse({ error: "" }) })
    );
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.GetData();
    }, 100);
  }
  Paginate(Options = { pageIndex: 0, pageSize: 10 }) {
    Options.pageIndex++;
    this._Store.dispatch(
      GET_MEALS_START({
        data: {
          MealTypeID: this.data.mealTypeID,
          pagenumber: Options.pageIndex,
          pagesize: Options.pageSize,
        },
      })
    );
  }
  GetData(Options = { pageIndex: 0, pageSize: 10 }) {
    Options.pageIndex++;
    this._Store.dispatch(
      GET_MEALS_START({
        data: {
          MealTypeID: this.data.mealTypeID,
          pagenumber: Options.pageIndex,
          pagesize: Options.pageSize,
        },
      })
    );
  }
  clickedRow(e: IMEALS_BY_TYPE) {
    this._dialogRef.close(e);
  }
  filter(INPUT: HTMLInputElement) {
    if (this.isFilter || INPUT.value !== "") {
      const data = {
        pagenumber: 0,
        pagesize: 10,
        mealname: INPUT.value,
        MealTypeID: this.data.mealTypeID,
      };
      this._Store.dispatch(GET_MEALS_START({ data }));
    } else {
      this.isFilter && this.GetData();
    }
    INPUT.blur();
    INPUT.value == "" ? (this.isFilter = false) : (this.isFilter = true);
  }
}
