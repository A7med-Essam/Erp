import { Component, Inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
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
import { IGovernorate } from "src/app/interfaces/location.interface";
import { LocationService } from "src/app/services/location.service";

@Component({
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
  selector: "app-governorate-dialog",
  templateUrl: "./governorate-dialog.component.html",
  styleUrls: ["./governorate-dialog.component.scss"],
})
export class GovernorateDialogComponent {
  constructor(
    public _dialogRef: MatDialogRef<GovernorateDialogComponent>,
    private _FormBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: IGovernorate,
    private _LocationService: LocationService
  ) {}

  dialogForm = this._FormBuilder.group({
    Name: [this.data?.governorateName, Validators.required],
    ID: [this.data?.id],
  });

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this._LocationService.CreateOrUpdateGovernorate(form.value).subscribe({
        next: (res) => {
          this._dialogRef.close(true);
        },
      });
    }
  }
}
