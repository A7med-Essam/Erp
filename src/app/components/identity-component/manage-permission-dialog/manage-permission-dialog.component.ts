import { CommonModule } from "@angular/common";
import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ColumnTypeEnum } from "src/app/enums/columns.enum";
import {
  IPermission,
  IRole,
  IUpdateRoleRequest,
} from "src/app/interfaces/identity.interface";
import { snackBarConfig } from "src/app/models/MatSnackBarConfig";
import { TableComponent } from "src/app/pages/table/table.component";
import { IdentityService } from "src/app/services/identity.service";

@Component({
  selector: "app-manage-permission-dialog",
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    TableComponent,
    MatDialogModule,
  ],
  templateUrl: "./manage-permission-dialog.component.html",
  styleUrls: ["./manage-permission-dialog.component.scss"],
})
export class ManagePermissionDialogComponent
  implements OnInit, AfterViewChecked
{
  permissions: IPermission[] = [];
  permissions_clone: IPermission[] = [];
  pages: string[] = [];
  selectedPermissions: IPermission[] = [];
  assignedPermissions: IPermission[] = [];
  selectedPageIndex: number = 0;
  columns = [
    {
      columnDef: "claimValue",
      header: "Permission Name",
      cell: (element: IPermission) => `${element?.claimValue}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "description",
      header: "Description",
      cell: (element: IPermission) => `${element?.description}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
  ];
  constructor(
    public _DialogRef: MatDialogRef<ManagePermissionDialogComponent>,
    private _IdentityService: IdentityService,
    @Inject(MAT_DIALOG_DATA) public data: IRole,
    private _snackBar: MatSnackBar,
    private _cf: ChangeDetectorRef
  ) {}
  ngAfterViewChecked(): void {
    this._cf.detectChanges();
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.getRolePermission();
    }, 10);
  }
  closeModal() {
    this._DialogRef.close();
  }

  getRolePermission() {
    this._IdentityService.getRolePermission(this.data.id).subscribe({
      next: (res) => {
        this.permissions = this.permissions_clone = res.data.roleClaims;
        this.pages = [...new Set(res.data.roleClaims.map((e) => e.group))];
        this.pages.unshift("All Pages");
        this.assignedPermissions = res.data.roleClaims.filter(
          (e) => e.selected
        );
      },
    });
  }

  getPageCount(page: string): number {
    if (page == "All Pages") {
      return this.permissions_clone.length;
    } else {
      return this.permissions_clone.filter((e) => e.group == page).length;
    }
  }

  getSelectedPermissionPageCount(page: string) {
    if (page == "All Pages") {
      return this.selectedPermissions.length;
    } else {
      return this.selectedPermissions.filter((e) => e.group == page).length;
    }
  }

  selectPage(index: any, page: string) {
    this.selectedPageIndex = index;
    this.permissions = this.permissions_clone;
    if (index) {
      this.permissions = this.permissions_clone.filter((e) => e.group == page);
    }
  }

  assign() {
    if (this.selectedPermissions.length) {
      const request: IUpdateRoleRequest = {
        roleClaims: this.selectedPermissions,
        roleId: this.data.id,
      };
      request.roleClaims.map((e) => (e.roleId = this.data.id));
      request.roleClaims.map((e) => (e.selected = true));
      this._IdentityService.updateRolePermission(request).subscribe({
        next: (res) => {
          this._snackBar.open(res.messages[0], "✅", snackBarConfig);
          this._DialogRef.close(true);
        },
      });
    } else {
      this._snackBar.open("No permissions selected", "❌", snackBarConfig);
    }
  }

  getSelectedRows(rows: IPermission[]) {
    this.selectedPermissions = rows;
    this.assignedPermissions = [];
  }
}
