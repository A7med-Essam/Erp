import { Component, Inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { SelectSearchDirective } from "src/app/directives/select-search.directive";
import { ActionsService } from "src/app/services/actions.service";

@Component({
  selector: "app-change-start-date",
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
  templateUrl: "./change-start-date.component.html",
  styleUrls: ["./change-start-date.component.scss"],
})
export class ChangeStartDateComponent {
  dialogForm = this._FormBuilder.group({
    statrdate: ["", Validators.required],
    Notes: [""],
    SID: 0,
  });
  todayDate = new Date();
  tomorrow: Date = new Date(this.todayDate);
  constructor(
    public _dialogRef: MatDialogRef<ChangeStartDateComponent>,
    private _FormBuilder: FormBuilder,
    private _ActionsService: ActionsService,
    @Inject(MAT_DIALOG_DATA) public SID: number
  ) {
    this.tomorrow.setDate(this.todayDate.getDate() + 1);
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.dialogForm.patchValue({
        SID: this.SID,
        statrdate: form.value.statrdate.toLocaleDateString('en-CA'),
      });
      this._ActionsService.ChangeStartDate(form.value).subscribe({
        next: () => {
          this._dialogRef.close(true);
        },
      });
    }
  }
}
