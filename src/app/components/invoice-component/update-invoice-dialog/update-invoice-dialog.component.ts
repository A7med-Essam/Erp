import {
  ChangeDetectorRef,
  Component,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormArray,
  FormBuilder,
  FormControl,
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
import { Store } from "@ngrx/store";
import {
  IPaymentType,
  IPaymentTypeRequest,
  ISubscription,
  PaymentMethod,
} from "src/app/interfaces/subscription.interface";
import { ActionsService } from "src/app/services/actions.service";
import { ChangeStatusComponent } from "../../actions/change-status/change-status.component";
import { ISubscriptionTableDetails } from "../../subscription-component/subscription-details/subscription-details.component";
import { InvoiceService } from "src/app/services/invoice.service";
import {
  IUpdateInvoiceRequest,
  InvoiceInfo,
} from "src/app/interfaces/invoice.interface";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { MatCardModule } from "@angular/material/card";
import {
  IDiscount,
  IDiscountRequest,
} from "src/app/interfaces/discount.interface";
import { toSignal } from "@angular/core/rxjs-interop";
import { PaymentTypeSelector } from "src/app/store/paymentTypeStore/paymentType.selector";
import {
  GET_PAYMENT_TYPE_FAILED,
  GET_PAYMENT_TYPE_START,
} from "src/app/store/paymentTypeStore/paymentType.action";
import { SubscribeOptionsEnum } from "src/app/enums/subscriptions.enum";
import { BranchSelector } from "src/app/store/branchStore/branch.selector";
import { GET_BRANCH_START } from "src/app/store/branchStore/branch.action";
import { SubscriptionService } from "src/app/services/subscription.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subject, takeUntil } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { snackBarConfig } from "src/app/models/MatSnackBarConfig";
import { NgxFileDropEntry, NgxFileDropModule } from "ngx-file-drop";

@Component({
  selector: "app-update-invoice-dialog",
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
    MatDividerModule,
    MatCardModule,
    NgxFileDropModule,
  ],
  templateUrl: "./update-invoice-dialog.component.html",
  styleUrls: ["./update-invoice-dialog.component.scss"],
})
export class UpdateInvoiceDialogComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  dialogForm = this._FormBuilder.group({
    invoiceID: [0, Validators.required],
    customerId: [0, Validators.required],
    total: 0,
    discount: 0,
    net: 0,
    tax: 0,
    subscriptionType: 0,
    subscripBranch: 0,
    manualDiscount: 0,
    bageValue: 0,
    url: "",
    notes: "",
    paymentDiscounts: this._FormBuilder.array<FormControl<IDiscount>>([]),
    paymentMethods: [new Array<IPaymentType>(), Validators.required],
    payments: this._FormBuilder.array<FormControl<PaymentMethod>>([]),
    uploadRequest: this._FormBuilder.group({
      fileName: "",
      extension: "",
      uploadType: 2,
      data: "",
    }),
  });
  constructor(
    public _dialogRef: MatDialogRef<ChangeStatusComponent>,
    private _FormBuilder: FormBuilder,
    private _InvoiceService: InvoiceService,
    @Inject(MAT_DIALOG_DATA)
    public data: InvoiceInfo,
    private _Store: Store,
    private _cdRef: ChangeDetectorRef,
    private _SubscriptionService: SubscriptionService,
    private _snackBar: MatSnackBar
  ) {
    if (this.data.imgUrl) {
      this.currentUploadedFile = `https://api.dashboard.${
        window.location.href.split("dashboard.")[1].split(".")[0]
      }.thelowcalories.com/${this.data.imgUrl}`;
    }
    this.dialogForm.patchValue({
      invoiceID: this.data.id,
      customerId: this.data.customerId,
      total: this.data.total,
      discount: this.data.discount,
      net: this.data.net,
      tax: this.data.tax,
      subscriptionType: this.data.subscriptionType,
      manualDiscount: this.data.manualDiscount,
      subscripBranch: this.data.subscriptionBranchId,
      bageValue: this.data.bagValue,
      url: this.data.imgUrl,
      notes: this.data.notes,
    });

    this.addDiscount(this.data.paymentDiscounts);

    this._Store
      .select(PaymentTypeSelector)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        if (res.succeeded) {
          let payments: IPaymentType[] = [];
          this.data.paymentMethods.forEach((e) => {
            this.payments.push(
              this._FormBuilder.group({
                id: e.id,
                paymentsDetailsId: e.paymentsDetailsId,
                methodId: e.methodId,
                methodName: this.getPaymentName(e.methodId)?.paymentName,
                amount: e.amount,
                refrenceId: e.refrenceId,
              })
            );
            payments.push(this.getPaymentName(e.methodId));
          });

          this.dialogForm.patchValue({
            paymentMethods: payments,
          });
        }
      });
  }

  getPaymentName(id: number): IPaymentType {
    return (
      this.PAYMENT_TYPE_DATA()?.data?.find((e) => e.paymentID == id) ||
      ({} as IPaymentType)
    );
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.GetBranches();
      this.getPaymentTypes({
        BranchID: Number(this.data.deliveryBranchId),
        SubscriptionType: Number(this.data.subscriptionType),
      });
    }, 1);
  }

  ngOnDestroy(): void {
    this._Store.dispatch(
      GET_PAYMENT_TYPE_FAILED({ error: new HttpErrorResponse({ error: "" }) })
    );
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this._InvoiceService
        .UpdateInvoice(this.getInvoiceRequestData())
        .subscribe({
          next: () => {
            this._dialogRef.close(true);
          },
        });
    }
  }

  getInvoiceRequestData(): IUpdateInvoiceRequest {
    return {
      invoiceID: Number(this.dialogForm.value.invoiceID),
      customerId: Number(this.dialogForm.value.customerId),
      total: Number(this.dialogForm.value.total),
      discount: Number(this.dialogForm.value.discount),
      net: Number(this.dialogForm.value.net),
      tax: Number(this.dialogForm.value.tax),
      subscriptionType: Number(this.dialogForm.value.subscriptionType),
      subscripBranch:
        Number(this.dialogForm.value.subscripBranch) > 0
          ? Number(this.dialogForm.value.subscripBranch)
          : null,
      notes: this.dialogForm.value.notes || "",
      manualDiscount: Number(this.dialogForm.value.manualDiscount),
      url: this.dialogForm.value.url || null,
      bageValue: Number(this.dialogForm.value.bageValue),
      paymentDiscounts: this.dialogForm.value.paymentDiscounts || null,
      paymentMethods: this.dialogForm.value.payments || [],
      uploadRequest: this.dialogForm.value.uploadRequest,
    };
  }

  @HostListener("document:keydown.enter", ["$event"])
  onEnterKeyPress(event: KeyboardEvent) {
    event.preventDefault();
  }

  // ================================================= subscribe Options ===============================================
  subscribeOptions: SubscribeOptionsEnum[] = [
    SubscribeOptionsEnum.Web,
    SubscribeOptionsEnum["Mobile Application"],
    SubscribeOptionsEnum.Branch,
  ];
  isSubscribeFromBranch: boolean = false;

  getSubscribeOptionsEnumKey(index: number) {
    return SubscribeOptionsEnum[index];
  }

  onSubscribeFromChange(selectInput: MatSelectChange) {
    if (selectInput.value == SubscribeOptionsEnum.Branch) {
      this.isSubscribeFromBranch = true;
      this.dialogForm.controls["subscripBranch"].setValidators([
        Validators.required,
      ]);
      this.dialogForm.controls["subscripBranch"].updateValueAndValidity();
    } else {
      this.isSubscribeFromBranch = false;
      this.dialogForm.patchValue({
        subscripBranch: 0,
      });
      this.dialogForm.controls["subscripBranch"].setValidators(null);
      this.dialogForm.controls["subscripBranch"].updateValueAndValidity();
    }
  }

  branches = toSignal(this._Store.select(BranchSelector));
  GetBranches() {
    if (!this.branches()?.data) {
      this._Store.dispatch(GET_BRANCH_START());
    }
  }

  // =============================================== Apply Discount ===============================================
  get paymentDiscounts(): FormArray<FormControl<IDiscount>> {
    return this.dialogForm.get("paymentDiscounts") as FormArray;
  }
  addDiscount(item: IDiscount[]) {
    item.forEach((e) => {
      this.paymentDiscounts.push(new FormControl<any>(e));
    });
  }
  discountErrorList: string[] = [];
  onApplyDiscount(INPUT: HTMLInputElement) {
    const request: IDiscountRequest = {
      customerId: Number(this.dialogForm.value.customerId),
      total: Number(this.dialogForm.value.total),
      discount: Number(this.dialogForm.value.discount),
      net: Number(this.dialogForm.value.net),
      tax: Number(this.dialogForm.value.tax),
      manualDiscount: Number(this.dialogForm.value.manualDiscount),
      bageValue: Number(this.dialogForm.value.bageValue) || 0,
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
            snackBarConfig
          );
        }
      });
  }
  removeDiscount(index: number) {
    this.paymentDiscounts.removeAt(index);
    this.discountErrorList = [];
  }
  // =============================================== Payment ===============================================
  get payments() {
    return this.dialogForm.get("payments") as FormArray;
  }

  onPaymentMethodsChange(selectInput: MatSelectChange) {
    const oldPayments = this.payments.value;
    this.payments.clear();
    selectInput.value.forEach((paymentMethod: IPaymentType, index: number) => {
      this.addPayment(paymentMethod, index);
    });
    if (oldPayments.length) {
      const newPayments = this.payments.value.map((payment: any) => {
        payment =
          oldPayments.find((e: any) => e.methodId == payment.methodId) ||
          payment;
        return payment;
      });
      this.dialogForm.patchValue({
        payments: newPayments,
      });
    }
    this._cdRef.detectChanges();
  }

  addPayment(paymentMethod: IPaymentType, index: number) {
    this.payments.push(
      this._FormBuilder.group({
        id: 0,
        paymentsDetailsId: 0,
        methodId: paymentMethod.paymentID,
        methodName: paymentMethod.paymentName,
        amount: index == 0 ? this.dialogForm.value.net : 0,
        refrenceId: "",
      })
    );
  }

  PAYMENT_TYPE_DATA = toSignal(this._Store.select(PaymentTypeSelector));
  getPaymentTypes(data: IPaymentTypeRequest) {
    this._Store.dispatch(GET_PAYMENT_TYPE_START({ data }));
  }

  currentUploadedFile: string = "";
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
            this.currentUploadedFile = base64;
            this.dialogForm.patchValue({
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
              snackBarConfig
            );
          }
        });
      } catch (error) {}
    };
    readFiles();
  }
  public files: NgxFileDropEntry | null = null;
  public dropped(files: NgxFileDropEntry[]) {
    if (files.length !== 1) {
      this._snackBar.open("Please drop only one file.", "❌", snackBarConfig);
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
            snackBarConfig
          );
          return;
        }
        this.files = droppedFile;
        this.uploadFile(file);
      });
    }
  }
}
