import { Component, Inject, OnInit } from "@angular/core";
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
import {
  DeliveryStatusEnum,
  DeliveryStatusIndexEnum,
} from "src/app/enums/subscriptions.enum";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { SelectSearchDirective } from "src/app/directives/select-search.directive";

@Component({
  selector: "app-change-delivery-note-dialog",
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
  templateUrl: "./change-delivery-note-dialog.component.html",
  styleUrls: ["./change-delivery-note-dialog.component.scss"],
})
export class ChangeDeliveryNoteDialogComponent implements OnInit {
  dialogForm = this._FormBuilder.group({
    Notes: ["", Validators.required],
    dates: new Array(),
    sid: 0,
    name: [
      {
        value: "",
        disabled: true,
      },
    ],
    phone: [
      {
        value: "",
        disabled: true,
      },
    ],
    deliveryDays: [
      {
        value: "",
        disabled: true,
      },
    ],
  });

  constructor(
    public _dialogRef: MatDialogRef<ChangeDeliveryNoteDialogComponent>,
    private _FormBuilder: FormBuilder,
    private _ActionsService: ActionsService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      row: ISubscriptionTableDetails[];
      subscriptionsHeader: ISubscription;
    }
  ) {
    if (!Array.isArray(data.row)) {
      data.row = [data.row];
      this.dialogForm.patchValue({
        Notes: data.row[0].meals[0].deliveryNotes,
      });
    }
  }
  ngOnInit(): void {
    this.dialogForm.patchValue({
      sid: this.data.subscriptionsHeader.subscriptionsID,
      dates: this.data.row.map((e) => e.deliveryDate),
      name: this.data.subscriptionsHeader?.customerName,
      phone: this.data.subscriptionsHeader?.phone?.phone,
      deliveryDays: this.data.subscriptionsHeader?.deliveryDays?.split("|")?.join(" - "),
    });
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this._ActionsService.UpdateDeliveryNotes(form.value).subscribe({
        next: () => {
          this._dialogRef.close(true);
        },
      });
    }
  }
}
