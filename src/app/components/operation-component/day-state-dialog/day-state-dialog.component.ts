import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { SelectSearchDirective } from "src/app/directives/select-search.directive";
import { DeliveryStatusEnum, DeliveryStatusIndexEnum } from "src/app/enums/subscriptions.enum";

@Component({
  selector: "app-day-state-dialog",
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
  templateUrl: "./day-state-dialog.component.html",
  styleUrls: ["./day-state-dialog.component.scss"],
})
export class DayStateDialogComponent {

  public get State(): string[] {
    return Object.keys(DeliveryStatusEnum);
  }
  constructor(
    public _dialogRef: MatDialogRef<DayStateDialogComponent>,
    private _FormBuilder: FormBuilder
  ) {}

  dialogForm = this._FormBuilder.group({
    state: ["", Validators.required],
  });

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this._dialogRef.close(form.value.state);
    }
  }
}
