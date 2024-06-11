import { StepperSelectionEvent } from "@angular/cdk/stepper";
import { CommonModule } from "@angular/common";
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  signal,
} from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import {
  MatSelect,
  MatSelectChange,
  MatSelectModule,
} from "@angular/material/select";
import { MatStepperModule } from "@angular/material/stepper";
import { Store } from "@ngrx/store";
import { BehaviorSubject, Subject, takeUntil } from "rxjs";
import {
  ICustomerAddressDetails,
  ICustomerInfo,
} from "src/app/interfaces/customer.interface";
import {
  IDriver,
  IPaymentType,
  IPaymentTypeRequest,
  PaymentMethod,
} from "src/app/interfaces/subscription.interface";
import { CustomerService } from "src/app/services/customer.service";
import { SubscriptionService } from "src/app/services/subscription.service";
import { GET_BRANCH_START } from "src/app/store/branchStore/branch.action";
import { BranchSelector } from "src/app/store/branchStore/branch.selector";
import { GET_DELIVERY_DAY_START } from "src/app/store/deliveryDayStore/deliveryDay.action";
import { DeliveryDaySelector } from "src/app/store/deliveryDayStore/deliveryDay.selector";
import { GET_DISLIKE_START } from "src/app/store/dislikeStore/dislike.action";
import { DislikeSelector } from "src/app/store/dislikeStore/dislike.selector";
import {
  GET_MEAL_TYPE_FAILED,
  GET_MEAL_TYPE_START,
} from "src/app/store/mealTypeStore/mealType.action";
import { MealTypeSelector } from "src/app/store/mealTypeStore/mealType.selector";
import { GET_PLAN_CATEGORY_START } from "src/app/store/planCategoryStore/plan-category.action";
import { PlanCategorySelector } from "src/app/store/planCategoryStore/plan-category.selector";
import {
  GENERATE_PLAN_FAILED,
  GENERATE_PLAN_START,
  GET_PLAN_FAILED,
  GET_PLAN_START,
} from "src/app/store/planStore/plan.action";
import { IGENERATE_PLAN_STATE } from "src/app/store/planStore/plan.reducer";
import {
  GeneratePlanSelector,
  PlanSelector,
} from "src/app/store/planStore/plan.selector";
import { IActions, TableComponent } from "../../../pages/table/table.component";
import { CustomerTableComponent } from "../../customer-component/customer-table/customer-table.component";
import { GET_CUSTOMER_START } from "src/app/store/customerStore/customer.action";
import { IPaginateOptions } from "src/app/interfaces/paginator.interface";
import { GET_CUSTOMER_ADDRESS_START } from "src/app/store/customerAddressStore/customerAddress.action";
import { CustomerAddressSelector } from "src/app/store/customerAddressStore/customerAddress.selector";
import { GET_AREA_START } from "src/app/store/areaStore/area.action";
import { AreaSelector } from "src/app/store/areaStore/area.selector";
import { IArea } from "src/app/interfaces/area.interface";
import { BranchDriverSelector } from "src/app/store/branchDriverStore/branchDriver.selector";
import { GET_BRANCH_DRIVER_START } from "src/app/store/branchDriverStore/branchDriver.action";
import { customerCategorySelector } from "src/app/store/customerCategoryStore/customerCategory.selector";
import { GET_CUSTOMER_CATEGORY_START } from "src/app/store/customerCategoryStore/customerCategory.action";
import { CustomerAddressDialogComponent } from "src/app/components/customer-component/customer-address-dialog/customer-address-dialog.component";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { customerSelector } from "src/app/store/customerStore/customer.selector";
import { GET_PAYMENT_TYPE_START } from "src/app/store/paymentTypeStore/paymentType.action";
import { PaymentTypeSelector } from "src/app/store/paymentTypeStore/paymentType.selector";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import {
  SubscribeOptionsEnum,
  TaxDiscountOptionEnum,
} from "src/app/enums/subscriptions.enum";
import { ToIntPipe } from "src/app/pipes/to-int.pipe";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import { GET_ALL_SUBSCRIPTIONS_START } from "src/app/store/subscriptionStore/subscription.action";
import { Router } from "@angular/router";
import {
  IDiscount,
  IDiscountRequest,
} from "src/app/interfaces/discount.interface";
import {
  GET_PLAN_DAYS_FAILED,
  GET_PLAN_DAYS_START,
} from "src/app/store/planDayStore/planDay.action";
import { PlanDaySelector } from "src/app/store/planDayStore/planDay.selector";
import { HttpErrorResponse } from "@angular/common/http";
import { CustomerTypeEnum } from "../../../enums/customer.enum";
import { SelectSearchDirective } from "src/app/directives/select-search.directive";
import { CurrentCurrencyPipe } from "../../../pipes/current-currency.pipe";
import { PercentagePipe } from "src/app/pipes/percentage.pipe";
import { RoundPipe } from "src/app/pipes/round.pipe";
import { NgxFileDropModule } from "ngx-file-drop";
import { NgxFileDropEntry, FileSystemFileEntry } from "ngx-file-drop";
import { ColumnTypeEnum } from "src/app/enums/columns.enum";
import { GET_INVOICE_FAILED } from "src/app/store/invoiceStore/invoice.action";
import { ISubscriptionTableDetails } from "../subscription-details/subscription-details.component";
import { SelectAllOptionsDirective } from "src/app/directives/select-all-options.directive";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatOption } from "@angular/material/core";
import { CheckSelectDirective } from "src/app/directives/check-select.directive";

@Component({
  selector: "app-add-subscription",
  templateUrl: "./add-subscription.component.html",
  styleUrls: ["./add-subscription.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    TableComponent,
    MatAutocompleteModule,
    MatIconModule,
    MatDialogModule,
    MatSlideToggleModule,
    ToIntPipe,
    MatCardModule,
    MatDividerModule,
    SelectSearchDirective,
    CurrentCurrencyPipe,
    PercentagePipe,
    RoundPipe,
    NgxFileDropModule,
    SelectAllOptionsDirective,
    MatCheckboxModule,
    CheckSelectDirective
  ],
})
export class AddSubscriptionComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  private snackBarConfig: MatSnackBarConfig<any> = {
    duration: 5000,
    panelClass: ["green-snackbar"],
  };

  mealTypeCheckBoxStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  DeliveryCheckBoxStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  onMealTypeCheckboxChanged(newStatus: boolean) {
    this.mealTypeCheckBoxStatus.next(newStatus);
  }
  onDeliveryCheckboxChanged(newStatus: boolean) {
    this.DeliveryCheckBoxStatus.next(newStatus);
  }

  // FormGroups
  planForm = this._FormBuilder.group({
    customerID: [
      this._CustomerService.SELECTED_CUSTOMER()?.id ||
        this._SubscriptionService.SELECTED_SUBSCRIPTION()?.customerID,
      Validators.required,
    ],
    customerName: [
      this._CustomerService.SELECTED_CUSTOMER()?.customerName ||
        this._SubscriptionService.SELECTED_SUBSCRIPTION()?.customerName,
      Validators.required,
    ],
    planCategory: ["", Validators.required],
    planId: ["", Validators.required],
    duration: ["", Validators.required],
    startdate: ["", Validators.required],
    mealsType: ["", Validators.required],
    deliveryDays: ["", Validators.required],
    subscripBranch: [null, Validators.required],
    dislikeDategory: [""],
    branchID: [""],
    subscriperName: ["", Validators.required],
    customerType: [""],
  });

  deliveryForm = this._FormBuilder.group({
    driverID: [0, Validators.required],
    branchID: [0, Validators.required],
    adressID: [0, Validators.required],
  });

  paymentForm = this._FormBuilder.group({
    customerID: 0,
    driverID: 0,
    branchID: 0,
    adressID: 0,
    payments: this._FormBuilder.array<FormControl<PaymentMethod>>([]),
    bagCount: 1,
    isSponsor: 1,
    customerId: 0,
    total: 0,
    discount: 0,
    net: 0,
    tax: 0,
    subscriptionType: 0,
    subscripBranch: 0,
    notes: "",
    manualDiscount: 0,
    bageValue: 0,
    paymentMethods: "",
    paymentDiscounts: this._FormBuilder.array<FormControl<IDiscount>>([]),
    TaxDicountOption: "",
    isIncluedTax: false,
    taxActive: false,
    taxAmount: 0,
    uploadRequest: this._FormBuilder.group({
      fileName: "",
      extension: "",
      uploadType: 2,
      data: "",
    }),
  });

  // Variables
  subscribeOptions: SubscribeOptionsEnum[] = [
    SubscribeOptionsEnum.Web,
    SubscribeOptionsEnum["Mobile Application"],
    SubscribeOptionsEnum.Branch,
  ];
  TaxDicountOption: TaxDiscountOptionEnum[] = [
    TaxDiscountOptionEnum.ApplyBeforDiscount,
    TaxDiscountOptionEnum.ApplyAfterDiscount,
  ];
  todayDate: Date = new Date();
  tomorrow: Date = new Date(this.todayDate);

  drivers: IDriver[] = [];
  columns: any[] = [];
  combinedMealDeliveryArray: ISubscriptionTableDetails[] = [];
  displayedColumns: string[] = [];
  indexOfLargestMeal = 0;
  isSubscribeFromBranch: boolean = false;
  showPaymentForm: boolean = false;

  // Signals
  TABLE_CUSTOMER_DATA = toSignal(this._Store.select(customerSelector));
  SELECTED_CUSTOMER = signal(this._CustomerService.SELECTED_CUSTOMER());
  SELECTED_SUBSCRIPTION = signal(
    this._SubscriptionService.SELECTED_SUBSCRIPTION()
  );
  planCategories = toSignal(this._Store.select(PlanCategorySelector));
  plans = toSignal(this._Store.select(PlanSelector));
  PLAN_DAY_DATA = toSignal(this._Store.select(PlanDaySelector));
  mealTypes = toSignal(this._Store.select(MealTypeSelector));
  branches = toSignal(this._Store.select(BranchSelector));
  deliveryDays = toSignal(this._Store.select(DeliveryDaySelector));
  dislikes = toSignal(this._Store.select(DislikeSelector));
  generatedPlan = toSignal(this._Store.select(GeneratePlanSelector));
  customerAddresses = toSignal(this._Store.select(CustomerAddressSelector));
  AREA_DATA = toSignal(this._Store.select(AreaSelector));
  branchDriver = toSignal(this._Store.select(BranchDriverSelector));
  CATEGORY_DATA = toSignal(this._Store.select(customerCategorySelector));
  PAYMENT_TYPE_DATA = toSignal(this._Store.select(PaymentTypeSelector));
  TABLE_PLAN_DATA = toSignal(this._Store.select(GeneratePlanSelector));

  constructor(
    private _FormBuilder: FormBuilder,
    private _Store: Store,
    private _CustomerService: CustomerService,
    private _SubscriptionService: SubscriptionService,
    public _dialog: MatDialog,
    private _cdRef: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
    private _Router: Router
  ) {
    this.tomorrow.setDate(this.todayDate.getDate() + 1);
    this.planForm.patchValue({
      subscriperName:
        this.SELECTED_SUBSCRIPTION()?.customerName ||
        this.SELECTED_CUSTOMER()?.customerName,
    });
  }

  ngOnInit(): void {
    this.GetCustomers();
    this.GetPlanCategories();
    this.GetBranches();
    this.GetDeliveryDays();
    this.GetDislikes();
    this.GetArea();
    this.listenOnCustomerIDChange();
    this.getAddressOfSelectedCustomer();
    this.getBranchDrivers();
    this.GetCategory();
  }

  ngOnDestroy(): void {
    this._Store.dispatch(
      GET_PLAN_FAILED({ error: new HttpErrorResponse({ error: "" }) })
    );
    this._Store.dispatch(
      GET_PLAN_DAYS_FAILED({ error: new HttpErrorResponse({ error: "" }) })
    );
    this._Store.dispatch(
      GET_MEAL_TYPE_FAILED({ error: new HttpErrorResponse({ error: "" }) })
    );
    this._Store.dispatch(
      GENERATE_PLAN_FAILED({ error: new HttpErrorResponse({ error: "" }) })
    );
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onStepperChange(event: StepperSelectionEvent) {
    switch (event.selectedIndex) {
      case 0:
        break;
      case 1:
        this.GeneratePlan();
        break;
      case 2:
        this.patchDeliveryFormValues();
        break;
      case 3:
        this.GeneratePlan();
        this.getPaymentTypes({
          BranchID: Number(this.deliveryForm.value.branchID),
          SubscriptionType: Number(this.planForm.value.subscripBranch),
        });
        break;
    }
  }
  // ========================================== STEP 1 ============================================
  GetCustomers(Options: IPaginateOptions = { pageIndex: 0, pageSize: 10 }) {
    if (!this.TABLE_CUSTOMER_DATA()?.data) {
      Options.pageIndex++;
      this._Store.dispatch(GET_CUSTOMER_START({ data: Options }));
    }
  }
  openCustomerDialog(
    enterAnimationDuration: string = "100ms",
    exitAnimationDuration: string = "100ms"
  ): void {
    this._dialog
      .open(CustomerTableComponent, {
        enterAnimationDuration,
        exitAnimationDuration,
        height: "600px",
        width: "1200px",
      })
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: ICustomerInfo) => {
        if (res) {
          this.planForm.patchValue({
            customerName: res.customerName,
            subscriperName: res.customerName,
            customerID: res.id,
            customerType: res.customerType,
          });
        }
      });
  }
  GetCategory() {
    if (!this.CATEGORY_DATA()?.data) {
      this._Store.dispatch(GET_CUSTOMER_CATEGORY_START());
    }
  }
  listenOnCustomerIDChange() {
    this.planForm.controls["customerID"].valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((id) => {
        id && this.GetCustomerAddress(Number(id));
      });
  }
  resetCustomer() {
    this.planForm.patchValue({
      customerID: null,
      subscriperName: null,
      customerName: null,
    });
    this.SELECTED_CUSTOMER.set(null);
    this.SELECTED_SUBSCRIPTION.set(null);
  }
  GetPlanCategories() {
    if (!this.planCategories()?.data) {
      this._Store.dispatch(GET_PLAN_CATEGORY_START());
    }
  }
  GetPlans(PlanCategoryID: number) {
    this._Store.dispatch(GET_PLAN_START({ PlanCategoryID }));
  }
  GetBranches() {
    if (!this.branches()?.data) {
      this._Store.dispatch(GET_BRANCH_START());
    }
  }
  GetDislikes() {
    if (!this.dislikes()?.data) {
      this._Store.dispatch(GET_DISLIKE_START());
    }
  }
  GetDeliveryDays() {
    if (!this.deliveryDays()?.data) {
      this._Store.dispatch(GET_DELIVERY_DAY_START());
    }
  }
  GetMealTypes(PlanID: number) {
    this._Store.dispatch(GET_MEAL_TYPE_START({ PlanID }));
  }
  onPlanCategoryChange(selectInput: MatSelectChange) {
    this.GetPlans(selectInput.value);
  }
  onPlanChange(selectInput: MatSelectChange) {
    this.GetMealTypes(selectInput.value);
    this.getPlanDays(selectInput.value);
  }
  onSubscribeFromChange(selectInput: MatSelectChange) {
    if (selectInput.value == SubscribeOptionsEnum.Branch) {
      this.isSubscribeFromBranch = true;
      this.planForm.controls["branchID"].setValidators([Validators.required]);
      this.planForm.controls["branchID"].updateValueAndValidity();
    } else {
      this.isSubscribeFromBranch = false;
      this.planForm.patchValue({
        branchID: "",
      });
      this.planForm.controls["branchID"].setValidators(null);
      this.planForm.controls["branchID"].updateValueAndValidity();
    }
  }
  getPlanDays(PlanID: number) {
    this._Store.dispatch(GET_PLAN_DAYS_START({ PlanID }));
  }
  // ========================================== STEP 2 ============================================
  GeneratePlan() {
    if (this.planForm.value.branchID == "") {
      delete this.planForm.value.branchID;
    }
    if (this.planForm.value.dislikeDategory == "") {
      delete this.planForm.value.dislikeDategory;
    }
    const data: any = this.planForm.value;
    this._Store.dispatch(GENERATE_PLAN_START({ data }));
    this._Store
      .select(GeneratePlanSelector)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        this.processGeneratedPlan(res);
        this.setPaymentForm();
        this.onPriceChange();
        this.onSponsorChange();
        if (this.checkIsSponsor()) {
          this.clearPaymentValidation();
        }
      });
  }
  processGeneratedPlan(res: IGENERATE_PLAN_STATE) {
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
    this.combinedMealDeliveryArray = Object.values(aggregatedByDeliveryDate);
    this.setColumns();
    this.getDisplayedColumns();
  }

  setColumns() {
    this.columns = [];
    this.columns.push(
      {
        columnDef: "dayID",
        header: "Day ID",
        cell: (element: ISubscriptionTableDetails) =>
          `${element?.meals[0]?.dayID}`,
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
        cell: (element: ISubscriptionTableDetails) =>
          `${element?.meals[0]?.deliveryStatus}`,
        display: false,
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
        cell: (element: ISubscriptionTableDetails) =>
          `${element?.meals[0]?.lineState}`,
        display: false,
        type: ColumnTypeEnum.badge,
      },
      {
        columnDef: "adress",
        header: "Address",
        cell: (element: ISubscriptionTableDetails) =>
          `${element?.meals[0]?.adress}`,
        display: false,
        type: ColumnTypeEnum.text,
      }
    );
  }
  getDisplayedColumns() {
    this.displayedColumns = this.columns
      .filter((cd) => cd.display)
      .map((c) => c.columnDef);
  }
  // ========================================== STEP 3 ============================================
  openCreateAddressDialog(
    enterAnimationDuration: string = "100ms",
    exitAnimationDuration: string = "100ms"
  ) {
    this._dialog
      .open(CustomerAddressDialogComponent, {
        enterAnimationDuration,
        exitAnimationDuration,
        height: "330px",
        width: "1200px",
        disableClose: true,
        data: this.planForm.value.customerID,
      })
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((id: string) => {
        if (id != "") {
          this.GetCustomerAddress(Number(this.planForm.value.customerID));
          this.handleNewAddress(Number(id));
        }
      });
  }
  handleNewAddress(id: number) {
    this._Store
      .select(CustomerAddressSelector)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((address) => {
        const createdAddress = address.data?.find((a) => a.id == id);
        this.patchNewAddress(createdAddress);
      });
  }
  patchNewAddress(address: ICustomerAddressDetails | undefined) {
    this.deliveryForm.patchValue({
      adressID: address?.id,
      branchID: address?.branchID,
      driverID: address?.driverID,
    });
  }
  getAddressOfSelectedCustomer() {
    if (this._CustomerService.SELECTED_CUSTOMER()?.id) {
      this.GetCustomerAddress(
        this._CustomerService.SELECTED_CUSTOMER()?.id || 0
      );
    }

    if (this._SubscriptionService.SELECTED_SUBSCRIPTION()?.customerID) {
      this.GetCustomerAddress(
        this._SubscriptionService.SELECTED_SUBSCRIPTION()?.customerID || 0
      );
    }
  }
  GetCustomerAddress(CustomerID: number) {
    this._Store.dispatch(GET_CUSTOMER_ADDRESS_START({ CustomerID }));
  }
  getBranchDrivers() {
    if (!this.branchDriver()?.data) {
      this._Store.dispatch(GET_BRANCH_DRIVER_START());
    }
  }
  GetArea() {
    if (!this.AREA_DATA()?.data) {
      this._Store.dispatch(GET_AREA_START());
    }
  }
  findAreaById(id: number): IArea | undefined {
    return this.AREA_DATA()?.data?.find((e) => e.id == id);
  }
  onBranchChange(e: MatSelectChange) {
    this.drivers =
      this.branchDriver()?.data?.find((b) => b.branchID == e.value)?.drivers ||
      [];
  }
  patchDeliveryFormValues() {
    this.drivers =
      this.branchDriver()?.data?.find(
        (b) => b.branchID == this.customerAddresses()?.data?.[0]?.branchID
      )?.drivers || [];
    this.deliveryForm.patchValue({
      branchID: this.customerAddresses()?.data?.[0]?.branchID,
      driverID: this.customerAddresses()?.data?.[0]?.driverID,
      adressID: this.customerAddresses()?.data?.[0]?.id,
    });
  }
  onAddressChange(e: MatSelectChange) {
    const selected = this.customerAddresses()?.data?.find(
      (f) => f.id == Number(e.value)
    );
    this.drivers =
      this.branchDriver()?.data?.find((b) => b.branchID == selected?.branchID)
        ?.drivers || [];
    this.deliveryForm.patchValue({
      branchID: selected?.branchID,
      driverID: selected?.driverID,
    });
  }
  // ========================================== STEP 4 ============================================
  setPaymentForm() {
    this.paymentForm = this._FormBuilder.group({
      customerID: Number(this.planForm.value?.customerID),
      driverID: Number(this.deliveryForm.value?.driverID),
      branchID: Number(this.deliveryForm.value?.branchID),
      adressID: Number(this.deliveryForm.value?.adressID),
      payments: this._FormBuilder.array<FormControl<PaymentMethod>>(
        [],
        Validators.required
      ),
      bagCount: 1,
      isSponsor: this.checkIsSponsor(),
      customerId: Number(this.planForm.value?.customerID),
      total: Math.round(this.calculateInvoice().total),
      discount: 0,
      net: Math.round(this.calculateInvoice().net),
      tax: Number(this.generatedPlan()?.data?.taxSettings?.taxPercent),
      subscriptionType: Number(this.planForm.value?.subscripBranch),
      subscripBranch: Number(this.planForm.value?.branchID) || null,
      notes: "",
      manualDiscount: 0,
      bageValue: this.generatedPlan()?.data?.taxSettings?.bagValue || 0,
      paymentMethods: ["", Validators.required],
      paymentDiscounts: this._FormBuilder.array<FormControl<IDiscount>>([]),
      TaxDicountOption:
        this.TaxDicountOption[
          Number(this.generatedPlan()?.data?.taxSettings?.taxDicountOption)
        ]?.toString(),
      isIncluedTax:
        this.generatedPlan()?.data?.taxSettings?.isIncluedTax || false,
      taxActive: this.generatedPlan()?.data?.taxSettings?.taxActive || false,
      taxAmount: this.calculateInvoice().taxAmount,
      uploadRequest: this._FormBuilder.group({
        fileName: "",
        extension: "",
        uploadType: 2,
        data: "",
      }),
    });
    this.showPaymentForm = true;
    this.listenOnBagCountChange();
  }
  calculateInvoice(): { net: number; total: number; taxAmount: number } {
    const bag = Number(this.generatedPlan()?.data?.taxSettings.bagValue);
    let total = Number(this.generatedPlan()?.data?.planPrice) - bag;
    const tax = Number(this.paymentForm.value.tax) || 0;
    const taxActive = this.paymentForm.value.taxActive;
    const isIncludedTax = this.paymentForm.value.isIncluedTax;
    let net = total;

    if (taxActive) {
      if (isIncludedTax) {
        total = net / (1 + tax);
      } else {
        net = total + total * tax;
      }
    }
    const taxAmount = net - total;
    net += bag;
    return { net, total, taxAmount };
  }
  checkIsSponsor(): number {
    const currentCustomerType =
      this._CustomerService.SELECTED_CUSTOMER()?.customerType ||
      this.planForm.value.customerType;
    return currentCustomerType == CustomerTypeEnum.Sponser ? 1 : 0;
  }
  listenOnBagCountChange() {
    this.paymentForm.controls["bagCount"].valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((count) => {
        if (count) {
          this.paymentForm.controls["bageValue"].enable();
        } else {
          this.paymentForm.controls["bageValue"].disable();
          this.paymentForm.patchValue({
            bageValue: 0,
          });
        }
      });
  }
  get payments() {
    return this.paymentForm.get("payments") as FormArray;
  }
  addPayment(paymentMethod: IPaymentType, index: number) {
    this.payments.push(
      this._FormBuilder.group({
        id: 0,
        paymentsDetailsId: 0,
        methodId: paymentMethod.paymentID,
        methodName: paymentMethod.paymentName,
        amount: index == 0 ? this.paymentForm.value.net : 0,
        refrenceId: "",
      })
    );
  }
  getPaymentTypes(data: IPaymentTypeRequest) {
    this._Store.dispatch(GET_PAYMENT_TYPE_START({ data }));
  }
  onPaymentMethodsChange(selectInput: MatSelectChange) {
    this.payments.clear();
    selectInput.value.forEach((paymentMethod: IPaymentType, index: number) => {
      this.addPayment(paymentMethod, index);
    });
    this._cdRef.detectChanges();
  }
  getSubscribeOptionsEnumKey(index: number) {
    return SubscribeOptionsEnum[index];
  }
  calculateInvoiceOnChange(): void {
    let total = Number(this.paymentForm.value.total);
    const bag = Number(
      this.paymentForm.value.bagCount == 1
        ? this.paymentForm.value.bageValue
        : 0
    );
    const tax = Number(this.paymentForm.value.tax);
    const discount = this.calculateDiscount();
    const taxActive = this.paymentForm.value.taxActive;
    let net = 0;
    if (taxActive) {
      if (
        this.paymentForm.value.TaxDicountOption ==
        TaxDiscountOptionEnum.ApplyAfterDiscount
      ) {
        const totalAfterDiscount = total - discount;
        net = totalAfterDiscount * (1 + tax);
      } else {
        const totalAfterTax = total * (1 + tax);
        net = totalAfterTax - discount;
      }

      this.paymentForm.patchValue({
        taxAmount: Number(net) - total + discount,
      });
    } else {
      net = total - discount;
      this.paymentForm.patchValue({
        taxAmount: 0,
      });
    }
    this.paymentForm.patchValue({
      net: Math.round(Number(net + bag)),
    });
  }
  calculateDiscount(): number {
    const manualDiscount = Number(this.paymentForm.value.manualDiscount);
    const totalDiscount = this.paymentDiscounts.value.reduce((acc, obj) => {
      return acc + obj.discountValue;
    }, manualDiscount);
    this.paymentForm.patchValue({ discount: totalDiscount });
    return totalDiscount;
  }
  onPriceChange() {
    const formControls = [
      "total",
      "manualDiscount",
      "bageValue",
      "paymentDiscounts",
    ];

    formControls.forEach((controlName) => {
      this.subscribeToFormControlChanges(controlName);
    });
  }
  private subscribeToFormControlChanges(controlName: string) {
    this.paymentForm
      .get(controlName)
      ?.valueChanges.pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        setTimeout(() => {
          this.calculateInvoiceOnChange();
        }, 1);
      });
  }

  onSponsorChange() {
    this.paymentForm
      .get("isSponsor")
      ?.valueChanges.pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        if (res) {
          this.clearPaymentValidation();
        } else {
          this.paymentForm
            ?.get("payments")
            ?.setValidators([Validators.required]);
          this.paymentForm?.get("payments")?.updateValueAndValidity();
          this.paymentForm
            ?.get("paymentMethods")
            ?.setValidators([Validators.required]);
          this.paymentForm?.get("paymentMethods")?.updateValueAndValidity();
        }
      });
  }

  clearPaymentValidation() {
    this.paymentForm?.get("payments")?.clearValidators();
    this.paymentForm?.get("payments")?.updateValueAndValidity();
    this.paymentForm?.get("paymentMethods")?.clearValidators();
    this.paymentForm?.get("paymentMethods")?.updateValueAndValidity();
  }

  getSubscriptionRequestInfo() {
    const form = {
      ...this.planForm.value,
      ...this.deliveryForm.value,
      ...this.paymentForm.value,
    };
    const data = {
      planCategory: form.planCategory,
      subscriperName: form.subscriperName,
      planId: form.planId,
      duration: form.duration,
      startdate: form.startdate,
      mealsType: form.mealsType,
      deliveryDays: form.deliveryDays,
      dislikeDategory: form.dislikeDategory,
      customerID: form.customerID,
      driverID: form.driverID,
      branchID: form.branchID,
      adressID: form.adressID,
      isSponsor: Boolean(form.isSponsor),
      bagCount: Number(form.bagCount),
      invoice: {
        customerId: form.customerId,
        total: form.total,
        discount: form.discount,
        net: form.net,
        tax: form.tax,
        subscriptionType: form.subscriptionType,
        subscripBranch: form.subscripBranch,
        notes: form.notes,
        manualDiscount: form.manualDiscount,
        bageValue: form.bageValue,
        paymentDiscounts: form.paymentDiscounts,
        paymentMethods: form.payments,
        uploadRequest: form.uploadRequest,
      },
    };
    return data;
  }
  CreateSubscriptions(form: FormGroup) {
    if (form.valid) {
      if (
        !this.checkPaymentTypesAmount() &&
        !this.getSubscriptionRequestInfo().isSponsor
      ) {
        this._snackBar.open(
          "Total payment amount does not match the net amount",
          "❌",
          this.snackBarConfig
        );
      } else if (
        !this.checkNetAmount() &&
        !this.getSubscriptionRequestInfo().isSponsor
      ) {
        this._snackBar.open(
          "Net amount isn't valid",
          "❌",
          this.snackBarConfig
        );
      } else if (!this.checkUploadImage()) {
        this._snackBar.open("Please upload image", "❌", this.snackBarConfig);
      } else {
        const data: any = this.getSubscriptionRequestInfo();
        data.startdate = new Date(data.startdate).toLocaleDateString("en-CA");
        if (data.isSponsor == 1) {
          data.invoice = null;
        }
        this._SubscriptionService.CreateSubscriptions(data).subscribe((res) => {
          this._snackBar.open(
            res.messages[0],
            "Success ✅",
            this.snackBarConfig
          );
          this._Store.dispatch(
            GET_ALL_SUBSCRIPTIONS_START({
              data: { pageIndex: 0, pageSize: 10 },
            })
          );
          this._Store.dispatch(
            GET_INVOICE_FAILED({ error: new HttpErrorResponse({ error: "" }) })
          );
          this._SubscriptionService.currentSID.next(res.data.toString());
          this._Router.navigate(["/manage-subscriptions"]);
        });
      }
    }
  }
  // =============================================== Apply Discount ===============================================
  get paymentDiscounts(): FormArray<FormControl<IDiscount>> {
    return this.paymentForm.get("paymentDiscounts") as FormArray;
  }
  addDiscount(item: IDiscount[]) {
    item.forEach((e) => {
      this.paymentDiscounts.push(new FormControl<any>(e));
    });
  }
  discountErrorList: string[] = [];
  onApplyDiscount(INPUT: HTMLInputElement) {
    const data = this.getSubscriptionRequestInfo();
    const request: IDiscountRequest = {
      customerId: Number(data.invoice.customerId),
      total: Math.round(Number(data.invoice.total)),
      discount: Number(data.invoice.discount),
      net: Math.round(Number(data.invoice.net)),
      tax: Number(data.invoice.tax),
      manualDiscount: Number(data.invoice.manualDiscount),
      bageValue: Number(data.invoice.bageValue) || 0,
      paymentDiscounts: this.paymentDiscounts.value,
    };

    this._SubscriptionService
      .ApplyDiscount(INPUT.value, request)
      .subscribe((res) => {
        if (res.data.result) {
          this.addDiscount(res.data.discounts);
          this.discountErrorList = [];
        } else {
          this.discountErrorList = res.data.errorList;
          this._snackBar.open(
            res.data.errorList.length ? res.data.errorList[0] : "Invalid Code",
            "❌",
            this.snackBarConfig
          );
        }
      });
  }
  removeDiscount(index: number) {
    this.paymentDiscounts.removeAt(index);
    this.discountErrorList = [];
  }
  // ============================================= Validations ====================================================
  private checkNetAmount(): boolean {
    return Number(this.paymentForm.value.net) > 0;
  }
  private checkPaymentTypesAmount(): boolean {
    return (
      Number(this.calculatePaymentTypesAmount()) ==
      Number(this.paymentForm.value.net)
    );
  }

  private checkUploadImage(): boolean {
    if (this.paymentForm.value.isSponsor == 1) {
      return true;
    }
    return (this.paymentForm?.value?.uploadRequest?.data?.length || 0) > 0;
  }

  private calculatePaymentTypesAmount(): number {
    const total = this.paymentForm.value.payments?.reduce((acc, obj) => {
      return acc + Number(obj.amount);
    }, 0);
    return total || 0;
  }
  // ============================================= UPLOAD FILE ====================================================
  public files: NgxFileDropEntry | null = null;

  public dropped(files: NgxFileDropEntry[]) {
    if (files.length !== 1) {
      this._snackBar.open(
        "Please drop only one file.",
        "❌",
        this.snackBarConfig
      );
      return;
    }
    const droppedFile = files[0];
    if (droppedFile.fileEntry.isFile) {
      const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
      fileEntry.file((file: File) => {
        if (!file.type.startsWith("image")) {
          this._snackBar.open(
            "Please drop only image files.",
            "❌",
            this.snackBarConfig
          );
          return;
        }
        this.files = droppedFile;
        this.uploadFile(file);
      });
    }
  }

  private uploadFile(uploadedFile: File) {
    const readFile = (file: any) => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = (event: any) => resolve(event.target.result);
        fileReader.onerror = (error) => reject(error);
        fileReader.readAsDataURL(file);
      });
    };

    const readFiles = async () => {
      try {
        const base64Strings = await Promise.all(
          Array.from([uploadedFile]).map(readFile)
        );
        base64Strings.map((base64: any) => {
          const type = base64.split(",")[0].split(":")[1].split(";")[0];
          if (type.split("/")[0] == "image") {
            this.paymentForm.patchValue({
              uploadRequest: {
                data: base64.split(";base64,")[1],
                extension: base64.substring(
                  "data:image/".length,
                  base64.indexOf(";base64")
                ),
                uploadType: 2,
                fileName: uploadedFile.name,
              },
            });
          } else {
            this._snackBar.open(
              "Only image files are allowed",
              "❌",
              this.snackBarConfig
            );
          }
        });
      } catch (error) {}
    };
    readFiles();
  }
}
