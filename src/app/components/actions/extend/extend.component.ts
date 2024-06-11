import { Component, Inject } from "@angular/core";
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
import { MatSelectModule } from "@angular/material/select";
import { SelectSearchDirective } from "src/app/directives/select-search.directive";
import { ActionsService } from "src/app/services/actions.service";
import { MatAutocompleteModule } from "@angular/material/autocomplete";

@Component({
  selector: "app-extend",
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
    MatAutocompleteModule
  ],
  templateUrl: "./extend.component.html",
  styleUrls: ["./extend.component.scss"],
})
export class ExtendComponent {
  dialogForm = this._FormBuilder.group({
    DaysCount: [1, [Validators.required,Validators.min(1)]],
    Notes: [""],
    SID: 0,
  });
  todayDate: Date = new Date();

  constructor(
    public _dialogRef: MatDialogRef<ExtendComponent>,
    private _FormBuilder: FormBuilder,
    private _ActionsService: ActionsService,
    @Inject(MAT_DIALOG_DATA) public SID: number
  ) {}

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.dialogForm.patchValue({
        SID: this.SID,
      });
      this._ActionsService.Extend(form.value).subscribe({
        next: () => {
          this._dialogRef.close(true);
        },
      });
    }
  }
}
