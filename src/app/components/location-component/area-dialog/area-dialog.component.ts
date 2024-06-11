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
import { IArea } from "src/app/interfaces/location.interface";
import { LocationService } from "src/app/services/location.service";
import { GET_GOVERNORATE_START } from "src/app/store/governorateStore/governorate.action";
import { GovernorateSelector } from "src/app/store/governorateStore/governorate.selector";
import { toSignal } from "@angular/core/rxjs-interop";
import { Store } from "@ngrx/store";
import { CitySelector } from "src/app/store/cityStore/city.selector";
import { GET_CITY_START } from "src/app/store/cityStore/city.action";
import { DriverSelector } from "src/app/store/driverStore/driver.selector";
import { GET_DRIVER_START } from "src/app/store/driverStore/driver.action";
import { BranchSelector } from "src/app/store/branchStore/branch.selector";
import { GET_BRANCH_START } from "src/app/store/branchStore/branch.action";

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
  selector: "app-area-dialog",
  templateUrl: "./area-dialog.component.html",
  styleUrls: ["./area-dialog.component.scss"],
})
export class AreaDialogComponent {
  constructor(
    public _dialogRef: MatDialogRef<AreaDialogComponent>,
    private _FormBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: IArea,
    private _LocationService: LocationService,
    private _Store: Store
  ) {
    this.getGovernorates();
    this.getCities();
    this.getDrivers();
    this.GetBranches();
  }

  dialogForm = this._FormBuilder.group({
    name: [this.data?.name, Validators.required],
    cityID: [this.data?.cityID, Validators.required],
    governorateID: [this.data?.governorateID, Validators.required],
    branchID: [this.data?.branchID, Validators.required],
    driverID: [this.data?.driverID, Validators.required],
    id: [this.data?.id],
  });

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this._LocationService.CreateOrUpdateArea(form.value).subscribe({
        next: (res) => {
          this._dialogRef.close(true);
        },
      });
    }
  }

  GOVERNORATE_DATA = toSignal(this._Store.select(GovernorateSelector));
  getGovernorates() {
    if (!this.GOVERNORATE_DATA()?.data) {
      this._Store.dispatch(GET_GOVERNORATE_START());
    }
  }
  CITY_DATA = toSignal(this._Store.select(CitySelector));
  getCities() {
    if (!this.CITY_DATA()?.data) {
      this._Store.dispatch(GET_CITY_START());
    }
  }
  DRIVER_DATA = toSignal(this._Store.select(DriverSelector));
  getDrivers() {
    if (!this.DRIVER_DATA()?.data) {
      this._Store.dispatch(GET_DRIVER_START());
    }
  }
  BRANCH_DATA = toSignal(this._Store.select(BranchSelector));
  GetBranches() {
    if (!this.BRANCH_DATA()?.data) {
      this._Store.dispatch(GET_BRANCH_START());
    }
  }
}
