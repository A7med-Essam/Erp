import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
} from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { Store } from "@ngrx/store";
import { Subject, takeUntil } from "rxjs";
import { subscriptionBySidSelector } from "src/app/store/subscriptionBySidStore/subscriptionBySid.selector";
import { MatTableModule } from "@angular/material/table";
import { IActions, TableComponent } from "src/app/pages/table/table.component";
import { MatCardModule } from "@angular/material/card";
import { FeatherModule } from "angular-feather";
import { CommonModule } from "@angular/common";
import { DeliveryStatusEnum } from "src/app/enums/subscriptions.enum";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { DayMealsDialogComponent } from "../../actions/day-meals-dialog/day-meals-dialog.component";
import { ChangeDeliveryDetailsComponent } from "../../actions/change-delivery-details/change-delivery-details.component";
import { ISubscription } from "src/app/interfaces/subscription.interface";
import { ChangeStatusComponent } from "../../actions/change-status/change-status.component";
import { ActionEnum } from "src/app/enums/action.enum";
import { ColumnTypeEnum } from "src/app/enums/columns.enum";
import { ChangeDeliveryNoteDialogComponent } from "../../actions/change-delivery-note-dialog/change-delivery-note-dialog.component";
import { PermissionService } from "src/app/services/permission.service";
import { snackBarConfig } from "src/app/models/MatSnackBarConfig";
import { InvoiceLog } from "src/app/interfaces/log.interface";

@Component({
  selector: "app-subscription-details",
  templateUrl: "./subscription-details.component.html",
  styleUrls: ["./subscription-details.component.scss"],
  standalone: true,
  imports: [
    MatTableModule,
    TableComponent,
    MatCardModule,
    FeatherModule,
    CommonModule,
  ],
})
export class SubscriptionDetailsComponent implements OnDestroy, OnChanges {
  private unsubscribe$ = new Subject<void>();
  TABLE_DATA = toSignal(this._Store.select(subscriptionBySidSelector));
  SUBSCRIPTION_DATA$ = this._Store.select(subscriptionBySidSelector);
  combinedMealDeliveryArray: ISubscriptionTableDetails[] = [];
  Permissions = this._PermissionService.Permissions;

  columns: any[] = [];
  actions: IActions[] = [
    {
      action: ActionEnum.update,
      permission:
        this.Permissions.SubscriptionActions.ChangeMeal ||
        this.Permissions.SubscriptionActions.CreateCustomMeal,
      icon: "edit",
      label: "Update Row",
    },
    {
      action: ActionEnum.changeDeliveryDetails,
      permission: this.Permissions.SubscriptionActions.ChangeDeliveryDetails,
      icon: "edit_location_alt",
      label: "Change Delivery Details",
    },
    {
      action: ActionEnum.changeStatus,
      permission: this.Permissions.SubscriptionActions.ChangeStatus,
      icon: "hotel_class",
      label: "Change Status",
    },
    {
      action: ActionEnum.changeDeliveryNotes,
      permission: this.Permissions.SubscriptionActions.ChangeDeliveryNotes,
      icon: "new_releases",
      label: "Change Delivery Notes",
    },
  ];
  displayedColumns: any;

  constructor(
    private _Store: Store,
    private _snackBar: MatSnackBar,
    public _dialog: MatDialog,
    private _PermissionService: PermissionService
  ) {
    this.getCombinedMealDeliveryArray();
  }

  getCombinedMealDeliveryArray() {
    this.SUBSCRIPTION_DATA$.pipe(takeUntil(this.unsubscribe$)).subscribe(
      (res) => {
        const aggregatedByDeliveryDate: any = {};
        res?.data?.subscriptionDetails.forEach((meal) => {
          const deliveryDate = meal.deliveryDate;
          if (!aggregatedByDeliveryDate[deliveryDate]) {
            aggregatedByDeliveryDate[deliveryDate] = {
              deliveryDate,
              meals: [],
            };
          }
          aggregatedByDeliveryDate[deliveryDate].meals.push(meal);
        });
        this.combinedMealDeliveryArray = Object.values(
          aggregatedByDeliveryDate
        );
        this.combinedMealDeliveryArray.sort((a: any, b: any) => {
          return (
            new Date(a.deliveryDate).getTime() -
            new Date(b.deliveryDate).getTime()
          );
        });
        this.setColumns();
        this.getDisplayedColumns();
        this.TransferData(this.combinedMealDeliveryArray);
        this.getStaticsOfDeliveryStatus();
      }
    );
  }

  @Input() currentInvoice!: InvoiceLog | undefined;
  @Input() FilterChip: string = "";

  ngOnChanges(): void {
    this.filterByInvoice();
    this.filterByDeliveryStatus();
  }

  filterByInvoice() {
    if (this.currentInvoice) {
      this.getCombinedMealDeliveryArray();
      this.combinedMealDeliveryArray = this.combinedMealDeliveryArray
        .map((e) => {
          return {
            ...e,
            meals: e.meals.filter(
              (m) => m.paymentsDetailsID == this.currentInvoice?.invoiceNumber
            ),
          };
        })
        .filter((item) => item.meals.length > 0);
      this.currentInvoice = undefined;
    }
  }
  filterByDeliveryStatus() {
    if (this.FilterChip != "All" && this.FilterChip != "") {
      this.getCombinedMealDeliveryArray();
      this.combinedMealDeliveryArray = this.combinedMealDeliveryArray
        .map((e) => {
          return {
            ...e,
            meals: e.meals.filter((m) => m.deliveryStatus == this.FilterChip),
          };
        })
        .filter((item) => item.meals.length > 0);
    } else if (this.FilterChip == "All") {
      this.getCombinedMealDeliveryArray();
    }
  }

  @Output() deliveryStatusStatics = new EventEmitter<IDeliveryStatusStatics>();
  getStaticsOfDeliveryStatus() {
    this.deliveryStatusStatics.emit({
      restricted: this.combinedMealDeliveryArray.filter(
        (e) => e.meals?.[0]?.deliveryStatus == DeliveryStatusEnum.Resticited
      ),
      hold: this.combinedMealDeliveryArray.filter(
        (e) => e.meals?.[0]?.deliveryStatus == DeliveryStatusEnum.Hold
      ),
      cancelled: this.combinedMealDeliveryArray.filter(
        (e) => e.meals?.[0]?.deliveryStatus == DeliveryStatusEnum.Canceld
      ),
      delivered: this.combinedMealDeliveryArray.filter(
        (e) => e.meals?.[0]?.deliveryStatus == DeliveryStatusEnum.Deliveried
      ),
      pending: this.combinedMealDeliveryArray.filter(
        (e) => e.meals?.[0]?.deliveryStatus == DeliveryStatusEnum.Pending
      ),
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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
    const allMealTypes = this.combinedMealDeliveryArray.flatMap((delivery) =>
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
        cell: (element: ISubscriptionTableDetails) =>
          `${element?.meals[0]?.autoDislikeMeal}`,
        display: false,
        type: ColumnTypeEnum.text,
      },
      {
        columnDef: "deliveryAdress",
        header: "Delivery Adress",
        cell: (element: ISubscriptionTableDetails) =>
          `${element?.meals[0]?.deliveryAdress}`,
        display: false,
        type: ColumnTypeEnum.text,
      },
      {
        columnDef: "deliveryNotes",
        header: "Delivery Notes",
        cell: (element: ISubscriptionTableDetails) =>
          `${element?.meals[0]?.deliveryNotes}`,
        display: false,
        type: ColumnTypeEnum.text,
      },
      {
        columnDef: "driver",
        header: "Driver",
        cell: (element: ISubscriptionTableDetails) =>
          `${element?.meals[0]?.driver}`,
        display: false,
        type: ColumnTypeEnum.text,
      },
      {
        columnDef: "extraCarb",
        header: "Extra Carb",
        cell: (element: ISubscriptionTableDetails) =>
          `${element?.meals[0]?.extraCarb}`,
        display: false,
        type: ColumnTypeEnum.text,
      },
      {
        columnDef: "extraProtin",
        header: "Extra Protin",
        cell: (element: ISubscriptionTableDetails) =>
          `${element?.meals[0]?.extraProtin}`,
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
        cell: (element: ISubscriptionTableDetails) =>
          `${element?.meals[0]?.notes}`,
        display: false,
        type: ColumnTypeEnum.text,
      },

      {
        columnDef: "dayNumberCount",
        header: "Day Number Count",
        cell: (element: ISubscriptionTableDetails) =>
          `${element?.meals[0]?.dayNumberCount}`,
        display: true,
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
        display: true,
        type: ColumnTypeEnum.text,
      },
      {
        columnDef: "lineState",
        header: "Line State",
        cell: (element: ISubscriptionTableDetails) =>
          `${element?.meals[0]?.lineState}`,
        display: true,
        type: ColumnTypeEnum.badge,
      },
      {
        columnDef: "adress",
        header: "Address",
        cell: (element: ISubscriptionTableDetails) =>
          `${element?.meals[0]?.adress}`,
        display: false,
        type: ColumnTypeEnum.text,
      },
      {
        columnDef: "actionCreate",
        header: "Action Create",
        cell: (element: ISubscriptionTableDetails) =>
          `${element?.meals[0]?.actionCreate}`,
        display: true,
        type: ColumnTypeEnum.badge,
      }
    );
  }

  getDisplayedColumns() {
    this.displayedColumns = this.columns
      .filter((cd) => cd.display)
      .map((c) => c.columnDef);
  }

  @Output() selectedRows = new EventEmitter<ISubscriptionTableDetails[]>();
  getSelectedRows(e: ISubscriptionTableDetails[]) {
    this.selectedRows.emit(e);
  }

  @Output() RefreshPlan = new EventEmitter<boolean>();
  updateRow(row: ISubscriptionTableDetails) {
    if (
      row.meals[0].deliveryStatus == DeliveryStatusEnum.Deliveried ||
      row.meals[0].deliveryStatus == DeliveryStatusEnum.Resticited
    ) {
      this._snackBar.open(
        "Cannot edit delivered or resticited day",
        "❌",
        snackBarConfig
      );
    } else {
      this._dialog
        .open(DayMealsDialogComponent, {
          enterAnimationDuration: "100ms",
          exitAnimationDuration: "100ms",
          height: "500px",
          width: "800px",
          data: row,
          disableClose: true,
        })
        .afterClosed()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res: boolean) => {
          if (res) {
            this.RefreshPlan.emit(true);
          }
        });
    }
  }

  updateDeliveryDetails(row: ISubscriptionTableDetails) {
    if (row.meals[0].deliveryStatus == DeliveryStatusEnum.Deliveried) {
      this._snackBar.open("Cannot edit delivered day", "❌", snackBarConfig);
    } else {
      this._dialog
        .open(ChangeDeliveryDetailsComponent, {
          enterAnimationDuration: "100ms",
          exitAnimationDuration: "100ms",
          height: "490px",
          width: "600px",
          data: {
            subscriptionsHeader: this.subscriptionHeader,
            row,
          },
          disableClose: true,
        })
        .afterClosed()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res: boolean) => {
          if (res) {
            this.RefreshPlan.emit(true);
          }
        });
    }
  }

  ChangeStatus(row: ISubscriptionTableDetails) {
    if (this.Permissions.SubscriptionActions.ChangeStatus) {
      if (
        row.meals[0].deliveryStatus == DeliveryStatusEnum.Deliveried ||
        row.meals[0].deliveryStatus == DeliveryStatusEnum.Resticited
      ) {
        this._snackBar.open(
          "Cannot edit delivered or resticited day",
          "❌",
          snackBarConfig
        );
      } else {
        this._dialog
          .open(ChangeStatusComponent, {
            enterAnimationDuration: "100ms",
            exitAnimationDuration: "100ms",
            height: "230px",
            width: "500px",
            data: {
              subscriptionsHeader: this.subscriptionHeader,
              row,
            },
            disableClose: true,
          })
          .afterClosed()
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe((res: boolean) => {
            if (res) {
              this.RefreshPlan.emit(true);
            }
          });
      }
    }
  }

  @Output() onManipulateData = new EventEmitter<any>();
  public TransferData(data: ISubscriptionTableDetails[]): void {
    this.onManipulateData.emit(data);
  }

  @Input() subscriptionHeader!: ISubscription | undefined;

  updateDeliveryNotes(row: ISubscriptionTableDetails) {
    this._dialog
      .open(ChangeDeliveryNoteDialogComponent, {
        enterAnimationDuration: "100ms",
        exitAnimationDuration: "100ms",
        height: "410px",
        width: "800px",
        data: {
          subscriptionsHeader: this.subscriptionHeader,
          row,
        },
        disableClose: true,
      })
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: boolean) => {
        if (res) {
          this.RefreshPlan.emit(true);
        }
      });
  }
}

export interface ISubscriptionTableDetails {
  deliveryDate: Date;
  meals: IMeal[];
}

export interface IMeal {
  id: number;
  deliveryAdress: number;
  driver: string;
  branch: string;
  mealID: number;
  mealTypeID: number;
  mealName: string;
  mealTypeName: string;
  dayID: number;
  dayName: string;
  deliveryDate: Date;
  dayNumberCount: number;
  paymentsDetailsID: null;
  lineState: string;
  deliveryStatus: string;
  notes: null;
  deliveryNotes: null;
  autoDislikeMeal: boolean;
  isDislikeMeal: boolean;
  extraCarb: number;
  extraProtin: number;
  mealNote: null;
  adress: string;
  actionCreate: string;
}

export interface IDeliveryStatusStatics {
  restricted: ISubscriptionTableDetails[];
  hold: ISubscriptionTableDetails[];
  cancelled: ISubscriptionTableDetails[];
  delivered: ISubscriptionTableDetails[];
  pending: ISubscriptionTableDetails[];
}
