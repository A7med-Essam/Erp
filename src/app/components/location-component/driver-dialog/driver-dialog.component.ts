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
import { IDriver } from "src/app/interfaces/location.interface";
import { LocationService } from "src/app/services/location.service";
import { GET_GOVERNORATE_START } from "src/app/store/governorateStore/governorate.action";
import { GovernorateSelector } from "src/app/store/governorateStore/governorate.selector";
import { toSignal } from "@angular/core/rxjs-interop";
import { Store } from "@ngrx/store";
import { GET_BRANCH_START } from "src/app/store/branchStore/branch.action";
import { BranchSelector } from "src/app/store/branchStore/branch.selector";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";

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
    MatSlideToggleModule,
  ],
  selector: "app-driver-dialog",
  templateUrl: "./driver-dialog.component.html",
  styleUrls: ["./driver-dialog.component.scss"],
})
export class DriverDialogComponent {
  constructor(
    public _dialogRef: MatDialogRef<DriverDialogComponent>,
    private _FormBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: IDriver,
    private _LocationService: LocationService,
    private _Store: Store
  ) {
    this.GetBranches();
  }

  dialogForm = this._FormBuilder.group({
    driverName: [this.data?.driverName, Validators.required],
    branchid: [this.data?.branchID, Validators.required],
    phone1: [this.data?.phone1, Validators.required],
    phone2: [this.data?.phone2, Validators.required],
    phone3: [this.data?.phone3, Validators.required],
    adress: [this.data?.adress, Validators.required],
    notes: [this.data?.notes, Validators.required],
    active: [this.data?.active ? this.data.active : false, Validators.required],
    id: [this.data?.id],
  });

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this._LocationService.CreateOrUpdateDriver(form.value).subscribe({
        next: (res) => {
          this._dialogRef.close(true);
        },
      });
    }
  }

  BRANCH_DATA = toSignal(this._Store.select(BranchSelector));
  GetBranches() {
    if (!this.BRANCH_DATA()?.data) {
      this._Store.dispatch(GET_BRANCH_START());
    }
  }
}
