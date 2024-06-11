import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
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
import { toSignal } from "@angular/core/rxjs-interop";
import { Store } from "@ngrx/store";
import { IDELIVERY_DAY } from "src/app/interfaces/delivery-day.interface";
import {
  IDriver,
  ISubscription,
} from "src/app/interfaces/subscription.interface";
import { ActionsService } from "src/app/services/actions.service";
import { GET_DELIVERY_DAY_START } from "src/app/store/deliveryDayStore/deliveryDay.action";
import { DeliveryDaySelector } from "src/app/store/deliveryDayStore/deliveryDay.selector";
import { ISubscriptionTableDetails } from "../../subscription-component/subscription-details/subscription-details.component";
import { GET_AREA_START } from "src/app/store/areaStore/area.action";
import { GET_BRANCH_DRIVER_START } from "src/app/store/branchDriverStore/branchDriver.action";
import { AreaSelector } from "src/app/store/areaStore/area.selector";
import { BranchDriverSelector } from "src/app/store/branchDriverStore/branchDriver.selector";
import { CustomerAddressSelector } from "src/app/store/customerAddressStore/customerAddress.selector";
import { IArea } from "src/app/interfaces/area.interface";
import { GET_CUSTOMER_ADDRESS_START } from "src/app/store/customerAddressStore/customerAddress.action";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: "app-change-delivery-details",
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
  templateUrl: "./change-delivery-details.component.html",
  styleUrls: ["./change-delivery-details.component.scss"],
})
export class ChangeDeliveryDetailsComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  dialogForm = this._FormBuilder.group({
    BranchID: [0, Validators.required],
    DriverID: [0, Validators.required],
    AdressID: [0, Validators.required],
    Notes: [""],
    dates: new Array(),
    SID: 0,
  });

  constructor(
    public _dialogRef: MatDialogRef<ChangeDeliveryDetailsComponent>,
    private _FormBuilder: FormBuilder,
    private _ActionsService: ActionsService,
    private _Store: Store,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      row: ISubscriptionTableDetails[];
      subscriptionsHeader: ISubscription;
    }
  ) {
    if (!Array.isArray(data.row)) {
      data.row = [data.row];
    }
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.GetCustomerAddress(this.data.subscriptionsHeader.customerID);
      this.getBranchDrivers();
      this.GetArea();

      this._Store
        .select(BranchDriverSelector)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (res) => {
            if (res.data) {
              this.getDrivers(this.data.subscriptionsHeader.branch.branchID);
              this.dialogForm.patchValue({
                BranchID: this.data.subscriptionsHeader.branch.branchID,
                DriverID: this.data.subscriptionsHeader.driver.driverID,
              });
              this.data.row.forEach((r) => {
                this.dialogForm.patchValue({
                  AdressID: r.meals[0].deliveryAdress,
                });
              });
            }
          },
        });
    }, 1);
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.dialogForm.patchValue({
        SID: this.data.subscriptionsHeader.subscriptionsID,
        dates: this.data.row.map((e) => e.deliveryDate),
      });
      this._ActionsService.ChangeDeliveryDetails(form.value).subscribe({
        next: () => {
          this._dialogRef.close(true);
        },
      });
    }
  }

  // =============================================================
  AREA_DATA = toSignal(this._Store.select(AreaSelector));
  branchDriver = toSignal(this._Store.select(BranchDriverSelector));
  customerAddresses = toSignal(this._Store.select(CustomerAddressSelector));

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

  onBranchChange(e: MatSelectChange) {
    this.drivers =
      this.branchDriver()?.data?.find((b) => b.branchID == e.value)?.drivers ||
      [];
  }

  onAddressChange(e: MatSelectChange) {
    const selected = this.customerAddresses()?.data?.find(
      (f) => f.id == Number(e.value)
    );
    this.getDrivers(selected?.branchID);
    this.dialogForm.patchValue({
      BranchID: selected?.branchID,
      DriverID: selected?.driverID,
    });
  }
  drivers: IDriver[] = [];

  getDrivers(value: number | undefined) {
    this.drivers =
      this.branchDriver()?.data?.find((b) => b.branchID == value)?.drivers ||
      [];
  }

  findAreaById(id: number): IArea | undefined {
    return this.AREA_DATA()?.data?.find((e) => e.id == id);
  }

  GetCustomerAddress(CustomerID: number) {
    this._Store.dispatch(GET_CUSTOMER_ADDRESS_START({ CustomerID }));
  }
}
