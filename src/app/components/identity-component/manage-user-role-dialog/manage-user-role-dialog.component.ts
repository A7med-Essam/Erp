import { Component, Inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  IUser,
  IUserRole,
  IUserRoleRequest,
} from "src/app/interfaces/identity.interface";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from "@angular/material/dialog";
import { IdentityService } from "src/app/services/identity.service";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { TableComponent } from "src/app/pages/table/table.component";
import { ColumnTypeEnum } from "src/app/enums/columns.enum";
import { MatSnackBar } from "@angular/material/snack-bar";
import { snackBarConfig } from "src/app/models/MatSnackBarConfig";

@Component({
  selector: "app-manage-user-role-dialog",
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    CommonModule,
    TableComponent,
    MatDialogModule,
  ],
  templateUrl: "./manage-user-role-dialog.component.html",
  styleUrls: ["./manage-user-role-dialog.component.scss"],
})
export class ManageUserRoleDialogComponent implements OnInit {
  roles: IUserRole[] = [];
  assignedRoles: IUserRole[] = [];
  selectedRoles: IUserRole[] = [];
  columns = [
    {
      columnDef: "roleName",
      header: "Role Name",
      cell: (element: IUserRole) => `${element?.roleName}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "roleDescription",
      header: "Role Description",
      cell: (element: IUserRole) => `${element?.roleDescription}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
  ];
  constructor(
    public _DialogRef: MatDialogRef<ManageUserRoleDialogComponent>,
    private _IdentityService: IdentityService,
    @Inject(MAT_DIALOG_DATA) public data: IUser,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    setTimeout(() => {
      this.getRoles();
    }, 10);
  }
  closeModal() {
    this._DialogRef.close();
  }
  getRoles() {
    this._IdentityService.getUserRoles(this.data.id).subscribe({
      next: (res) => {
        this.roles = res.data.userRoles;
        this.assignedRoles = res.data.userRoles.filter((e) => e.selected);
      },
    });
  }
  getSelectedRows(rows: IUserRole[]) {
    this.selectedRoles = rows;
  }
  assignRoles() {
    if (this.selectedRoles.length) {
      const request: IUserRoleRequest = {
        userRoles: this.selectedRoles,
        userId: this.data.id,
      };
      request.userRoles.map((e) => (e.selected = true));
      this._IdentityService.updateUserRoles(request).subscribe({
        next: (res) => {
          this._snackBar.open(res.messages[0], "✅", snackBarConfig);
          this._DialogRef.close(true);
        },
      });
    } else {
      this._snackBar.open("No roles selected", "❌", snackBarConfig);
    }
  }
}
