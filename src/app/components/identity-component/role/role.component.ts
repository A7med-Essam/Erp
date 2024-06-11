import { Component, OnDestroy, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialog } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { Store } from "@ngrx/store";
import { FeatherModule } from "angular-feather";
import { TableComponent, IActions } from "src/app/pages/table/table.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { FormsModule } from "@angular/forms";
import { ColumnTypeEnum } from "src/app/enums/columns.enum";
import { IRole } from "src/app/interfaces/identity.interface";
import { IdentityService } from "src/app/services/identity.service";
import { RoleSelector } from "src/app/store/roleStore/role.selector";
import { GET_ROLE_START } from "src/app/store/roleStore/role.action";
import { AddRoleDialogComponent } from "../add-role-dialog/add-role-dialog.component";
import { Subject, takeUntil } from "rxjs";
import { ActionEnum } from "src/app/enums/action.enum";
import { UpdateRoleDialogComponent } from "../update-role-dialog/update-role-dialog.component";
import { ManagePermissionDialogComponent } from "../manage-permission-dialog/manage-permission-dialog.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { PermissionService } from "src/app/services/permission.service";
import { snackBarConfig } from "src/app/models/MatSnackBarConfig";

@Component({
  selector: "app-role",
  standalone: true,
  imports: [
    MatTableModule,
    TableComponent,
    MatCardModule,
    FeatherModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    FormsModule,
  ],
  templateUrl: "./role.component.html",
  styleUrls: ["./role.component.scss"],
})
export class RoleComponent implements OnInit, OnDestroy {
  Permissions = this._PermissionService.Permissions;
  actions: IActions[] = [
    {
      action: ActionEnum.update,
      icon: "edit",
      label: "Update Role",
      permission: this.Permissions.Roles.Edit,
    },
    {
      action: ActionEnum.delete,
      icon: "delete",
      label: "Delete Role",
      permission: this.Permissions.Roles.Delete,
    },
    {
      action: ActionEnum.view,
      icon: "security",
      label: "Manage Permission",
      permission: this.Permissions.Roles.Edit,
    },
  ];
  columns = [
    {
      columnDef: "id",
      header: "ID",
      cell: (element: IRole) => `${element?.id}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "name",
      header: "Name",
      cell: (element: IRole) => `${element?.name}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "description",
      header: "Description",
      cell: (element: IRole) => `${element?.description}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
  ];
  TABLE_DATA = toSignal(this._Store.select(RoleSelector));
  private unsubscribe$ = new Subject<void>();

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  constructor(
    private _Store: Store,
    public dialog: MatDialog,
    public _IdentityService: IdentityService,
    private _snackBar: MatSnackBar,
    private _PermissionService: PermissionService
  ) {}

  ngOnInit(): void {
    this.GetData();
  }

  GetData() {
    if (!this.TABLE_DATA()?.data) {
      this._Store.dispatch(GET_ROLE_START());
    }
  }

  openCreateDialog(): void {
    if (this.Permissions.Roles.Create) {
      this.dialog
        .open(AddRoleDialogComponent, {
          enterAnimationDuration: "100ms",
          exitAnimationDuration: "100ms",
          height: "235px",
          width: "1200px",
          disableClose: true,
        })
        .afterClosed()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res: boolean) => {
          if (res) {
            this._Store.dispatch(GET_ROLE_START());
          }
        });
    }
  }

  updateRow(row: IRole) {
    if (row.name.toLowerCase().includes("admin")) {
      this._snackBar.open(
        "Cannot update super admin role",
        "❌",
        snackBarConfig
      );
    } else {
      this.dialog
        .open(UpdateRoleDialogComponent, {
          enterAnimationDuration: "100ms",
          exitAnimationDuration: "100ms",
          height: "235px",
          width: "1200px",
          data: row,
          disableClose: true,
        })
        .afterClosed()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res: boolean) => {
          if (res) {
            this._Store.dispatch(GET_ROLE_START());
          }
        });
    }
  }

  deleteRow(row: IRole) {
    if (row.name.toLowerCase().includes("admin")) {
      this._snackBar.open(
        "Cannot delete super admin role",
        "❌",
        snackBarConfig
      );
    } else {
      this._IdentityService.deleteRole(row.id).subscribe((res) => {
        this._Store.dispatch(GET_ROLE_START());
      });
    }
  }

  managePermission(row: IRole) {
    if (row.name.toLowerCase().includes("admin")) {
      this._snackBar.open(
        "Cannot manage super admin role",
        "❌",
        snackBarConfig
      );
    } else {
      this.dialog.open(ManagePermissionDialogComponent, {
        enterAnimationDuration: "100ms",
        exitAnimationDuration: "100ms",
        height: "600px",
        width: "1200px",
        data: row,
        disableClose: true,
      });
    }
  }
}
