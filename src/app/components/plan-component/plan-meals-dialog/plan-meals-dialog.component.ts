import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
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
import {
  MatSelect,
  MatSelectChange,
  MatSelectModule,
} from "@angular/material/select";
import { SelectSearchDirective } from "src/app/directives/select-search.directive";
import { IActions, TableComponent } from "src/app/pages/table/table.component";
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
import { PlanLine } from "src/app/interfaces/allPlan.interface";
import { ActionEnum } from "src/app/enums/action.enum";
import { PermissionService } from "src/app/services/permission.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { snackBarConfig } from "src/app/models/MatSnackBarConfig";

@Component({
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
    FormsModule,
  ],
  selector: "app-plan-meals-dialog",
  templateUrl: "./plan-meals-dialog.component.html",
  styleUrls: ["./plan-meals-dialog.component.scss"],
})
export class PlanMealsDialogComponent implements OnDestroy {
  TABLE_DATA = toSignal(this._Store.select(MealSelector));
  Permissions = this._PermissionService.Permissions;
  columns = [
    {
      columnDef: "mealID",
      header: "Meal ID",
      cell: (element: IMEALS_BY_TYPE) => `${element?.mealID}`,
      display: false,
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
  categories = [
    ...new Map(
      this.data.map((item) => [
        item.typeId,
        { id: item.typeId, label: item.typeName },
      ])
    ).values(),
  ];
  selectedCategory: number = this.categories[0].id;
  selectedPlan: PlanLine[] = this.data.filter(
    (item) => item.typeId == this.selectedCategory
  );
  planColumns: any[] = [
    {
      columnDef: "days",
      header: "Day-N",
      cell: (element: PlanLine) => `${element.days}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "daysNames",
      header: "Day Name",
      cell: (element: PlanLine) => `${element.daysNames}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "typeName",
      header: "Type Name",
      cell: (element: PlanLine) => `${element.typeName}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "mealName",
      header: "Meal Name",
      cell: (element: PlanLine) => `${element.mealName}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
  ];
  actions: IActions[] = [
    {
      action: ActionEnum.delete,
      permission: this.Permissions.Plan.Delete,
      icon: "delete",
      label: "Delete Meal",
    },
  ];
  tableFlag: boolean = true;
  isFilter: boolean = false;

  constructor(
    public _dialogRef: MatDialogRef<PlanMealsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PlanLine[],
    private _PermissionService: PermissionService,
    private _Store: Store,
    private _snackBar: MatSnackBar
  ) {
    this.GetData();
  }
  closeModal() {
    this._dialogRef.close();
  }
  onCategoryChange(e: MatSelectChange) {
    this.GetData();
    this.selectedPlan = this.data.filter(
      (item) => item.typeId == this.selectedCategory
    );
  }
  ngOnDestroy(): void {
    this._Store.dispatch(
      GET_MEALS_FAILED({ error: new HttpErrorResponse({ error: "" }) })
    );
  }
  Paginate(Options = { pageIndex: 0, pageSize: 10 }) {
    Options.pageIndex++;
    this._Store.dispatch(
      GET_MEALS_START({
        data: {
          MealTypeID: this.selectedCategory,
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
          MealTypeID: this.selectedCategory,
          pagenumber: Options.pageIndex,
          pagesize: Options.pageSize,
        },
      })
    );
  }
  clickedRow(e: IMEALS_BY_TYPE) {
    let mealIndex = this.selectedPlan.findIndex((meal) => meal.mealId == 0);
    if (mealIndex !== -1) {
      this.selectedPlan[mealIndex] = {
        ...this.selectedPlan[mealIndex],
        mealName: e.mealName,
        mealId: e.mealID,
      };
      this.tableFlag = false;
      setTimeout(() => {
        this.tableFlag = true;
      }, 0);
    } else {
      this._snackBar.open("All meals are selected", "✅", snackBarConfig);
    }
  }
  filter(INPUT: HTMLInputElement) {
    if (this.isFilter || INPUT.value !== "") {
      const data = {
        pagenumber: 0,
        pagesize: 10,
        mealname: INPUT.value,
        MealTypeID: this.selectedCategory,
      };
      this._Store.dispatch(GET_MEALS_START({ data }));
    } else {
      this.isFilter && this.GetData();
    }
    INPUT.blur();
    INPUT.value == "" ? (this.isFilter = false) : (this.isFilter = true);
  }
  deleteRow(request: PlanLine) {
    request.mealName = "";
    request.mealId = 0;
  }
  close() {
    this._dialogRef.close(this.selectedPlan);
  }
}
