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
import { IRole } from "src/app/interfaces/identity.interface";
import { IdentityService } from "src/app/services/identity.service";

@Component({
  selector: "app-update-role-dialog",
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
  templateUrl: "./update-role-dialog.component.html",
  styleUrls: ["./update-role-dialog.component.scss"],
})
export class UpdateRoleDialogComponent {
  createForm: FormGroup = this.fb.group({
    id: [this.data.id, Validators.required],
    name: [this.data.name, Validators.required],
    description: [this.data.description, Validators.required],
  });
  constructor(
    public _DialogRef: MatDialogRef<UpdateRoleDialogComponent>,
    private fb: FormBuilder,
    private _IdentityService: IdentityService,
    @Inject(MAT_DIALOG_DATA) public data: IRole
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
