import { Component, Inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
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
import { ActionsService } from "src/app/services/actions.service";
import { ISubscriptionTableDetails } from "../../subscription-component/subscription-details/subscription-details.component";
import { DeliveryStatusEnum } from "src/app/enums/subscriptions.enum";
import { TableComponent } from "src/app/pages/table/table.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ColumnTypeEnum } from "src/app/enums/columns.enum";
import { snackBarConfig } from "src/app/models/MatSnackBarConfig";

@Component({
  selector: "app-detach",
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
  templateUrl: "./detach.component.html",
  styleUrls: ["./detach.component.scss"],
})
export class DetachComponent {
  dialogForm = this._FormBuilder.group({
    dates: new Array(),
    Notes: [""],
    SID: 0,
  });
  columns: any[] = [];

  constructor(
    public _dialogRef: MatDialogRef<DetachComponent>,
    private _FormBuilder: FormBuilder,
    private _ActionsService: ActionsService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA)
    public data: { SID: number; plan: ISubscriptionTableDetails[] }
  ) {
    this.dialogForm.patchValue({
      SID: this.data.SID,
    });
    this.currentPlan = this.filterDeliveries();
    this.setColumns();
  }

  currentPlan: ISubscriptionTableDetails[] = [];

  filterDeliveries() {
    return this.data.plan.filter((plan) => {
      return plan.meals.every(
        (meal) =>
          meal.deliveryStatus !== DeliveryStatusEnum.Deliveried &&
          meal.deliveryStatus !== DeliveryStatusEnum.Resticited
      );
    });
  }

  setColumns() {
    this.columns = [];
    this.columns.push(
      {
        columnDef: "dayID",
        header: "Day ID",
        cell: (element: ISubscriptionTableDetails) => `${element?.meals[0]?.dayID}`,
        display: false,
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
        cell: (element: ISubscriptionTableDetails) => `${element?.meals[0]?.deliveryStatus}`,
        display: true,
        type: ColumnTypeEnum.badge,
      }
    );
    const allMealTypes = this.currentPlan.flatMap((delivery) =>
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

    this.columns.push(
      {
        columnDef: "branch",
        header: "Branch",
        cell: (element: ISubscriptionTableDetails) => element?.meals[0]?.branch,
        display: false,
        type: ColumnTypeEnum.text,
      },
      {
        columnDef: "autoDislikeMeal",
        header: "Auto Dislike Meal",
        cell: (element: ISubscriptionTableDetails) => `${element?.meals[0]?.autoDislikeMeal}`,
        display: false,
        type: ColumnTypeEnum.text,
      },
      {
        columnDef: "deliveryAdress",
        header: "Delivery Adress",
        cell: (element: ISubscriptionTableDetails) => `${element?.meals[0]?.deliveryAdress}`,
        display: false,
        type: ColumnTypeEnum.text,
      },
      {
        columnDef: "deliveryNotes",
        header: "Delivery Notes",
        cell: (element: ISubscriptionTableDetails) => `${element?.meals[0]?.deliveryNotes}`,
        display: false,
        type: ColumnTypeEnum.text,
      },
      {
        columnDef: "driver",
        header: "Driver",
        cell: (element: ISubscriptionTableDetails) => `${element?.meals[0]?.driver}`,
        display: false,
        type: ColumnTypeEnum.text,
      },
      {
        columnDef: "extraCarb",
        header: "Extra Carb",
        cell: (element: ISubscriptionTableDetails) => `${element?.meals[0]?.extraCarb}`,
        display: false,
        type: ColumnTypeEnum.text,
      },
      {
        columnDef: "extraProtin",
        header: "Extra Protin",
        cell: (element: ISubscriptionTableDetails) => `${element?.meals[0]?.extraProtin}`,
        display: false,
        type: ColumnTypeEnum.text,
      },
      {
        columnDef: "mealNote",
        header: "Meal Note",
        cell: (element: ISubscriptionTableDetails) => ``,
        display: false,
        type: ColumnTypeEnum.dialog,
      },
      {
        columnDef: "notes",
        header: "Notes",
        cell: (element: ISubscriptionTableDetails) => `${element?.meals[0]?.notes}`,
        display: false,
        type: ColumnTypeEnum.text,
      },

      {
        columnDef: "dayNumberCount",
        header: "Day Number Count",
        cell: (element: ISubscriptionTableDetails) => `${element?.meals[0]?.dayNumberCount}`,
        display: false,
        type: ColumnTypeEnum.text,
      },
      {
        columnDef: "paymentsDetailsID",
        header: "Invoice Number",
        cell: (element: ISubscriptionTableDetails) =>
          `${
            element?.meals[0]?.paymentsDetailsID == null
              ? "None"
              : element?.meals[0]?.paymentsDetailsID
          }`,
        display: false,
        type: ColumnTypeEnum.text,
      },
      {
        columnDef: "lineState",
        header: "Line State",
        cell: (element: ISubscriptionTableDetails) => `${element?.meals[0]?.lineState}`,
        display: false,
        type: ColumnTypeEnum.badge,
      },
      {
        columnDef: "adress",
        header: "Address",
        cell: (element: ISubscriptionTableDetails) => `${element?.meals[0]?.adress}`,
        display: false,
        type: ColumnTypeEnum.text,
      }
    );
  }

  currentSelectedRows: ISubscriptionTableDetails[] = [];
  getSelectedRows(e: ISubscriptionTableDetails[]) {
    this.currentSelectedRows = e;
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      if (this.currentSelectedRows.length) {
        this.dialogForm.patchValue({
          dates: this.currentSelectedRows.map((e) => e.deliveryDate.toString()),
        });
        this._ActionsService.Detach(form.value).subscribe({
          next: () => {
            this._dialogRef.close(true);
          },
        });
      } else {
        this._snackBar.open("Please select rows", "❌", snackBarConfig);
      }
    }
  }
}
