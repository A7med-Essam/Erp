import { Component, Inject, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-confirmationDialog",
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: "./confirmationDialog.component.html",
  styleUrls: ["./confirmationDialog.component.scss"],
})
export class ConfirmationDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>) {}
  // constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {}

  onYesClick() {
    this.dialogRef.close(true);
  }

  onNoClick() {
    this.dialogRef.close(false);
  }
}
