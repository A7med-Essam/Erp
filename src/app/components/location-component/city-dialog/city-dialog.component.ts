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
import { ICity, IGovernorate } from "src/app/interfaces/location.interface";
import { LocationService } from "src/app/services/location.service";
import { GET_GOVERNORATE_START } from "src/app/store/governorateStore/governorate.action";
import { GovernorateSelector } from "src/app/store/governorateStore/governorate.selector";
import { toSignal } from "@angular/core/rxjs-interop";
import { Store } from "@ngrx/store";

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
  selector: "app-city-dialog",
  templateUrl: "./city-dialog.component.html",
  styleUrls: ["./city-dialog.component.scss"],
})
export class CityDialogComponent {
  constructor(
    public _dialogRef: MatDialogRef<CityDialogComponent>,
    private _FormBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: ICity,
    private _LocationService: LocationService,
    private _Store: Store
  ) {
    this.getGovernorates();
  }

  dialogForm = this._FormBuilder.group({
    name: [this.data?.cityName, Validators.required],
    goverID: [this.data?.goverID, Validators.required],
    id: [this.data?.id],
  });

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this._LocationService.CreateOrUpdateCity(form.value).subscribe({
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
}
