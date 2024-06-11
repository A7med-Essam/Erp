import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-dialog-info",
  templateUrl: "./dialog-info.component.html",
  styleUrls: ["./dialog-info.component.scss"],
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, CommonModule, MatIconModule],
})
export class DialogInfoComponent {
  DATA_INFO: any;
  DATA_TYPE: any;

  constructor(
    public dialogRef: MatDialogRef<DialogInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { data: any; type: string }
  ) {
    this.DATA_INFO = data.data;
    this.DATA_TYPE = data.type;
  }

  HasNote(arr: any[]): boolean {
    return arr.some((e) => e.mealNote);
  }
}
