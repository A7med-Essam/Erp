import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SelectSearchDirective } from 'src/app/directives/select-search.directive';
import { ActionsService } from 'src/app/services/actions.service';

@Component({
  selector: 'app-delete-day',
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
  ],  templateUrl: './delete-day.component.html',
  styleUrls: ['./delete-day.component.scss']
})
export class DeleteDayComponent {
  dialogForm = this._FormBuilder.group({
    dates: [""],
    Notes: ["", [Validators.required]],
    SID: 0,
  });
  todayDate: Date = new Date();

  constructor(
    public _dialogRef: MatDialogRef<DeleteDayComponent>,
    private _FormBuilder: FormBuilder,
    private _ActionsService: ActionsService,
    @Inject(MAT_DIALOG_DATA) public data: { SID: number; dates: any }
  ) {
    this.dialogForm.patchValue({
      SID: this.data.SID,
      dates: this.data.dates,
    });
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this._ActionsService.Delete(form.value).subscribe({
        next: () => {
          this._dialogRef.close(true);
        },
      });
    }
  }
}
