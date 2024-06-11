import { CommonModule } from "@angular/common";
import { Component, Input, OnDestroy } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import { Store } from "@ngrx/store";
import { FeatherModule } from "angular-feather";
import { ActionEnum } from "src/app/enums/action.enum";
import { ColumnTypeEnum } from "src/app/enums/columns.enum";
import { IDriver } from "src/app/interfaces/location.interface";
import { IActions, TableComponent } from "src/app/pages/table/table.component";
import { LocationService } from "src/app/services/location.service";
import { PermissionService } from "src/app/services/permission.service";
import { GET_DRIVER_START } from "src/app/store/driverStore/driver.action";
import { DriverSelector } from "src/app/store/driverStore/driver.selector";
import { DriverDialogComponent } from "../driver-dialog/driver-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { Subject, takeUntil } from "rxjs";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-driver",
  templateUrl: "./driver.component.html",
  styleUrls: ["./driver.component.scss"],
  standalone: true,
  imports: [
    MatTableModule,
    TableComponent,
    MatCardModule,
    FeatherModule,
    CommonModule,
    MatButtonModule,
  ],
})
export class DriverComponent implements OnDestroy {
  private unsubscribe$ = new Subject<void>();
  TABLE_DATA = toSignal(this._Store.select(DriverSelector));
  Permissions = this._PermissionService.Permissions;
  actions: IActions[] = [
    {
      action: ActionEnum.delete,
      permission: this.Permissions.Driver.Delete,
      icon: "delete",
      label: "Delete Row",
    },
    {
      action: ActionEnum.update,
      permission: this.Permissions.Driver.Edit,
      icon: "edit",
      label: "Update Row",
    },
  ];
  columns = [
    {
      columnDef: "id",
      header: "ID",
      cell: (element: IDriver) => `${element?.id}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "driverName",
      header: "Driver Name",
      cell: (element: IDriver) => `${element?.driverName}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "adress",
      header: "Address",
      cell: (element: IDriver) => `${element?.adress}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "branchName",
      header: "Branch Name",
      cell: (element: IDriver) => `${element?.branchName}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "branchID",
      header: "Branch ID",
      cell: (element: IDriver) => `${element?.branchID}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "driverID",
      header: "Driver ID",
      cell: (element: IDriver) => `${element?.driverID}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "notes",
      header: "Notes",
      cell: (element: IDriver) => `${element?.notes}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "phone1",
      header: "Phone (1)",
      cell: (element: IDriver) => `${element?.phone1}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "phone2",
      header: "Phone (2)",
      cell: (element: IDriver) => `${element?.phone2}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "phone3",
      header: "Phone (3)",
      cell: (element: IDriver) => `${element?.phone3}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "userName",
      header: "UserName",
      cell: (element: IDriver) => `${element?.userName}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "active",
      header: "Active",
      cell: (element: IDriver) => `${element?.active}`,
      display: true,
      type: ColumnTypeEnum.toggle,
    },
  ];

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  constructor(
    private _Store: Store,
    private _PermissionService: PermissionService,
    private _LocationService: LocationService,
    public _dialog: MatDialog
  ) {
    if (!this.TABLE_DATA()?.data) {
      this._Store.dispatch(GET_DRIVER_START());
    }
  }

  deleteRow(request: IDriver) {
    if (this.Permissions.Driver.Delete) {
      this._LocationService.DeleteDriver(request.id).subscribe((res) => {
        this._Store.dispatch(GET_DRIVER_START());
      });
    }
  }

  AddOrUpdate(row?: IDriver) {
    if (
      this.Permissions.Driver.Edit ||
      this.Permissions.Driver.Create
    ) {
      this._dialog
        .open(DriverDialogComponent, {
          enterAnimationDuration: "100ms",
          exitAnimationDuration: "100ms",
          height: "730px",
          width: "800px",
          data: row,
          disableClose: true,
        })
        .afterClosed()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res: boolean) => {
          if (res) {
            this._Store.dispatch(GET_DRIVER_START());
          }
        });
    }
  }
}
