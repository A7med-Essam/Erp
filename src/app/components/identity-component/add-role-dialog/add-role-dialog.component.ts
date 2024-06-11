import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { SelectSearchDirective } from "src/app/directives/select-search.directive";
import { IdentityService } from "src/app/services/identity.service";

@Component({
  selector: "app-add-role-dialog",
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
  templateUrl: "./add-role-dialog.component.html",
  styleUrls: ["./add-role-dialog.component.scss"],
})
export class AddRoleDialogComponent {
  createForm: FormGroup = this.fb.group({
    name: [null, Validators.required],
    description: [null, Validators.required],
  });
  constructor(
    public _DialogRef: MatDialogRef<AddRoleDialogComponent>,
    private fb: FormBuilder,
    private _IdentityService: IdentityService
  ) {}

  closeModal() {
    this._DialogRef.close();
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this._IdentityService.addOrUpdateRole(form.value).subscribe({
        next: () => {
          this._DialogRef.close(true);
        },
      });
    }
  }
}
