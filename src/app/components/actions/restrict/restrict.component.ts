import { Component, Inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  Validators,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from "@angular/forms";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from "@angular/material/dialog";
import { ActionsService } from "src/app/services/actions.service";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { SelectSearchDirective } from "src/app/directives/select-search.directive";

@Component({
  selector: "app-restrict",
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
  templateUrl: "./restrict.component.html",
  styleUrls: ["./restrict.component.scss"],
})
export class RestrictComponent {
  dialogForm = this._FormBuilder.group({
    datefrom: ["", Validators.required],
    dateto: ["", Validators.required],
    Notes: [""],
    SID: 0,
  });
  todayDate: Date = new Date();

  constructor(
    public _dialogRef: MatDialogRef<RestrictComponent>,
    private _FormBuilder: FormBuilder,
    private _ActionsService: ActionsService,
    @Inject(MAT_DIALOG_DATA) public SID: number
  ) {}

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.dialogForm.patchValue({
        SID: this.SID,
        datefrom: form.value.datefrom.toLocaleDateString('en-CA'),
        dateto: form.value.dateto.toLocaleDateString('en-CA'),
      });
      this._ActionsService.Restrict(form.value).subscribe({
        next: () => {
          this._dialogRef.close(true);
        },
      });
    }
  }
}
