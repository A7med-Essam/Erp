import {
  AfterContentInit,
  AfterViewInit,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from "@angular/core";
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
import { MatSelectChange, MatSelectModule } from "@angular/material/select";
import { SelectSearchDirective } from "src/app/directives/select-search.directive";
import { ActionsService } from "src/app/services/actions.service";
import { toSignal } from "@angular/core/rxjs-interop";
import {
  GET_MEAL_TYPE_FAILED,
  GET_MEAL_TYPE_START,
} from "src/app/store/mealTypeStore/mealType.action";
import { MealTypeSelector } from "src/app/store/mealTypeStore/mealType.selector";
import { GET_PLAN_CATEGORY_START } from "src/app/store/planCategoryStore/plan-category.action";
import {
  GET_PLAN_FAILED,
  GET_PLAN_START,
} from "src/app/store/planStore/plan.action";
import { Store } from "@ngrx/store";
import { PlanCategorySelector } from "src/app/store/planCategoryStore/plan-category.selector";
import { PlanSelector } from "src/app/store/planStore/plan.selector";
import { HttpErrorResponse } from "@angular/common/http";
import { ISubscription } from "src/app/interfaces/subscription.interface";
import { IMEAL_TYPE } from "src/app/interfaces/meal-type.interface";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: "app-change-meal-types",
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
  ],
  templateUrl: "./change-meal-types.component.html",
  styleUrls: ["./change-meal-types.component.scss"],
})
export class ChangeMealTypesComponent implements OnInit, OnDestroy {
  mealTypes = toSignal(this._Store.select(MealTypeSelector));
  private unsubscribe$ = new Subject<void>();

  dialogForm = this._FormBuilder.group({
    mealsType: [new Array({}), Validators.required],
    Notes: [""],
    SID: 0,
  });

  constructor(
    public _dialogRef: MatDialogRef<ChangeMealTypesComponent>,
    private _FormBuilder: FormBuilder,
    private _ActionsService: ActionsService,
    private _Store: Store,
    @Inject(MAT_DIALOG_DATA) public data: ISubscription
  ) {}

  getDefaultMealTypes(): IMEAL_TYPE[] {
    const mealTypes = this.data.mealTypes.split("|");
    return mealTypes
      .map((meal) => {
        return (
          this.mealTypes()?.data?.filter((e) => e.mealTypeName == meal) || []
        );
      })
      .flat();
  }

  ngOnDestroy(): void {
    this._Store.dispatch(
      GET_PLAN_FAILED({ error: new HttpErrorResponse({ error: "" }) })
    );
    this._Store.dispatch(
      GET_MEAL_TYPE_FAILED({ error: new HttpErrorResponse({ error: "" }) })
    );
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.GetMealTypes(this.data.planID);

      this._Store.select(MealTypeSelector)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res) => {
          if (res.data) {
            this.dialogForm.patchValue({
              mealsType: this.getDefaultMealTypes(),
            });
          }
        },
      });
    }, 1);
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.dialogForm.patchValue({
        SID: this.data.subscriptionsID,
      });
      this._ActionsService.ChangeMealTypes(form.value).subscribe({
        next: () => {
          this._dialogRef.close(true);
        },
      });
    }
  }

  GetMealTypes(PlanID: number) {
    this._Store.dispatch(GET_MEAL_TYPE_START({ PlanID }));
  }
}
