import { Component, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { SelectSearchDirective } from "src/app/directives/select-search.directive";
import { MatCardModule } from "@angular/material/card";
import { MatSelectModule } from "@angular/material/select";
import { PlanService } from "src/app/services/plan.service";
import {
  ICreatePlanResponse,
  IFullMealType,
  IFullPlanDays,
  ITransformedPlanPrice,
  PlanLine,
  PlanPrice,
} from "src/app/interfaces/allPlan.interface";
import { Subject, takeUntil } from "rxjs";
import { PlanCategorySelector } from "src/app/store/planCategoryStore/plan-category.selector";
import { toSignal } from "@angular/core/rxjs-interop";
import { Store } from "@ngrx/store";
import { GET_PLAN_CATEGORY_START } from "src/app/store/planCategoryStore/plan-category.action";
import { IActions, TableComponent } from "src/app/pages/table/table.component";
import { ColumnTypeEnum } from "src/app/enums/columns.enum";
import { ActionEnum } from "src/app/enums/action.enum";
import { PermissionService } from "src/app/services/permission.service";
import { PlanPriceDialogComponent } from "../plan-price-dialog/plan-price-dialog.component";
import { PlanMealsDialogComponent } from "../plan-meals-dialog/plan-meals-dialog.component";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { Router } from "@angular/router";
import { GET_ALL_PLAN_FAILED } from "src/app/store/allPlanStore/all-plan.action";
import { HttpErrorResponse } from "@angular/common/http";
import { AllMealTypeSelector } from "src/app/store/allMealTypeStore/all-MealType.selector";
import { AllPlanDaySelector } from "src/app/store/allPlanDaysStore/all-PlanDays.selector";
import { GET_ALL_MEAL_TYPES_START } from "src/app/store/allMealTypeStore/all-MealType.action";
import { GET_ALL_PLAN_DAYS_START } from "src/app/store/allPlanDaysStore/all-PlanDays.action";

@Component({
  selector: "app-create-plan",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    SelectSearchDirective,
    MatCardModule,
    MatSelectModule,
    TableComponent,
    MatSlideToggleModule,
  ],
  templateUrl: "./create-plan.component.html",
  styleUrls: ["./create-plan.component.scss"],
})
export class CreatePlanComponent implements OnDestroy {
  private unsubscribe$ = new Subject<void>();
  Permissions = this._PermissionService.Permissions;
  planCategories = toSignal(this._Store.select(PlanCategorySelector));
  allMealTypes = toSignal(this._Store.select(AllMealTypeSelector));
  allPlanDays = toSignal(this._Store.select(AllPlanDaySelector));
  createForm = this._FormBuilder.group({
    id: [0],
    planId: [0],
    isActive: [false],
    planExprission: [""],
    defaultSticker: [""],
    planName: ["", Validators.required],
    planCategory: [0, Validators.required],
    mealsType: ["", Validators.required],
    planDays: ["", Validators.required],
    planPrice: this._FormBuilder.array([]),
    lines: this._FormBuilder.array([]),
    startDate: ["", Validators.required],
    daysCount: [1, [Validators.required, Validators.min(1)]],
    startDay: [
      {
        value: "",
        disabled: true,
      },
      Validators.required,
    ],
  });
  priceList: any[] = [];
  priceListFlag: boolean = true;
  planPriceColumns: any[] = [];
  planMealColumns: any[] = [
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
      action: ActionEnum.update,
      permission: this.Permissions.Plan.Create,
      icon: "edit",
      label: "Update Row",
    },
  ];
  constructor(
    private _FormBuilder: FormBuilder,
    private _PlanService: PlanService,
    private _Store: Store,
    private _PermissionService: PermissionService,
    private _dialog: MatDialog,
    private _router: Router
  ) {
    this.GetPlanCategories();
    this.getMealsType();
    this.getPlanDays();
    this.onStartDateChange();
    this.patchOnEdit();
  }
  private patchOnEdit() {
    if (this._PlanService.plan.value) {
      this.createForm.patchValue({
        startDate: this._PlanService.plan.value.startDate.toString(),
        startDay: this._PlanService.plan.value.startDay.toString(),
        planId: this._PlanService.plan.value.planId,
        id: this._PlanService.plan.value.id,
        isActive: this._PlanService.plan.value.isActive,
        planCategory: this._PlanService.plan.value.categoryID,
        planName: this._PlanService.plan.value.planName,
        planExprission: this._PlanService.plan.value.planExprission,
        defaultSticker: this._PlanService.plan.value.defaultSticker,
        daysCount: this._PlanService.plan.value.daysCount,
      });
      this._PlanService.plan.value.planPrice.forEach((e) => {
        this.addPlanPrice(e);
      });
      this._PlanService.plan.value.planLines.forEach((e) => {
        this.addLine(e);
      });
      this.transformPriceTable(this._PlanService.plan.value.planPrice);
    }
  }
  ngOnDestroy(): void {
    this._PlanService.plan.next(null);
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  private GetPlanCategories() {
    if (!this.planCategories()?.data) {
      this._Store.dispatch(GET_PLAN_CATEGORY_START());
    }
  }
  private getMealsType() {
    if (!this.allMealTypes()?.data) {
      this._Store.dispatch(GET_ALL_MEAL_TYPES_START());
    }
    this._Store
      .select(AllMealTypeSelector)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res) => {
          if (res?.data) {
            if (this._PlanService.plan.value) {
              this.createForm.patchValue({
                mealsType:
                  (res?.data?.filter((e) =>
                    this._PlanService?.plan?.value?.mealsTypes
                      .map((e) => e.typeID)
                      .includes(e.typeID)
                  ) as any) || [],
              });
            }
          }
        },
      });
  }
  private getPlanDays() {
    if (!this.allPlanDays()?.data) {
      this._Store.dispatch(GET_ALL_PLAN_DAYS_START());
    }

    this._Store
      .select(AllPlanDaySelector)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res) => {
          if (res?.data) {
            if (this._PlanService.plan.value) {
              this.createForm.patchValue({
                planDays:
                  (res.data?.filter((e) =>
                    this._PlanService?.plan?.value?.planDays
                      .map((e) => e.id)
                      .includes(e.id)
                  ) as any) || [],
              });
            }
          }
        },
      });
  }
  private refreshPriceList() {
    this.priceListFlag = false;
    setTimeout(() => {
      this.priceListFlag = true;
    }, 10);
  }
  private transformPriceTable(res: PlanPrice[]) {
    const groupedByDayName = res.reduce((acc: any, item) => {
      if (!acc[item.dayName]) {
        acc[item.dayName] = {};
      }
      acc[item.dayName][item.typeName] = item.amount;
      return acc;
    }, {});
    this.priceList = Object.keys(groupedByDayName).map((dayName) => ({
      dayName: dayName,
      ...groupedByDayName[dayName],
    }));
    this.planPriceColumns = [
      {
        columnDef: "dayName",
        header: "Day",
        cell: (element: any) => `${element.dayName}`,
        display: true,
        type: ColumnTypeEnum.text,
      },
      ...Object.keys(Object.values(groupedByDayName)[0] as object).map(
        (typeName) => ({
          columnDef: typeName,
          header: typeName,
          cell: (element: any) => `${element[typeName]}`,
          display: true,
          type: ColumnTypeEnum.text,
        })
      ),
    ];
    this.refreshPriceList();
  }
  private addPlanPrice(price: PlanPrice) {
    const planPrices = this.createForm.get("planPrice") as FormArray;
    planPrices.push(this._FormBuilder.control(price, Validators.required));
  }
  private addLine(line: PlanLine) {
    const lines = this.createForm.get("lines") as FormArray;
    lines.push(this._FormBuilder.control(line, Validators.required));
  }
  private getDayName(date: Date) {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayIndex = date.getDay();
    this.createForm.patchValue({
      startDay: daysOfWeek[dayIndex],
    });
  }
  onStartDateChange() {
    this.createForm.controls["startDate"].valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        if (res) {
          this.getDayName(new Date(res));
        }
      });
  }
  updatePrice(row: ITransformedPlanPrice) {
    this._dialog
      .open(PlanPriceDialogComponent, {
        enterAnimationDuration: "100ms",
        exitAnimationDuration: "100ms",
        height: "500px",
        width: "700px",
        data: row,
        disableClose: true,
      })
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: ITransformedPlanPrice) => {
        this.priceList = this.priceList.map((item) =>
          item.dayName === res.dayName ? res : item
        );
        const planPrices = this.createForm.get("planPrice") as FormArray;
        Object.keys(res).forEach((key) => {
          const index = planPrices.controls.findIndex(
            (control) =>
              control.value.typeName == key &&
              control.value.dayName == res.dayName
          );
          if (index !== -1) {
            planPrices.controls[index].patchValue({
              ...planPrices.controls[index].value,
              amount: res[planPrices.controls[index].value.typeName],
            });
          }
        });
      });
  }
  selectMeals() {
    this._dialog
      .open(PlanMealsDialogComponent, {
        enterAnimationDuration: "100ms",
        exitAnimationDuration: "100ms",
        height: "800px",
        width: "1400px",
        data: this.createForm.value.lines,
        disableClose: true,
      })
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: PlanLine[]) => {
        if (res) {
          const planMeals = this.createForm.get("lines") as FormArray;
          res.forEach((updatedLine: PlanLine) => {
            const index = planMeals.controls.findIndex(
              (control) =>
                control.value.typeId === updatedLine.typeId &&
                control.value.days === updatedLine.days
            );
            if (index !== -1) {
              planMeals.at(index).patchValue(updatedLine);
            }
          });
        }
      });
  }
  onGeneratePlan(form: FormGroup) {
    if (form.valid) {
      this._PlanService.CreatePlan(form.value).subscribe({
        next: (res) => {
          const planPrices = this.createForm.get("planPrice") as FormArray;
          const lines = this.createForm.get("lines") as FormArray;
          planPrices.clear();
          lines.clear();
          res.data.planLines.forEach((e) => {
            this.addLine(e);
          });
          res.data.planPrice.forEach((e) => {
            this.addPlanPrice(e);
          });
          this.transformPriceTable(res.data.planPrice);
        },
      });
    }
  }
  submitPlan(form: FormGroup) {
    if (form.valid) {
      form.value.planPriceDto = form.value.planPrice;
      form.value.planLinesDto = form.value.lines;
      this._PlanService.AddEditPlans(form.value).subscribe({
        next: (res) => {
          this._Store.dispatch(
            GET_ALL_PLAN_FAILED({ error: new HttpErrorResponse({ error: "" }) })
          );
          this._router.navigate(["/plans"]);
        },
      });
    }
  }
}
