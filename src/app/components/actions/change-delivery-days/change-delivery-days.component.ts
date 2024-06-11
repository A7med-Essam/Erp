import { CommonModule } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import {
  ReactiveFormsModule,
  Validators,
  FormBuilder,
  FormGroup,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { Store } from "@ngrx/store";
import { SelectSearchDirective } from "src/app/directives/select-search.directive";
import { ActionsService } from "src/app/services/actions.service";

import { DeliveryDaySelector } from "src/app/store/deliveryDayStore/deliveryDay.selector";
import { GET_DELIVERY_DAY_START } from "src/app/store/deliveryDayStore/deliveryDay.action";
import { ISubscription } from "src/app/interfaces/subscription.interface";
import { IDELIVERY_DAY } from "src/app/interfaces/delivery-day.interface";
import { BehaviorSubject } from "rxjs";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { SelectAllOptionsDirective } from "src/app/directives/select-all-options.directive";
import { CheckSelectDirective } from "src/app/directives/check-select.directive";

@Component({
  selector: "app-change-delivery-days",
  templateUrl: "./change-delivery-days.component.html",
  styleUrls: ["./change-delivery-days.component.scss"],
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
    MatCheckboxModule,
    SelectAllOptionsDirective,
    CheckSelectDirective
  ],
})
export class ChangeDeliveryDaysComponent implements OnInit {
  deliveryDays = toSignal(this._Store.select(DeliveryDaySelector));

  dialogForm = this._FormBuilder.group({
    deliveryDays: [new Array({}), Validators.required],
    Notes: [""],
    SID: 0,
  });

  CheckBoxStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  onCheckboxChanged(newStatus: boolean) {
    this.CheckBoxStatus.next(newStatus);
  }

  constructor(
    public _dialogRef: MatDialogRef<ChangeDeliveryDaysComponent>,
    private _FormBuilder: FormBuilder,
    private _ActionsService: ActionsService,
    private _Store: Store,
    @Inject(MAT_DIALOG_DATA) public data: ISubscription
  ) {
    this.dialogForm.patchValue({
      deliveryDays: this.getDefaultDeliveryDays(),
    });
  }

  getDefaultDeliveryDays(): IDELIVERY_DAY[] {
    const deliveryDays = this.data.deliveryDays.split("|");
    return deliveryDays
      .map((day) => {
        return (
          this.deliveryDays()?.data?.filter((e) => e.day_name == day) || []
        );
      })
      .flat();
  }

  ngOnInit(): void {
    this.GetDeliveryDays();
  }

  GetDeliveryDays() {
    if (!this.deliveryDays()?.data) {
      this._Store.dispatch(GET_DELIVERY_DAY_START());
    }
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.dialogForm.patchValue({
        SID: this.data.subscriptionsID,
      });
      this._ActionsService.ChangeDeliveryDays(form.value).subscribe({
        next: () => {
          this._dialogRef.close(true);
        },
      });
    }
  }
}
