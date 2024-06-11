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
import { IDISLIKE } from "src/app/interfaces/dislike.interface";
import { DislikeService } from "src/app/services/dislike.service";

@Component({
  selector: "app-dislike-category-dialog",
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
  templateUrl: "./dislike-dialog.component.html",
  styleUrls: ["./dislike-dialog.component.scss"],
})
export class DislikeCategoryDialogComponent {
  constructor(
    public _dialogRef: MatDialogRef<DislikeCategoryDialogComponent>,
    private _FormBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: IDISLIKE,
    private _DislikeService: DislikeService
  ) {}

  dialogForm = this._FormBuilder.group({
    CategoryName: [this.data?.dilikeCategoryName, Validators.required],
    id: [this.data?.dilikeCategoryID],
  });

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this._DislikeService.AddEditDislikeCategory(form.value).subscribe({
        next: (res) => {
          this._dialogRef.close(true);
        },
      });
    }
  }
}
