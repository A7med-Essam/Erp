import { Component, Inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IMealLine } from "src/app/interfaces/meals.interface";
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { FeatherModule } from "angular-feather";
import { TableComponent } from "src/app/pages/table/table.component";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-update-item-dialog",
  standalone: true,
  imports: [
    MatTableModule,
    TableComponent,
    MatCardModule,
    FeatherModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
  ],
  templateUrl: "./update-item-dialog.component.html",
  styleUrls: ["./update-item-dialog.component.scss"],
})
export class UpdateItemDialogComponent {
  row: IMealLine;
  constructor(
    public _dialogRef: MatDialogRef<UpdateItemDialogComponent>,
    public _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: IMealLine
  ) {
    this.row = data;
  }
}
