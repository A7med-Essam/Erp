import { CommonModule } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
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
import { SelectSearchDirective } from "src/app/directives/select-search.directive";
import { PhoneEnum } from "src/app/enums/phone.enum";
import { ICustomerPhone } from "src/app/interfaces/customer.interface";
import { ISubscription } from "src/app/interfaces/subscription.interface";
import { snackBarConfig } from "src/app/models/MatSnackBarConfig";
import { ActionsService } from "src/app/services/actions.service";

@Component({
  selector: "app-change-phone-dialog",
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
  templateUrl: "./change-phone-dialog.component.html",
  styleUrls: ["./change-phone-dialog.component.scss"],
})
export class ChangePhoneDialogComponent implements OnInit {
  subscription: ISubscription;

  constructor(
    public _DialogRef: MatDialogRef<ChangePhoneDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _ActionsService: ActionsService,
    private _snackBar: MatSnackBar
  ) {
    this.subscription = data.subscription;
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.getPhones();
    }, 10);
  }

  phones: ICustomerPhone[] = [];
  getPhones() {
    this._ActionsService
      .GetCustomersPhones(this.subscription.customerID)
      .subscribe((res) => {
        this.phones = res.data;
        this.handleUpdateRow();
      });
  }

  closeModal() {
    this._DialogRef.close();
  }

  editForm: FormGroup = this.fb.group({
    customerPhons: this.fb.group({
      Mobile: ["", Validators.required],
      "Work Phone": [],
      "Home Phone": [],
      "Other Phone": [],
    }),
  });

  handleUpdateRow() {
    const phoneValues: Record<string, string> = {};
    this.phones.forEach((ph) => {
      switch (ph.phoneType) {
        case PhoneEnum.Home:
          phoneValues[PhoneEnum.Home] = ph.phone;
          break;
        case PhoneEnum.Work:
          phoneValues[PhoneEnum.Work] = ph.phone;
          break;
        case PhoneEnum.Mobile:
          phoneValues[PhoneEnum.Mobile] = ph.phone;
          break;
        case PhoneEnum.Other:
          phoneValues[PhoneEnum.Other] = ph.phone;
          break;
        default:
          phoneValues[PhoneEnum.Mobile] = ph.phone;
          break;
      }
    });

    this.editForm?.get("customerPhons")?.patchValue(phoneValues);
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      form.value.customerPhons = this.handleCustomerPhone(form);
      this._ActionsService.UpdateCustomerPhons(form.value).subscribe({
        next: (res) => {
          if (res.succeeded) {
            this._DialogRef.close(form.value);
          } else {
            this._snackBar.open(res.messages[0], "❌", snackBarConfig);
          }
        },
        error: (err) => {
          this._snackBar.open(
            "Error occurred while updating phones",
            "❌",
            snackBarConfig
          );
        },
      });
    }
  }

  handleCustomerPhone(form: FormGroup): any[] {
    const customerPhones = [];
    for (const [key, value] of Object.entries(form.value.customerPhons)) {
      if (value !== null) {
        const phoneEntry = {
          id:
            this.phones.find((e) => e.phoneType == key)?.id ||
            this.phones[0]?.id,
          phone: value,
          phoneType: key,
        };
        customerPhones.push(phoneEntry);
      }
    }
    return customerPhones;
  }
}
