import { CommonModule } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
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
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SelectSearchDirective } from "src/app/directives/select-search.directive";
import { ISubscription } from "src/app/interfaces/subscription.interface";
import { snackBarConfig } from "src/app/models/MatSnackBarConfig";
import { ActionsService } from "src/app/services/actions.service";

@Component({
  selector: "app-change-name-dialog",
  standalone: true,
  templateUrl: "./change-name-dialog.component.html",
  styleUrls: ["./change-name-dialog.component.scss"],
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
    FormsModule,
    MatRadioModule,
  ],
})
export class ChangeNameDialogComponent implements OnInit {
  subscription: ISubscription;

  constructor(
    public _DialogRef: MatDialogRef<ChangeNameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _ActionsService: ActionsService,
    private _snackBar: MatSnackBar
  ) {
    this.subscription = data.subscription;
  }
  ngOnInit(): void {
    this.handleUpdateRow();
  }

  closeModal() {
    this._DialogRef.close();
  }

  editForm: FormGroup = this.fb.group({
    customerName: ["", Validators.required],
    SID: ["", Validators.required],
    customerId: ["", Validators.required],
  });

  handleUpdateRow() {
    if (this.subscription) {
      this.editForm.patchValue({
        customerId: this.subscription.customerID,
        SID: this.subscription.subscriptionsID,
        customerName: this.subscription.customerName,
      });
    }
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this._ActionsService.ChangeName(form.value).subscribe({
        next: (res) => {
          if (res.succeeded) {
            this._DialogRef.close(form.value);
          } else {
            this._snackBar.open(res.messages[0], "❌", snackBarConfig);
          }
        },
        error: (err) => {
          this._snackBar.open(
            "Error occurred while updating customer name",
            "❌",
            snackBarConfig
          );
        },
      });
    }
  }
}
