import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
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
import { ActionsService } from "src/app/services/actions.service";
import { ISubscription } from "src/app/interfaces/subscription.interface";

@Component({
  selector: "app-change-note-dialog",
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
  templateUrl: "./change-note-dialog.component.html",
  styleUrls: ["./change-note-dialog.component.scss"],
})
export class ChangeNoteDialogComponent implements OnInit {
  dialogForm = this._FormBuilder.group({
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
    notes: [""],
    sid: 0,
  });

  constructor(
    public _dialogRef: MatDialogRef<ChangeNoteDialogComponent>,
    private _FormBuilder: FormBuilder,
    private _ActionsService: ActionsService,
    @Inject(MAT_DIALOG_DATA) public data: ISubscription
  ) {}
  ngOnInit(): void {
    this.dialogForm.patchValue({
      sid: this.data?.subscriptionsID,
      name: this.data?.customerName,
      notes: this.data?.notes,
      phone: this.data?.phone?.phone,
    });
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this._ActionsService.UpdateNotes(form.value).subscribe({
        next: () => {
          this._dialogRef.close(true);
        },
      });
    }
  }
}
