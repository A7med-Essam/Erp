import { Component, Inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
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
import { ITransformedPlanPrice, PlanPrice } from "src/app/interfaces/allPlan.interface";

@Component({
  selector: "app-plan-price-dialog",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    SelectSearchDirective,
    MatCardModule,
    MatSelectModule,
  ],
  templateUrl: "./plan-price-dialog.component.html",
  styleUrls: ["./plan-price-dialog.component.scss"],
})
export class PlanPriceDialogComponent {
  priceForm = this._FormBuilder.group({
    dayName: [
      { value: this.row?.dayName, disabled: true },
      Validators.required,
    ],
  }) as FormGroup;

  constructor(
    private _FormBuilder: FormBuilder,
    public _dialogRef: MatDialogRef<PlanPriceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public row: ITransformedPlanPrice
  ) {
    Object.keys(row).forEach((key) => {
      if (key !== "dayName") {
        this.priceForm.addControl(key, new FormControl(row[key]));
      }
    });
  }

  getControls() {
    return Object.keys(this.priceForm.controls).filter(
      (control) => control !== "dayName"
    );
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this._dialogRef.close(form.getRawValue());
    }
  }
}
