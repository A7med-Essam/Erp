import { Component, Inject, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
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
import { ActionsService } from "src/app/services/actions.service";
import {
  IMeal,
  ISubscriptionTableDetails,
} from "../../subscription-component/subscription-details/subscription-details.component";
import { DeliveryStatusEnum } from "src/app/enums/subscriptions.enum";
import { IActions, TableComponent } from "src/app/pages/table/table.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ColumnTypeEnum } from "src/app/enums/columns.enum";
import { snackBarConfig } from "src/app/models/MatSnackBarConfig";
import { ActionEnum } from "src/app/enums/action.enum";
import { PermissionService } from "src/app/services/permission.service";
import { CalendarDialogComponent } from "src/app/pages/calendar-dialog/calendar-dialog.component";
import { Subject, takeUntil } from "rxjs";

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
  ],
  selector: "app-merge",
  templateUrl: "./merge.component.html",
  styleUrls: ["./merge.component.scss"],
})
export class MergeComponent implements OnDestroy {
  private unsubscribe$ = new Subject<void>();
  columns: any[] = [];
  Permissions = this._PermissionService.Permissions;
  actions: IActions[] = [
    {
      action: ActionEnum.update,
      permission: this.Permissions.SubscriptionActions.Merge,
      icon: "edit",
      label: "Change Date",
    },
  ];
  dialogForm = this._FormBuilder.group({
    Notes: ["", Validators.required],
    days: this._FormBuilder.array([]),
  });

  constructor(
    public _dialogRef: MatDialogRef<MergeComponent>,
    public _dialog: MatDialog,
    private _PermissionService: PermissionService,
    private _FormBuilder: FormBuilder,
    private _ActionsService: ActionsService,
    @Inject(MAT_DIALOG_DATA)
    public data: ISubscriptionTableDetails[]
  ) {
    this.setColumns();
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  patchDays() {
    this.data.forEach((p) => {
      p.meals.forEach((m) => {
        this.pushDays(m);
      });
    });
  }

  pushDays(meal: IMeal) {
    const daysArray = this.dialogForm.get("days") as FormArray;
    daysArray.push(
      this._FormBuilder.group({
        id: meal.id,
        dayName: meal.dayName,
        deliveryDate: meal.deliveryDate,
        deliveryAdress: meal.deliveryAdress,
        driver: meal.driver,
        branch: meal.branch,
        mealID: meal.mealID,
        mealTypeID: meal.mealTypeID,
        mealName: meal.mealName,
        mealTypeName: meal.mealTypeName,
        dayID: meal.dayID,
        dayNumberCount: meal.dayNumberCount,
        paymentsDetailsID: meal.paymentsDetailsID,
        lineState: meal.lineState,
        deliveryStatus: meal.deliveryStatus,
        notes: meal.notes,
        deliveryNotes: meal.deliveryNotes,
        autoDislikeMeal: meal.autoDislikeMeal,
        isDislikeMeal: meal.isDislikeMeal,
        extraCarb: meal.extraCarb,
        extraProtin: meal.extraProtin,
        mealNote: meal.mealNote,
        adress: meal.adress,
        actionCreate: meal.actionCreate,
      })
    );
  }

  setColumns() {
    this.columns = [];
    this.columns.push(
      {
        columnDef: "dayID",
        header: "Day ID",
        cell: (element: ISubscriptionTableDetails) =>
          `${element?.meals[0]?.dayID}`,
        display: true,
        type: ColumnTypeEnum.text,
      },
      {
        columnDef: "deliveryDate",
        header: "Delivery Date",
        cell: (element: ISubscriptionTableDetails) => [
          { value: element?.meals[0]?.dayName, type: ColumnTypeEnum.text },
          { value: element?.deliveryDate, type: ColumnTypeEnum.date },
        ],
        display: true,
        type: ColumnTypeEnum.arr,
      },
      {
        columnDef: "deliveryStatus",
        header: "Delivery Status",
        cell: (element: ISubscriptionTableDetails) =>
          `${element?.meals[0]?.deliveryStatus}`,
        display: true,
        type: ColumnTypeEnum.badge,
      }
    );
    const allMealTypes = this.data.flatMap((delivery) =>
      delivery.meals.map((meal) => meal.mealTypeName)
    );
    const uniqueMealTypes = Array.from(new Set(allMealTypes));
    const orderOfMealTypes: any = {
      BREAKFAST: 1,
      LUNCH: 2,
      DINNER: 3,
      "PRE-WORKOUT": 4,
      "AFTER-WORKOUT": 5,
      "SNACK 1": 6,
      "SNACK 2": 7,
    };
    const orderedMealTypes = uniqueMealTypes.sort((a, b) => {
      return orderOfMealTypes[a] - orderOfMealTypes[b];
    });
    orderedMealTypes.forEach((mealType, index) => {
      this.columns.push({
        columnDef: mealType + index,
        header: mealType,
        cell: (element: ISubscriptionTableDetails) =>
          element?.meals.find((meal) => meal.mealTypeName === mealType)
            ?.mealName || "",
        display: true,
        type: ColumnTypeEnum.text,
      });
    });
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.patchDays();
      this._ActionsService.Merge(form.value).subscribe({
        next: () => {
          this._dialogRef.close(true);
        },
      });
    }
  }

  updateRow(row: ISubscriptionTableDetails) {
    this._dialog
      .open(CalendarDialogComponent, {
        enterAnimationDuration: "100ms",
        exitAnimationDuration: "100ms",
        height: "500px",
        width: "400px",
        data: this.data,
        disableClose: true,
      })
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: Date) => {
        if (res) {
          this.dialogForm.patchValue({
            Notes: `${
              this.dialogForm.value.Notes
                ? this.dialogForm.value.Notes + ","
                : ""
            }${row.deliveryDate}`,
          });
          const matchingData = this.data.find(
            (d) =>
              new Date(d.deliveryDate).toDateString() ===
              new Date(res).toDateString()
          );
          const dayName = matchingData ? matchingData.meals[0].dayName : "N/A";
          row.meals = row.meals.map((m) => ({
            ...m,
            dayName,
            deliveryDate: new Date(res.toLocaleDateString('en-CA')),
          }));
          row.deliveryDate = new Date(res.toLocaleDateString('en-CA'));
        }
      });
  }
}
