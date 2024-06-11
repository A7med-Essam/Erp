import { Component, Inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { ISubscription } from "src/app/interfaces/subscription.interface";
import { ActionsService } from "src/app/services/actions.service";
import { ISubscriptionTableDetails } from "../../subscription-component/subscription-details/subscription-details.component";
import { DeliveryStatusEnum, DeliveryStatusIndexEnum } from "src/app/enums/subscriptions.enum";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { SelectSearchDirective } from "src/app/directives/select-search.directive";

@Component({
  selector: "app-change-status",
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
  templateUrl: "./change-status.component.html",
  styleUrls: ["./change-status.component.scss"],
})
export class ChangeStatusComponent {
  DeliveryStatus: DeliveryStatusEnum[] = [
    DeliveryStatusEnum.Deliveried,
    DeliveryStatusEnum.Hold,
    DeliveryStatusEnum.Resticited,
    DeliveryStatusEnum.Canceld,
    DeliveryStatusEnum.Pending,
  ];

  dialogForm = this._FormBuilder.group({
    Status: ["", Validators.required],
    dates: new Array(),
    SID: 0,
  });

  constructor(
    public _dialogRef: MatDialogRef<ChangeStatusComponent>,
    private _FormBuilder: FormBuilder,
    private _ActionsService: ActionsService,
    private _Store: Store,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      row: ISubscriptionTableDetails[];
      subscriptionsHeader: ISubscription;
    }
  ) {
    if (!Array.isArray(data.row)) {
      data.row = [data.row];
      this.dialogForm.patchValue({
        Status: data.row[0].meals[0].deliveryStatus,
      });
    }
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.dialogForm.patchValue({
        SID: this.data.subscriptionsHeader.subscriptionsID,
        dates: this.data.row.map((e) => e.deliveryDate),
        Status: this.getStatusCode(form.value.Status),
      });
      this._ActionsService.ChangeStatus(form.value).subscribe({
        next: () => {
          this._dialogRef.close(true);
        },
      });
    }
  }

  getStatusCode(key: string) {
    switch (key) {
      case DeliveryStatusEnum.Deliveried:
        return DeliveryStatusIndexEnum.Deliveried.toString();
      case DeliveryStatusEnum.Hold:
        return DeliveryStatusIndexEnum.Hold.toString();
      case DeliveryStatusEnum.Pending:
        return DeliveryStatusIndexEnum.Pending.toString();
      case DeliveryStatusEnum.Resticited:
        return DeliveryStatusIndexEnum.Resticited.toString();
      case DeliveryStatusEnum.Canceld:
        return DeliveryStatusIndexEnum.Canceld.toString();
      default:
        return "";
    }
  }
}
