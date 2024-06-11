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
import { IPaginateOptions } from "src/app/interfaces/paginator.interface";
import { TableComponent, IActions } from "src/app/pages/table/table.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { FormsModule } from "@angular/forms";
import { IAllLogsRequest, ILogs } from "src/app/interfaces/log.interface";
import { LogSelector } from "src/app/store/logStore/log.selector";
import { GET_LOGS_START } from "src/app/store/logStore/log.action";
import { ColumnTypeEnum } from "src/app/enums/columns.enum";
import { UserSelector } from "src/app/store/userStore/user.selector";
import { GET_USER_FAILED, GET_USER_START } from "src/app/store/userStore/user.action";
import { IUser } from "src/app/interfaces/identity.interface";
import { IdentityService } from "src/app/services/identity.service";
import { AddCustomerComponent } from "../../customer-component/add-customer/add-customer.component";
import { AddUserDialogComponent } from "../add-user-dialog/add-user-dialog.component";
import { Subject, takeUntil } from "rxjs";
import { ActionEnum } from "src/app/enums/action.enum";
import { UpdateUserDialogComponent } from "../update-user-dialog/update-user-dialog.component";
import { ManageUserRoleDialogComponent } from "../manage-user-role-dialog/manage-user-role-dialog.component";
import { GuardService } from "src/app/services/guard.service";
import { PERMISSIONS } from "src/app/enums/permission.enum";
import { PermissionService } from "src/app/services/permission.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-user",
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
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
})
export class UserComponent implements OnInit, OnDestroy {
  Permissions = this._PermissionService.Permissions;
  actions: IActions[] = [
    {
      action: ActionEnum.update,
      icon: "edit",
      label: "Update User",
      permission: this.Permissions.Users.Edit,
    },
    {
      action: ActionEnum.view,
      icon: "security",
      label: "Manage Roles",
      permission: this.Permissions.Users.Edit,
    },
  ];
  columns = [
    {
      columnDef: "id",
      header: "ID",
      cell: (element: IUser) => `${element?.id}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "firstName",
      header: "First Name",
      cell: (element: IUser) => `${element?.firstName}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "lastName",
      header: "Last Name",
      cell: (element: IUser) => `${element?.lastName}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "userName",
      header: "UserName",
      cell: (element: IUser) => `${element?.userName}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "phoneNumber",
      header: "Phone Number",
      cell: (element: IUser) => `${element?.phoneNumber}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "email",
      header: "Email",
      cell: (element: IUser) => `${element?.email}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "emailConfirmed",
      header: "Email Confirmed",
      cell: (element: IUser) => `${element?.emailConfirmed}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "isActive",
      header: "Is Active",
      cell: (element: IUser) => `${element?.isActive}`,
      display: true,
      type: ColumnTypeEnum.toggle,
    },
    {
      columnDef: "jobTitle",
      header: "Job Title",
      cell: (element: IUser) => `${element?.jobTitle}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "profilePictureDataUrl",
      header: "Profile Picture",
      cell: (element: IUser) => `${element?.profilePictureDataUrl}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
  ];
  TABLE_DATA = toSignal(this._Store.select(UserSelector));
  private unsubscribe$ = new Subject<void>();

  constructor(
    private _Store: Store,
    public dialog: MatDialog,
    public _IdentityService: IdentityService,
    private _PermissionService: PermissionService
  ) {}

  ngOnDestroy(): void {
    this._Store.dispatch(
      GET_USER_FAILED({ error: new HttpErrorResponse({ error: "" }) })
    );
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.GetData();
  }

  GetData() {
    if (!this.TABLE_DATA()?.data) {
      this._Store.dispatch(GET_USER_START());
    }
  }

  toggle(e: { row: IUser; slide: boolean }) {
    this._IdentityService
      .changeUserStatus({
        activateUser: e.slide,
        userId: e.row.id,
      })
      .subscribe();
  }

  openCreateDialog(): void {
    if (this.Permissions.Users.Create) {
      this.dialog
        .open(AddUserDialogComponent, {
          enterAnimationDuration: "100ms",
          exitAnimationDuration: "100ms",
          height: "420px",
          width: "1200px",
          disableClose: true,
        })
        .afterClosed()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res: boolean) => {
          if (res) {
            this._Store.dispatch(GET_USER_START());
          }
        });
    }
  }

  updateRow(row: IUser) {
    this.dialog
      .open(UpdateUserDialogComponent, {
        enterAnimationDuration: "100ms",
        exitAnimationDuration: "100ms",
        height: "340px",
        width: "1200px",
        data: row,
        disableClose: true,
      })
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: boolean) => {
        if (res) {
          this._Store.dispatch(GET_USER_START());
        }
      });
  }

  manageRoles(row: IUser) {
    this.dialog.open(ManageUserRoleDialogComponent, {
      enterAnimationDuration: "100ms",
      exitAnimationDuration: "100ms",
      height: "600px",
      width: "1200px",
      data: row,
      disableClose: true,
    });
  }
}
