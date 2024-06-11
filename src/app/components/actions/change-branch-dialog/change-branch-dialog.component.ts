import { CommonModule } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
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
import { MatSelectChange, MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Store } from "@ngrx/store";
import { SelectSearchDirective } from "src/app/directives/select-search.directive";
import { IArea } from "src/app/interfaces/area.interface";
import {
  IDriver,
  ISubscription,
} from "src/app/interfaces/subscription.interface";
import { snackBarConfig } from "src/app/models/MatSnackBarConfig";
import { ActionsService } from "src/app/services/actions.service";
import { GET_BRANCH_DRIVER_START } from "src/app/store/branchDriverStore/branchDriver.action";
import { BranchDriverSelector } from "src/app/store/branchDriverStore/branchDriver.selector";

@Component({
  selector: "app-change-branch-dialog",
  standalone: true,
  templateUrl: "./change-branch-dialog.component.html",
  styleUrls: ["./change-branch-dialog.component.scss"],
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
export class ChangeBranchDialogComponent implements OnInit {
  subscription: ISubscription;
  drivers: IDriver[] = [];
  branchDriver = toSignal(this._Store.select(BranchDriverSelector));

  constructor(
    public _DialogRef: MatDialogRef<ChangeBranchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _Store: Store,
    private _ActionsService: ActionsService,
    private _snackBar: MatSnackBar
  ) {
    this.subscription = data.subscription;
  }
  ngOnInit(): void {
    this.handleUpdateRow();
    this.getBranchDrivers();
  }

  getBranchDrivers() {
    if (!this.branchDriver()?.data) {
      this._Store.dispatch(GET_BRANCH_DRIVER_START());
    }
  }

  closeModal() {
    this._DialogRef.close();
  }

  editForm: FormGroup = this.fb.group({
    driverID: ["", Validators.required],
    branchID: ["", Validators.required],
    SID: ["", Validators.required],
  });

  handleUpdateRow() {
    if (this.subscription) {
      this.editForm.patchValue({
        SID: this.subscription.subscriptionsID,
        driverID: this.subscription.driver.driverID,
        branchID: this.subscription.branch.branchID,
      });
      this.findDrivers(this.subscription.branch.branchID);
    }
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this._ActionsService.ChangeBranchDriver(form.value).subscribe({
        next: (res) => {
          if (res.succeeded) {
            this._DialogRef.close(form.value);
          } else {
            this._snackBar.open(res.messages[0], "❌", snackBarConfig);
          }
        },
        error: (err) => {
          this._snackBar.open(
            "Error occurred while updating delivery details",
            "❌",
            snackBarConfig
          );
        },
      });
    }
  }

  onBranchChange(e: MatSelectChange) {
    this.findDrivers(e.value);
  }

  findDrivers(branchID: number) {
    this.drivers =
      this.branchDriver()?.data?.find((b) => b.branchID == branchID)?.drivers ||
      [];
  }
}
