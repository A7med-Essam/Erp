import {
  ChangeDetectorRef,
  Component,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import {
  IPaymentType,
  IPaymentTypeRequest,
  ISubDetail,
  ISubscription,
  ISubscriptionDetail,
  PaymentMethod,
} from "src/app/interfaces/subscription.interface";
import {
  IDiscount,
  IDiscountRequest,
} from "src/app/interfaces/discount.interface";
import {
  SubscribeOptionsEnum,
  TaxDiscountOptionEnum,
} from "src/app/enums/subscriptions.enum";
import { MatSelectChange, MatSelectModule } from "@angular/material/select";
import { GET_BRANCH_START } from "src/app/store/branchStore/branch.action";
import { GET_DELIVERY_DAY_START } from "src/app/store/deliveryDayStore/deliveryDay.action";
import {
  GET_MEAL_TYPE_FAILED,
  GET_MEAL_TYPE_START,
} from "src/app/store/mealTypeStore/mealType.action";
import { GET_PLAN_CATEGORY_START } from "src/app/store/planCategoryStore/plan-category.action";
import {
  GET_PLAN_DAYS_FAILED,
  GET_PLAN_DAYS_START,
} from "src/app/store/planDayStore/planDay.action";
import {
  GENERATE_PLAN_START,
  GET_PLAN_FAILED,
  GET_PLAN_START,
} from "src/app/store/planStore/plan.action";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import { ActionsService } from "src/app/services/actions.service";
import { SubscriptionService } from "src/app/services/subscription.service";
import { Store } from "@ngrx/store";
import { toSignal } from "@angular/core/rxjs-interop";
import { BranchSelector } from "src/app/store/branchStore/branch.selector";
import { DeliveryDaySelector } from "src/app/store/deliveryDayStore/deliveryDay.selector";
import { MealTypeSelector } from "src/app/store/mealTypeStore/mealType.selector";
import { PlanCategorySelector } from "src/app/store/planCategoryStore/plan-category.selector";
import { PlanDaySelector } from "src/app/store/planDayStore/planDay.selector";
import {
  GeneratePlanSelector,
  PlanSelector,
} from "src/app/store/planStore/plan.selector";
import { HttpErrorResponse } from "@angular/common/http";
import { NgxFileDropEntry, NgxFileDropModule } from "ngx-file-drop";
import { Subject, takeUntil } from "rxjs";
import { GET_PAYMENT_TYPE_START } from "src/app/store/paymentTypeStore/paymentType.action";
import { PaymentTypeSelector } from "src/app/store/paymentTypeStore/paymentType.selector";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatStepper, MatStepperModule } from "@angular/material/stepper";
import { SelectSearchDirective } from "src/app/directives/select-search.directive";
import { TableComponent } from "src/app/pages/table/table.component";
import { CurrentCurrencyPipe } from "src/app/pipes/current-currency.pipe";
import { PercentagePipe } from "src/app/pipes/percentage.pipe";
import { RoundPipe } from "src/app/pipes/round.pipe";
import { ToIntPipe } from "src/app/pipes/to-int.pipe";
import { StepperSelectionEvent } from "@angular/cdk/stepper";
import { CustomerTypeEnum } from "src/app/enums/customer.enum";

@Component({
  selector: "app-renew",
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
  ],
  templateUrl: "./renew.component.html",
  styleUrls: ["./renew.component.scss"],
})
export class RenewComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  @ViewChild("stepper") stepper!: MatStepper;

  planForm = this._FormBuilder.group({
    sid: [0, Validators.required],
    planCategory: [0, Validators.required],
    planId: [0, Validators.required],
    duration: [0, Validators.required],
    startdate: [new Date(), Validators.required],
    mealsType: [new Array({}), Validators.required],
    deliveryDays: [new Array({}), Validators.required],
    subscriptionType: [0, Validators.required],
    subscripBranch: 0,
    sponsor: 0,
  });
  paymentForm = this._FormBuilder.group({
    invoice: this._FormBuilder.group({
      customerId: [0, Validators.required],
      total: 0,
      discount: 0,
      net: 0,
      tax: 0,
      notes: "",
      subscriptionType: 0,
      subscripBranch: 0,
      manualDiscount: 0,
      url: "",
      bagCount: 1,
      bageValue: 0,
      paymentMethods: [new Array(), Validators.required],
      payments: this._FormBuilder.array<FormControl<PaymentMethod>>([]),
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
    }),
  });
  subscribeOptions: SubscribeOptionsEnum[] = [
    SubscribeOptionsEnum.Web,
    SubscribeOptionsEnum["Mobile Application"],
    SubscribeOptionsEnum.Branch,
  ];
  TaxDicountOption: TaxDiscountOptionEnum[] = [
    TaxDiscountOptionEnum.ApplyBeforDiscount,
    TaxDiscountOptionEnum.ApplyAfterDiscount,
  ];
  private snackBarConfig: MatSnackBarConfig<any> = {
    duration: 5000,
    panelClass: ["green-snackbar"],
  };
  isSubscribeFromBranch: boolean = false;
  // Signals
  planCategories = toSignal(this._Store.select(PlanCategorySelector));
  plans = toSignal(this._Store.select(PlanSelector));
  PLAN_DAY_DATA = toSignal(this._Store.select(PlanDaySelector));
  mealTypes = toSignal(this._Store.select(MealTypeSelector));
  branches = toSignal(this._Store.select(BranchSelector));
  deliveryDays = toSignal(this._Store.select(DeliveryDaySelector));
  PAYMENT_TYPE_DATA = toSignal(this._Store.select(PaymentTypeSelector));
  generatedPlan = toSignal(this._Store.select(GeneratePlanSelector));

  constructor(
    public _dialogRef: MatDialogRef<RenewComponent>,
    private _FormBuilder: FormBuilder,
    private _Store: Store,
    private _cdRef: ChangeDetectorRef,
    private _ActionsService: ActionsService,
    private _SubscriptionService: SubscriptionService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: ISubscriptionDetail
  ) {
    this.patchFormValues();
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.GetPlanCategories();
      this.GetBranches();
      this.GetDeliveryDays();
      this.listenOnBagCountChange();
    }, 1);
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
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  // ================================== Patching Form Values ==================================
  patchFormValues() {
    this.GetPlans(this.data.subscriptionHeader.planCategory);
    this.GetMealTypes(this.data.subscriptionHeader.planID);
    this.getPlanDays(this.data.subscriptionHeader.planID);
    this.planForm.patchValue({
      sid: this.data.subscriptionHeader.subscriptionsID,
      duration: this.data.subscriptionHeader.durations,
      sponsor:
        this.data.subscriptionHeader.customerType.toLowerCase() ==
        CustomerTypeEnum.Sponser.toLowerCase()
          ? 1
          : 0,
    });
    this.paymentForm.patchValue({
      invoice: {
        customerId: this.data.subscriptionHeader.customerID,
      },
    });
    this.patchStartDate();
    this.patchPlanCategory();
    this.patchPlan();
    this.patchMealType();
    this.patchDeliveryDay();
  }

  patchStartDate() {
    const lastDeliveryDate: string =
      this.data.subscriptionDetails.at(-1)?.deliveryDate || "";
    const date = new Date(lastDeliveryDate);
    date.setDate(date.getDate() + 1);
    this.planForm.patchValue({
      startdate:date,
    });
  }
  patchPlanCategory() {
    this._Store
      .select(PlanCategorySelector)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        if (res.data) {
          this.planForm.patchValue({
            planCategory: this.data.subscriptionHeader.planCategory,
          });
        }
      });
  }
  patchPlan() {
    this._Store
      .select(PlanSelector)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        if (res.data) {
          this.planForm.patchValue({
            planId: this.data.subscriptionHeader.planID,
          });
        }
      });
  }
  patchMealType() {
    this._Store
      .select(MealTypeSelector)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        if (res.data) {
          this.planForm.patchValue({
            mealsType: this.mealTypes()?.data?.filter((e) =>
              this.data.subscriptionHeader.mealTypes
                .split("|")
                .includes(e.mealTypeName)
            ),
          });
        }
      });
  }
  patchDeliveryDay() {
    this._Store
      .select(DeliveryDaySelector)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        if (res.data) {
          this.planForm.patchValue({
            deliveryDays: this.deliveryDays()?.data?.filter((e) =>
              this.data.subscriptionHeader.deliveryDays
                .split("|")
                .includes(e.day_name)
            ),
          });
        }
      });
  }
  // ============================================== Stepper =================================================
  onStepperChange(event: StepperSelectionEvent) {
    switch (event.selectedIndex) {
      case 0:
        break;
      case 1:
        this.ApplyPlan();
        this.getPaymentTypes({
          BranchID: Number(this.data.subscriptionHeader.branch.branchID),
          SubscriptionType: Number(this.planForm.value?.subscriptionType),
        });
        break;
    }
  }
  ApplyPlan() {
    const data = {
      customerID: this.data.subscriptionHeader.customerID,
      customerName: this.data.subscriptionHeader.customerName.trim(),
      planCategory: this.planForm.value?.planCategory,
      planId: this.planForm.value?.planId,
      duration: this.planForm.value?.duration,
      startdate: this.planForm.value?.startdate,
      mealsType: this.planForm.value?.mealsType,
      deliveryDays: this.planForm.value?.deliveryDays,
      subscripBranch: this.planForm.value?.subscripBranch,
      subscriperName: this.data.subscriptionHeader.customerName.trim(),
    };
    this.GeneratePlan(data);
  }
  GeneratePlan(data: any) {
    this._Store.dispatch(GENERATE_PLAN_START({ data }));
    this._Store
      .select(GeneratePlanSelector)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        this.onPriceChange();
        this.paymentForm.patchValue({
          invoice: {
            net: Math.round(this.calculateInvoice().net),
            total: Math.round(this.calculateInvoice().total),
            tax: Number(this.generatedPlan()?.data?.taxSettings?.taxPercent),
            bageValue: this.generatedPlan()?.data?.taxSettings?.bagValue || 0,
            TaxDicountOption:
              this.TaxDicountOption[
                Number(
                  this.generatedPlan()?.data?.taxSettings?.taxDicountOption
                )
              ]?.toString(),
            isIncluedTax:
              this.generatedPlan()?.data?.taxSettings?.isIncluedTax || false,
            taxActive:
              this.generatedPlan()?.data?.taxSettings?.taxActive || false,
            taxAmount: this.calculateInvoice().taxAmount,
          },
        });
      });
  }
  // ========================================== STEP 1 ============================================
  getSubscribeOptionsEnumKey(index: number) {
    return SubscribeOptionsEnum[index];
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
      this.planForm.controls["subscripBranch"].setValidators([
        Validators.required,
      ]);
      this.planForm.controls["subscripBranch"].updateValueAndValidity();
    } else {
      this.isSubscribeFromBranch = false;
      this.planForm.patchValue({
        subscripBranch: 0,
      });
      this.planForm.controls["subscripBranch"].setValidators(null);
      this.planForm.controls["subscripBranch"].updateValueAndValidity();
    }
  }
  getPlanDays(PlanID: number) {
    this._Store.dispatch(GET_PLAN_DAYS_START({ PlanID }));
  }
  next(form: FormGroup) {
    if (form.valid) {
      this.stepper.next();
    }
  }
  // ========================================== STEP 2 ============================================
  calculateInvoice(): { net: number; total: number; taxAmount: number } {
    const bag = Number(this.generatedPlan()?.data?.taxSettings.bagValue);
    let total = Number(this.generatedPlan()?.data?.planPrice) - bag;
    const tax = Number(this.paymentForm.value.invoice?.tax) || 0;
    const taxActive = this.paymentForm.value.invoice?.taxActive;
    const isIncludedTax = this.paymentForm.value.invoice?.isIncluedTax;
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
  listenOnBagCountChange() {
    this.paymentForm.controls["invoice"].controls["bagCount"].valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((count) => {
        if (count) {
          this.paymentForm.controls["invoice"].controls["bageValue"].enable();
        } else {
          this.paymentForm.controls["invoice"].controls["bageValue"].disable();
          this.paymentForm.patchValue({
            invoice: {
              bageValue: 0,
            },
          });
        }
      });
  }
  get payments() {
    return this.paymentForm.controls["invoice"].get("payments") as FormArray;
  }
  addPayment(paymentMethod: IPaymentType, index: number) {
    this.payments.push(
      this._FormBuilder.group({
        id: 0,
        paymentsDetailsId: 0,
        methodId: paymentMethod.paymentID,
        methodName: paymentMethod.paymentName,
        amount:
          index == 0 ? Math.round(this.paymentForm.value.invoice?.net || 0) : 0,
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
  calculateInvoiceOnChange(): void {
    let total = Number(this.paymentForm.value?.invoice?.total);
    const bag = Number(
      this.paymentForm.value.invoice?.bagCount == 1
        ? this.paymentForm.value.invoice?.bageValue
        : 0
    );
    const tax = Number(this.paymentForm.value.invoice?.tax);
    const discount = this.calculateDiscount();
    const taxActive = this.paymentForm.value.invoice?.taxActive;
    let net = 0;
    if (taxActive) {
      if (
        this.paymentForm.value.invoice?.TaxDicountOption ==
        TaxDiscountOptionEnum.ApplyAfterDiscount
      ) {
        const totalAfterDiscount = total - discount;
        net = totalAfterDiscount * (1 + tax);
      } else {
        const totalAfterTax = total * (1 + tax);
        net = totalAfterTax - discount;
      }

      this.paymentForm.patchValue({
        invoice: {
          taxAmount: Number(net) - total + discount,
        },
      });
    } else {
      net = total - discount;
      this.paymentForm.patchValue({
        invoice: {
          taxAmount: 0,
        },
      });
    }
    this.paymentForm.patchValue({
      invoice: {
        net: Math.round(Number(net + bag)),
      },
    });
  }
  calculateDiscount(): number {
    const manualDiscount = Number(
      this.paymentForm.value.invoice?.manualDiscount
    );
    const totalDiscount = this.paymentDiscounts.value.reduce((acc, obj) => {
      return acc + obj.discountValue;
    }, manualDiscount);
    this.paymentForm.patchValue({ invoice: { discount: totalDiscount } });
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
    this.paymentForm.controls["invoice"]
      .get(controlName)
      ?.valueChanges.pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        setTimeout(() => {
          this.calculateInvoiceOnChange();
        }, 1);
      });
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
              invoice: {
                uploadRequest: {
                  data: base64.split(";base64,")[1],
                  extension: base64.substring(
                    "data:image/".length,
                    base64.indexOf(";base64")
                  ),
                  uploadType: 2,
                  fileName: uploadedFile.name,
                },
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

  // =============================================== Apply Discount ===============================================
  get paymentDiscounts(): FormArray<FormControl<IDiscount>> {
    return this.paymentForm.controls["invoice"].get(
      "paymentDiscounts"
    ) as FormArray;
  }
  addDiscount(item: IDiscount[]) {
    item.forEach((e) => {
      this.paymentDiscounts.push(new FormControl<any>(e));
    });
  }
  discountErrorList: string[] = [];
  onApplyDiscount(INPUT: HTMLInputElement) {
    const request: IDiscountRequest = {
      customerId: Number(this.paymentForm.value.invoice?.customerId),
      total: Math.round(Number(this.paymentForm.value.invoice?.total)),
      discount: Number(this.paymentForm.value.invoice?.discount),
      net: Math.round(Number(this.paymentForm.value.invoice?.net)),
      tax: Number(this.paymentForm.value.invoice?.tax),
      manualDiscount: Number(this.paymentForm.value.invoice?.manualDiscount),
      bageValue: Number(this.paymentForm.value.invoice?.bageValue) || 0,
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
    this.discountErrorList = [];
    this.paymentDiscounts.removeAt(index);
  }

  // ============================================= Validations ====================================================
  private checkNetAmount(): boolean {
    return Number(this.paymentForm.value.invoice?.net) > 0;
  }
  private checkPaymentTypesAmount(): boolean {
    return (
      Number(this.calculatePaymentTypesAmount()) ==
      Number(this.paymentForm.value.invoice?.net)
    );
  }
  private calculatePaymentTypesAmount(): number {
    const total = this.paymentForm.value.invoice?.payments?.reduce(
      (acc, obj) => {
        return acc + Number(obj.amount);
      },
      0
    );
    return total || 0;
  }

  private checkUploadImage(): boolean {
    return !(
      (this.paymentForm?.value?.invoice?.uploadRequest?.data?.length || 0) > 0
    );
  }

  // ========================================== FINISH ============================================
  @HostListener("document:keydown.enter", ["$event"])
  onEnterKeyPress(event: KeyboardEvent) {
    event.preventDefault();
  }
  fixFormValues() {
    const { subscriptionType, subscripBranch } = this.planForm.value;
    this.paymentForm.patchValue({
      invoice: { subscriptionType, subscripBranch },
    });
  }
  Renew(form: FormGroup) {
    if (form.valid) {
      const isSponsor: boolean = form.value.sponsor == 1;
      this.fixFormValues();
      if (!this.checkNetAmount() && !isSponsor) {
        this._snackBar.open(
          "Net amount isn't valid",
          "❌",
          this.snackBarConfig
        );
      } else if (!this.checkPaymentTypesAmount() && !isSponsor) {
        this._snackBar.open(
          "Total payment amount does not match the net amount",
          "❌",
          this.snackBarConfig
        );
      } else if (this.checkUploadImage() && !isSponsor) {
        this._snackBar.open("Please upload image", "❌", this.snackBarConfig);
      } else {
        if (form.value.invoice) {
          form.value.invoice.paymentMethods = form.value.invoice.payments;
        }
        const DATA = {
          ...this.planForm.value,
          ...form.value,
        };
        if (DATA.subscripBranch == 0) {
          if (DATA?.invoice) {
            DATA.invoice.subscripBranch = null;
          }
          DATA.subscripBranch = null;
        }
        DATA.startdate = new Date(DATA.startdate).toLocaleDateString("en-CA");
        this._ActionsService.Renew(DATA).subscribe({
          next: (res) => {
            this._snackBar.open(
              "Renewed successfully",
              "✅",
              this.snackBarConfig
            );
            this._dialogRef.close(true);
          },
          error: (err) => {
            this._snackBar.open("Failed to renew", "❌", this.snackBarConfig);
            this._dialogRef.close(false);
          },
        });
      }
    }
  }
}
