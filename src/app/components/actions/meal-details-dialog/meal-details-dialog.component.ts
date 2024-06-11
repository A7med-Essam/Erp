import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { SelectSearchDirective } from "src/app/directives/select-search.directive";
import { IActions, TableComponent } from "src/app/pages/table/table.component";
import { IMeal } from "../../subscription-component/subscription-details/subscription-details.component";
import { ActionsService } from "src/app/services/actions.service";
import {
  CustomMealNutoritionResponse,
  ICreateCustomMealRequest,
  IMealItem,
  IMealLine,
} from "src/app/interfaces/meals.interface";
import { Subject, takeUntil } from "rxjs";
import { ItemsDialogComponent } from "../items-dialog/items-dialog.component";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { UpdateItemDialogComponent } from "../update-item-dialog/update-item-dialog.component";
import { ActionEnum } from "src/app/enums/action.enum";
import { ColumnTypeEnum } from "src/app/enums/columns.enum";
import { PermissionService } from "src/app/services/permission.service";

@Component({
  selector: "app-meal-details-dialog",
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
    MatIconModule,
    MatMenuModule,
  ],
  templateUrl: "./meal-details-dialog.component.html",
  styleUrls: ["./meal-details-dialog.component.scss"],
})
export class MealDetailsDialogComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  Permissions = this._PermissionService.Permissions;

  actions: IActions[] = [
    {
      action: ActionEnum.delete,
      permission: this.Permissions.SubscriptionActions.CreateCustomMeal,
      icon: "delete",
      label: "Delete Item",
    },
    {
      action: ActionEnum.update,
      permission: this.Permissions.SubscriptionActions.CreateCustomMeal,
      icon: "edit",
      label: "Edit Item",
    },
  ];
  MealDetails: IMealLine[] = [];
  columns = [
    {
      columnDef: "itemName",
      header: "Item Name",
      cell: (element: IMealLine) => `${element?.itemName}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "qty",
      header: "Qty",
      cell: (element: IMealLine) => `${element?.qty}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "unitName",
      header: "Unit",
      cell: (element: IMealLine) => `${element?.unitName}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
  ];
  planCategoryID: number = 0;
  displayTable: boolean = true;
  constructor(
    public _dialogRef: MatDialogRef<MealDetailsDialogComponent>,
    public _dialog: MatDialog,
    private _ActionsService: ActionsService,
    @Inject(MAT_DIALOG_DATA) public data: IMeal,
    private _PermissionService: PermissionService
  ) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.getMealDetails();
    }, 10);
  }

  // ================================ GET MEAL DETAILS ==============================
  getMealDetails() {
    this._ActionsService.GetMealByID(this.data.mealID).subscribe({
      next: (res) => {
        this.planCategoryID = res.data.planCategoryID;
        this.MealDetails = this.assignNutritions(res.data.mealLineResponse);
        this.addNutritionColumns();
      },
    });
  }

  addNutritionColumns() {
    this.columns.push(
      {
        columnDef: "calories",
        header: "Calories",
        cell: (element: IMealLine) => `${element?.calories?.toFixed(2)}`,
        display: true,
        type: ColumnTypeEnum.text,
      },
      {
        columnDef: "carb",
        header: "Carb",
        cell: (element: IMealLine) => `${element?.carb?.toFixed(2)}`,
        display: true,
        type: ColumnTypeEnum.text,
      },
      {
        columnDef: "protein",
        header: "Protein",
        cell: (element: IMealLine) => `${element?.protein?.toFixed(2)}`,
        display: true,
        type: ColumnTypeEnum.text,
      },
      {
        columnDef: "fat",
        header: "Fat",
        cell: (element: IMealLine) => `${element?.fat?.toFixed(2)}`,
        display: true,
        type: ColumnTypeEnum.text,
      },
      {
        columnDef: "sodium",
        header: "Sodium",
        cell: (element: IMealLine) => `${element?.sodium?.toFixed(2)}`,
        display: true,
        type: ColumnTypeEnum.text,
      },
      {
        columnDef: "kjl",
        header: "Kjl",
        cell: (element: IMealLine) => `${element?.kjl?.toFixed(2)}`,
        display: true,
        type: ColumnTypeEnum.text,
      }
    );
  }

  // ================================ ITEM DIALOG FEATURES ==============================
  reorder(event: IMealLine[]) {
    this.MealDetails = event;
  }
  getConcatenatedItemNames(): string {
    return this.MealDetails.map((item) => {
      return item.itemName + " " + item.qty + item.unitName;
    }).join(" W/ ");
  }

  // ================================ ADD ITEM DIALOG ==============================
  openItemDialog() {
    this._dialog
      .open(ItemsDialogComponent, {
        enterAnimationDuration: "100ms",
        exitAnimationDuration: "100ms",
        height: "450px",
        width: "800px",
        disableClose: true,
      })
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: IMealItem) => {
        if (res) {
          const newItem: IMealLine = {
            id: res.id,
            itemName: res.itemEnName,
            unitId: res.unitId,
            unitName: res.unitName,
            qty: res.defQty,
            itemType: res.itemType,
            itemId: res.id,
            mealId: this.data.mealID,
            itemNutoritionResponses: res.itemNutoritionResponses,
            calories: 0,
            carb: 0,
            protein: 0,
            fat: 0,
            kjl: 0,
            sodium: 0,
          };
          this.MealDetails.push(newItem);
          this.MealDetails = this.assignNutritions(this.MealDetails);
          this.refreshTable();
        }
      });
  }
  assignNutritions(meals: IMealLine[]): IMealLine[] {
    return meals.map((item) => {
      item.itemNutoritionResponses.forEach((e) => {
        switch (e.masterid) {
          case 1:
            item.carb = e.value;
            break;
          case 2:
            item.protein = e.value;
            break;
          case 3:
            item.fat = e.value;
            break;
          case 4:
            item.calories = e.value;
            break;
          case 5:
            item.kjl = e.value;
            break;
          case 6:
            item.sodium = e.value;
            break;
        }
      });
      return item;
    });
  }
  refreshTable() {
    this.displayTable = false;
    setTimeout(() => {
      this.displayTable = true;
    }, 1);
  }

  // ================================ UPDATE ITEM DIALOG ==============================
  updateRow(row: IMealLine) {
    this._dialog
      .open(UpdateItemDialogComponent, {
        enterAnimationDuration: "100ms",
        exitAnimationDuration: "100ms",
        height: "450px",
        width: "800px",
        data: row,
        disableClose: true,
      })
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.calcNutritions(row);
      });
  }

  calcNutritions(row: IMealLine) {
    let carb_perc = 0;
    let protein_perc = 0;
    let fat_perc = 0;
    let calories_perc = 0;
    let kjl_perc = 0;
    let sodium_perc = 0;
    row.itemNutoritionResponses.forEach((e) => {
      switch (e.masterid) {
        case 1:
          carb_perc = e.value / e.itemNutQty;
          break;
        case 2:
          protein_perc = e.value / e.itemNutQty;
          break;
        case 3:
          fat_perc = e.value / e.itemNutQty;
          break;
        case 4:
          calories_perc = e.value / e.itemNutQty;
          break;
        case 5:
          kjl_perc = e.value / e.itemNutQty;
          break;
        case 6:
          sodium_perc = e.value / e.itemNutQty;
          break;
      }
    });
    row.carb = carb_perc * row.qty;
    row.protein = protein_perc * row.qty;
    row.fat = fat_perc * row.qty;
    row.calories = calories_perc * row.qty;
    row.kjl = kjl_perc * row.qty;
    row.sodium = sodium_perc * row.qty;
  }

  // ================================ DELETE ITEM DIALOG ==============================
  deleteRow(event: IMealLine) {
    const index = this.MealDetails.indexOf(event);
    if (index !== -1) {
      this.MealDetails.splice(index, 1);
      this.refreshTable();
    }
  }

  // ================================ CREATE MEAL DIALOG ==============================
  createMeal() {
    const data: { data: ICreateCustomMealRequest; DayID: number } = {
      data: {
        mealName: this.getConcatenatedItemNames(),
        planCategoryID: this.planCategoryID,
        mealLineResponse: this.getMealResponses().meals,
        mealsNutoritionResponses: this.getMealResponses().nutoritions,
      },
      DayID: this.data.id,
    };
    if (this.MealDetails.length) {
      this._dialogRef.close(data);
    }
  }

  getMealResponses(): {
    meals: any[];
    nutoritions: CustomMealNutoritionResponse[];
  } {
    const nutoritions: CustomMealNutoritionResponse[] = [];
    const meals = this.MealDetails.map((e) => {
      nutoritions.push(...e.itemNutoritionResponses);
      return {
        id: e.id,
        itemName: e.itemName,
        unitId: e.unitId,
        unitName: e.unitName,
        qty: e.qty,
        itemType: e.itemType,
        itemId: e.itemId,
        mealId: e.mealId,
      };
    });
    return { meals, nutoritions };
  }
}
