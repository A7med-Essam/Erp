import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
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
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { SelectSearchDirective } from "src/app/directives/select-search.directive";
import { IUser } from "src/app/interfaces/identity.interface";

import { IdentityService } from "src/app/services/identity.service";

@Component({
  selector: "app-update-user-dialog",
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
  templateUrl: "./update-user-dialog.component.html",
  styleUrls: ["./update-user-dialog.component.scss"],
})
export class UpdateUserDialogComponent {
  editForm: FormGroup = this.fb.group({
    userId: [this.data.id, Validators.required],
    firstName: [this.data.firstName, Validators.required],
    lastName: [this.data.lastName, Validators.required],
    email: [this.data.email, Validators.required],
    userName: [
      this.data.userName,
      [Validators.required, Validators.minLength(6)],
    ],
    phoneNumber: [
      this.data.phoneNumber,
      [Validators.required, Validators.minLength(6)],
    ],
    isActive: [this.data.isActive, Validators.required],
    emailConfirmed: [this.data.emailConfirmed, Validators.required],
    jobTitle: [this.data.jobTitle],
    profilePictureDataUrl: [""],
  });
  constructor(
    public _DialogRef: MatDialogRef<UpdateUserDialogComponent>,
    private fb: FormBuilder,
    private _IdentityService: IdentityService,
    @Inject(MAT_DIALOG_DATA) public data: IUser
  ) {}

  closeModal() {
    this._DialogRef.close();
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this._IdentityService.updateUser(form.value).subscribe({
        next: () => {
          this._DialogRef.close(true);
        },
      });
    }
  }
}
