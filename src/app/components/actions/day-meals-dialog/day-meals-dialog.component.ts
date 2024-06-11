import { Component, Inject, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialog,
} from "@angular/material/dialog";
import { ActionsService } from "src/app/services/actions.service";
import {
  IMeal,
  ISubscriptionTableDetails,
} from "../../subscription-component/subscription-details/subscription-details.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { SelectSearchDirective } from "src/app/directives/select-search.directive";
import { IActions, TableComponent } from "src/app/pages/table/table.component";
import { MatCardModule } from "@angular/material/card";
import { MealsDialogComponent } from "../meals-dialog/meals-dialog.component";
import { Subject, takeUntil } from "rxjs";
import {
  ICreateCustomMealRequest,
  IMEALS_BY_TYPE,
} from "src/app/interfaces/meals.interface";
import { MealDetailsDialogComponent } from "../meal-details-dialog/meal-details-dialog.component";
import { ActionEnum } from "src/app/enums/action.enum";
import { ColumnTypeEnum } from "src/app/enums/columns.enum";
import { PERMISSIONS } from "src/app/enums/permission.enum";
import { GuardService } from "src/app/services/guard.service";
import { PermissionService } from "src/app/services/permission.service";

@Component({
  selector: "app-day-meals-dialog",
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
  templateUrl: "./day-meals-dialog.component.html",
  styleUrls: ["./day-meals-dialog.component.scss"],
})
export class DayMealsDialogComponent implements OnDestroy {
  private unsubscribe$ = new Subject<void>();
  row: ISubscriptionTableDetails;
  Permissions = this._PermissionService.Permissions;

  constructor(
    public _dialogRef: MatDialogRef<DayMealsDialogComponent>,
    private _ActionsService: ActionsService,
    public _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: ISubscriptionTableDetails,
    private _PermissionService:PermissionService
  ) {
    this.row = data;
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  updateRow(row: IMeal) {
    this._dialog
      .open(MealDetailsDialogComponent, {
        enterAnimationDuration: "100ms",
        exitAnimationDuration: "100ms",
        height: "550px",
        width: "1200px",
        data: row,
        disableClose: true,
      })
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: {data:ICreateCustomMealRequest, DayID:number}) => {
        if (res) {
          if (res?.data?.mealLineResponse.length) {
            this._ActionsService.CreateCustomMeeal(res).subscribe({
              next: (res) => {
                this._dialogRef.close(true);
              },
              error: (err) => {
                this._dialogRef.close(false);
              },
            });
          }
        }
      });
  }

  changeMeal(row: IMeal) {
    this._dialog
      .open(MealsDialogComponent, {
        enterAnimationDuration: "100ms",
        exitAnimationDuration: "100ms",
        height: "550px",
        width: "800px",
        data: row,
        disableClose: true,
      })
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: IMEALS_BY_TYPE) => {
        if (res) {
          this._ActionsService
            .ReplaceMeal({
              DayLineID: row.id,
              MealID: res.mealID,
            })
            .subscribe({
              next: (res) => {
                this._dialogRef.close(true);
              },
              error: (err) => {
                this._dialogRef.close(false);
              },
            });
        }
      });
  }
  columns: any[] = [
    {
      columnDef: "mealTypeName",
      header: "Type",
      cell: (element: any) => `${element?.mealTypeName}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "mealName",
      header: "Meal Name",
      cell: (element: any) => `${element?.mealName}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "deliveryStatus",
      header: "Delivery Status",
      cell: (element: any) => `${element?.deliveryStatus}`,
      display: true,
      type: ColumnTypeEnum.badge,
    },
  ];

  actions: IActions[] = [
    {
      action: ActionEnum.update,
      permission: this.Permissions.SubscriptionActions.CreateCustomMeal,
      icon: "edit",
      label: "Create Custom Meal",
    },
    {
      action: ActionEnum.changeMeal,
      permission: this.Permissions.SubscriptionActions.ChangeMeal,
      icon: "change_circle",
      label: "Change Meal",
    },
  ];
}
