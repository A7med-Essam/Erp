import { CommonModule } from "@angular/common";
import { Component, OnDestroy } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import { Store } from "@ngrx/store";
import { FeatherModule } from "angular-feather";
import { ActionEnum } from "src/app/enums/action.enum";
import { ColumnTypeEnum } from "src/app/enums/columns.enum";
import { IGovernorate } from "src/app/interfaces/location.interface";
import { IActions, TableComponent } from "src/app/pages/table/table.component";
import { LocationService } from "src/app/services/location.service";
import { PermissionService } from "src/app/services/permission.service";
import { GET_GOVERNORATE_START } from "src/app/store/governorateStore/governorate.action";
import { GovernorateSelector } from "src/app/store/governorateStore/governorate.selector";
import { GovernorateDialogComponent } from "../governorate-dialog/governorate-dialog.component";
import { Subject, takeUntil } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-governorate",
  templateUrl: "./governorate.component.html",
  styleUrls: ["./governorate.component.scss"],
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
export class GovernorateComponent implements OnDestroy {
  private unsubscribe$ = new Subject<void>();
  TABLE_DATA = toSignal(this._Store.select(GovernorateSelector));
  Permissions = this._PermissionService.Permissions;
  actions: IActions[] = [
    {
      action: ActionEnum.delete,
      permission: this.Permissions.Governorate.Delete,
      icon: "delete",
      label: "Delete Row",
    },
    {
      action: ActionEnum.update,
      permission: this.Permissions.Governorate.Edit,
      icon: "edit",
      label: "Update Row",
    },
  ];
  columns = [
    {
      columnDef: "id",
      header: "ID",
      cell: (element: IGovernorate) => `${element?.id}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "governorateName",
      header: "Governorate Name",
      cell: (element: IGovernorate) => `${element?.governorateName}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "governorateID",
      header: "Governorate ID",
      cell: (element: IGovernorate) => `${element?.governorateID}`,
      display: true,
      type: ColumnTypeEnum.text,
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
      this._Store.dispatch(GET_GOVERNORATE_START());
    }
  }

  deleteRow(request: IGovernorate) {
    if (this.Permissions.Governorate.Delete) {
      this._LocationService.DeleteGovernorate(request.id).subscribe((res) => {
        this._Store.dispatch(GET_GOVERNORATE_START());
      });
    }
  }

  AddOrUpdate(row?: IGovernorate) {
    if (
      this.Permissions.Governorate.Edit ||
      this.Permissions.Governorate.Create
    ) {
      this._dialog
        .open(GovernorateDialogComponent, {
          enterAnimationDuration: "100ms",
          exitAnimationDuration: "100ms",
          height: "250px",
          width: "800px",
          data: row,
          disableClose: true,
        })
        .afterClosed()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res: boolean) => {
          if (res) {
            this._Store.dispatch(GET_GOVERNORATE_START());
          }
        });
    }
  }
}
