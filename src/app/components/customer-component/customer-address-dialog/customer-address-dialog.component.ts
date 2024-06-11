import { CommonModule } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatOptionModule } from "@angular/material/core";
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { Store } from "@ngrx/store";
import { SelectSearchDirective } from "src/app/directives/select-search.directive";
import { CustomerService } from "src/app/services/customer.service";
import { GET_AREA_START } from "src/app/store/areaStore/area.action";
import { AreaSelector } from "src/app/store/areaStore/area.selector";

@Component({
  selector: "app-customer-address-dialog",
  templateUrl: "./customer-address-dialog.component.html",
  styleUrls: ["./customer-address-dialog.component.scss"],
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    SelectSearchDirective,
  ],
})
export class CustomerAddressDialogComponent implements OnInit {
  customerID: any = 0;
  addressForm = this._FormBuilder.group({
    areaId: ["", Validators.required],
    adress: ["", Validators.required],
    defaultAdress: [true, Validators.required],
    customerID: [this.customerID, Validators.required],
  });
  AREA_DATA = toSignal(this._Store.select(AreaSelector));

  constructor(
    public dialogRef: MatDialogRef<CustomerAddressDialogComponent>,
    private _FormBuilder: FormBuilder,
    private _Store: Store,
    private _CustomerService: CustomerService,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {
    this.customerID = data;
    this.addressForm.patchValue({
      customerID: this.customerID,
    });
  }
  ngOnInit(): void {
    this.GetArea();
  }

  GetArea() {
    if (!this.AREA_DATA()?.data) {
      this._Store.dispatch(GET_AREA_START());
    }
  }

  addNewAddress(form: FormGroup) {
    if (form.valid) {
      this._CustomerService.AddCustomerAddress(form.value).subscribe((res) => {
        if (res.succeeded) {
          this.dialogRef.close(res.data);
        }
      });
    }
  }
}
