import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialog,
} from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import {
  ISubDetail,
  ISubscription,
  ISubscriptionDetail,
} from "src/app/interfaces/subscription.interface";
import { ActionsService } from "src/app/services/actions.service";
import {
  IMeal,
  ISubscriptionTableDetails,
} from "../../subscription-component/subscription-details/subscription-details.component";
import {
  DeliveryStatusEnum,
  DeliveryStatusIndexEnum,
} from "src/app/enums/subscriptions.enum";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { SelectSearchDirective } from "src/app/directives/select-search.directive";
import { toSignal } from "@angular/core/rxjs-interop";
import { MealTypeSelector } from "src/app/store/mealTypeStore/mealType.selector";
import { HttpErrorResponse } from "@angular/common/http";
import {
  GET_MEAL_TYPE_FAILED,
  GET_MEAL_TYPE_START,
} from "src/app/store/mealTypeStore/mealType.action";
import { Subject, map, takeUntil } from "rxjs";
import { MatIconModule } from "@angular/material/icon";
import { MealsDialogComponent } from "../meals-dialog/meals-dialog.component";
import { IMEALS_BY_TYPE } from "src/app/interfaces/meals.interface";

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
    MatIconModule,
  ],
  selector: "app-dislike",
  templateUrl: "./dislike.component.html",
  styleUrls: ["./dislike.component.scss"],
})
export class DislikeComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  DeliveryStatus: DeliveryStatusEnum[] = [
    DeliveryStatusEnum.Deliveried,
    DeliveryStatusEnum.Hold,
    DeliveryStatusEnum.Resticited,
    DeliveryStatusEnum.Canceld,
    DeliveryStatusEnum.Pending,
  ];

  dialogForm = this._FormBuilder.group({
    Mealid: ["", Validators.required],
    OppsitMealID: [0, Validators.required],
    OppsitMealName: ["", Validators.required],
    SID: [0, Validators.required],
    Notes: "",
    mealType: [0, Validators.required],
  });
  mealTypes = toSignal(
    this._Store.select(MealTypeSelector).pipe(
      map((e) => {
        let selector = JSON.parse(JSON.stringify(e));
        selector.data = e.data?.filter((e) =>
          this.customerMealTypes.includes(e.mealTypeID)
        );
        return selector;
      })
    )
  );
  customerMeals: any[] = [];
  customerMealTypes: number[] = [];
  constructor(
    public _dialogRef: MatDialogRef<DislikeComponent>,
    private _FormBuilder: FormBuilder,
    private _ActionsService: ActionsService,
    @Inject(MAT_DIALOG_DATA)
    public data: ISubscriptionDetail,
    private _Store: Store,
    private _dialog: MatDialog
  ) {
    this.dialogForm.patchValue({
      SID: this.data.subscriptionHeader.subscriptionsID,
    });
    this.customerMealTypes = this.data.subscriptionDetails.map(
      (e) => e.mealTypeID
    );
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this._Store.dispatch(
      GET_MEAL_TYPE_FAILED({ error: new HttpErrorResponse({ error: "" }) })
    );
  }
  ngOnInit(): void {
    this.listenOnMealTypeChange();
    setTimeout(() => {
      this.GetMealTypes(this.data.subscriptionHeader.planID);
    }, 10);
  }
  GetMealTypes(PlanID: number) {
    this._Store.dispatch(GET_MEAL_TYPE_START({ PlanID }));
  }
  getMealsByMealTypeID(id: number) {
    this.customerMeals = this.data.subscriptionDetails
      .filter(
        (e) =>
          e.deliveryStatus == DeliveryStatusEnum.Hold ||
          e.deliveryStatus == DeliveryStatusEnum.Pending
      )
      .filter((e) => e.mealTypeID == id);
    const uniqueMeals = Array.from(
      new Set(this.customerMeals.map((meal) => meal.mealID))
    ).map((id) => this.customerMeals.find((meal) => meal.mealID === id));
    this.customerMeals = uniqueMeals;
  }
  listenOnMealTypeChange() {
    this.dialogForm.controls["mealType"].valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((id) => {
        if (id) {
          this.getMealsByMealTypeID(id);
        }
      });
  }
  onSubmit(form: FormGroup) {
    if (form.valid) {
      this._ActionsService.AutoDislikeMeals(form.value).subscribe({
        next: () => {
          this._dialogRef.close(true);
        },
      });
    }
  }
  openMealDialog() {
    this._dialog
      .open(MealsDialogComponent, {
        enterAnimationDuration: "100ms",
        exitAnimationDuration: "100ms",
        height: "550px",
        width: "800px",
        data: this.data.subscriptionDetails.filter(
          (e) => e.mealID == Number(this.dialogForm.value.Mealid)
        )[0],
        disableClose: true,
      })
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: IMEALS_BY_TYPE) => {
        if (res) {
          this.dialogForm.patchValue({
            OppsitMealID: res.mealID,
            OppsitMealName: res.mealName.toString(),
          });
        }
      });
  }
}
