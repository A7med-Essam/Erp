import { CommonModule } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Store } from "@ngrx/store";
import { SelectSearchDirective } from "src/app/directives/select-search.directive";
import { IArea } from "src/app/interfaces/area.interface";
import {
  ICustomerAddressDetails,
  IUpdateCustomerAddressRequest,
} from "src/app/interfaces/customer.interface";
import { ISubscription } from "src/app/interfaces/subscription.interface";
import { snackBarConfig } from "src/app/models/MatSnackBarConfig";
import { ActionsService } from "src/app/services/actions.service";
import {
  GET_AREA_FAILED,
  GET_AREA_START,
} from "src/app/store/areaStore/area.action";

@Component({
  selector: "app-change-address-dialog",
  standalone: true,
  imports: [
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    CommonModule,
    MatSlideToggleModule,
    MatIconModule,
    MatCardModule,
    SelectSearchDirective,
    FormsModule,
    MatRadioModule,
  ],
  templateUrl: "./change-address-dialog.component.html",
  styleUrls: ["./change-address-dialog.component.scss"],
})
export class ChangeAddressDialogComponent implements OnInit, OnDestroy {
  subscription: ISubscription;
  area: IArea[] = [];
  customerAddresses: ICustomerAddressDetails[] = [];
  editForm: FormGroup = this.fb.group({
    customerId: ["", Validators.required],
    SID: ["", Validators.required],
    customerAdresses: ["", Validators.required],
    selectedAddress: 0,
  });

  constructor(
    public _DialogRef: MatDialogRef<ChangeAddressDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _ActionsService: ActionsService,
    private _snackBar: MatSnackBar,
    private _Store: Store
  ) {
    this.subscription = data.subscription;
    this.area = data.area.data;
    this.customerAddresses = data.customerAddresses.data;
  }
  ngOnInit(): void {
    this.handleUpdateRow();
  }
  ngOnDestroy(): void {
    this._Store.dispatch(
      GET_AREA_FAILED({ error: new HttpErrorResponse({ error: "" }) })
    );
    this._Store.dispatch(GET_AREA_START());
  }
  closeModal() {
    this._DialogRef.close();
  }
  handleUpdateRow() {
    if (this.subscription) {
      const customerAddressesIds = this.customerAddresses.map((e) => e.areaId);
      const userArea = this.area?.filter((AreaObj) =>
        customerAddressesIds.includes(AreaObj.id)
      );
      this.editForm.patchValue({
        customerId: this.subscription.customerID,
        SID: this.subscription.subscriptionsID,
      });
      if (userArea?.length) {
        this.editForm.patchValue({
          customerAdresses: userArea,
        });
        userArea.forEach((a) => {
          this.addFullAddress();
        });
        const defaultAddress = this.editForm.value.customerAdresses.filter(
          (s: any) => s.defaultAdress.toString() == "true"
        );
        this.editForm.patchValue({
          selectedAddress:
            defaultAddress[defaultAddress.length - 1]?.id ||
            this.editForm.value.customerAdresses[0]?.id,
        });
      }
    }
  }

  // =================== Handle Address logic ===================

  addFullAddress() {
    const updatedAddresses = this.editForm.value.customerAdresses.map(
      (address: any) => {
        const updatedAddress = { ...address };
        const oldArea = this.customerAddresses.find(
          (c) => c.areaId == address.id
        );
        updatedAddress.adress = oldArea?.adress;
        updatedAddress.driverID = oldArea?.driverID;
        updatedAddress.customerID = oldArea?.customerID;
        updatedAddress.defaultAdress = oldArea?.defaultAdress;
        updatedAddress.addressId = oldArea?.id;
        return updatedAddress;
      }
    );
    this.editForm.patchValue({
      customerAdresses: updatedAddresses,
    });
    this.alterArea(this.editForm.value.customerAdresses);
  }

  addNewAddress(addressName: string, id: number) {
    const updatedAddresses = this.editForm.value.customerAdresses.map(
      (address: any) => {
        const updatedAddress = { ...address };
        if (address.id == id) {
          updatedAddress.adress = addressName;
        }
        return updatedAddress;
      }
    );
    this.editForm.patchValue({
      customerAdresses: updatedAddresses,
    });
    this.alterArea(this.editForm.value.customerAdresses);
  }

  alterArea(adresses: IArea[]) {
    this.area = this.area.map((e) => {
      const foundItem = adresses.find((a) => a.id === e.id);
      return foundItem !== undefined ? foundItem : e;
    });
  }

  onAreaSelectionChange(areaId: number) {
    this.editForm.patchValue({
      selectedAddress: areaId,
    });
  }

  // =================== submit & validate ===================

  onSubmit(form: FormGroup) {
    if (form.valid) {
      if (this.validateAddress(form.value.customerAdresses)) {
        if (this.checkDefaultAddress(form)) {
          const data = this.getFormValues(form.value);
          data.customerAdresses.forEach((obj: any) => {
            delete obj.areaName;
            delete obj.branchName;
            delete obj.branchId;
            delete obj.addressId;
          });
          this._ActionsService.UpdateCustomerAdress(data).subscribe({
            next: (res) => {
              if (res.succeeded) {
                this._DialogRef.close(form.value);
              } else {
                this._snackBar.open(res.messages[0], "❌", snackBarConfig);
              }
            },
            error: (err) => {
              this._snackBar.open(
                "Error occurred while updating address",
                "❌",
                snackBarConfig
              );
            },
          });
        } else {
          this._snackBar.open(
            "You must select a default address",
            "❌",
            snackBarConfig
          );
        }
      } else {
        this._snackBar.open("address field is required", "❌", snackBarConfig);
      }
    }
  }

  validateAddress(addresses: any[]) {
    return addresses.every((a: any) => Object.hasOwn(a, "adress"));
  }

  checkDefaultAddress(form: FormGroup): boolean {
    return form.value.customerAdresses.some(
      (e: any) => e.id == form.value.selectedAddress
    );
  }

  getFormValues(values: any): IUpdateCustomerAddressRequest {
    values.customerAdresses.forEach((e: any) => {
      e.areaId = e.id;
      e.branchID = e.branchId;
      e.customerID = values.customerId;
      e.driverID = null;
      e.defaultAdress = false;
      if (e.hasOwnProperty("addressId")) {
        e.id = e.addressId;
      } else {
        e.id = 0;
      }
    });
    values.customerAdresses = values.customerAdresses.map((c: any) => {
      if (values.selectedAddress == c.areaId) {
        c.defaultAdress = true;
      }
      return c;
    });
    return {
      customerAdresses: values.customerAdresses,
      customerId: values.customerId,
      SID: values.SID,
    };
  }
}
