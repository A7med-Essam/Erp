import { CommonModule } from "@angular/common";
import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { Store } from "@ngrx/store";
import { Subject, takeUntil } from "rxjs";
import { SelectSearchDirective } from "src/app/directives/select-search.directive";
import {
  CustomerTypeEnum,
  RegisterTypeEnum,
} from "src/app/enums/customer.enum";
import { PhoneEnum } from "src/app/enums/phone.enum";
import { IArea } from "src/app/interfaces/area.interface";
import {
  ICustomerInfo,
  ICustomersCategory,
} from "src/app/interfaces/customer.interface";
import { IdentityService } from "src/app/services/identity.service";
import { CREATE_CUSTOMER_START } from "src/app/store/customerStore/customer.action";
import { customerSelector } from "src/app/store/customerStore/customer.selector";

@Component({
  selector: "app-add-user-dialog",
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
  ],
  templateUrl: "./add-user-dialog.component.html",
  styleUrls: ["./add-user-dialog.component.scss"],
})
export class AddUserDialogComponent {
  createForm: FormGroup = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    email: [null, Validators.required],
    userName: [null, [Validators.required, Validators.minLength(6)]],
    password: [null, [Validators.required, Validators.minLength(6)]],
    confirmPassword: [null, [Validators.required, Validators.minLength(6)]],
    phoneNumber: [null, [Validators.required, Validators.minLength(6)]],
    activateUser: [true, Validators.required],
    autoConfirmEmail: [false, Validators.required],
    jobTitle: [null],
    systemId: [null, Validators.required],
  });
  constructor(
    public _DialogRef: MatDialogRef<AddUserDialogComponent>,
    private fb: FormBuilder,
    private _IdentityService: IdentityService
  ) {}

  closeModal() {
    this._DialogRef.close();
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this._IdentityService.addUser(form.value).subscribe({
        next: () => {
          this._DialogRef.close(true);
        },
      });
    }
  }
}
