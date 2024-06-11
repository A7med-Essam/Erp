import { Component, Inject, InjectionToken } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { ActionsService } from "src/app/services/actions.service";
import { IUpdateNutritionAction } from "src/app/interfaces/action.interface";

@Component({
  selector: "app-update-nutrition-dialog",
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: "./update-nutrition-dialog.component.html",
  styleUrls: ["./update-nutrition-dialog.component.scss"],
})
export class UpdateNutritionDialogComponent {
  carbValue: number = 0;
  proteinValue: number = 0;

  constructor(
    public _dialogRef: MatDialogRef<UpdateNutritionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public SID: number,
    private _ActionsService: ActionsService
  ) {}

  increaseCarb() {
    this.carbValue += 50;
  }

  decreaseCarb() {
    if (this.carbValue > -50) {
      this.carbValue -= 50;
    }
  }

  increaseProtein() {
    this.proteinValue += 50;
  }

  decreaseProtein() {
    if (this.proteinValue > -50) {
      this.proteinValue -= 50;
    }
  }

  update() {
    const data: IUpdateNutritionAction = {
      sid: this.SID,
      carb: this.carbValue,
      protin: this.proteinValue,
    };
    this._ActionsService.UpdateNutrition(data).subscribe({
      next: () => {
        this._dialogRef.close(true);
      },
    });
  }
}
