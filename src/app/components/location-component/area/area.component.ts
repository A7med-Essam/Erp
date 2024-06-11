import { CommonModule } from "@angular/common";
import { Component, OnDestroy } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatCardModule } from "@angular/material/card";
import { MatDialog } from "@angular/material/dialog";
import { MatTableModule } from "@angular/material/table";
import { Store } from "@ngrx/store";
import { FeatherModule } from "angular-feather";
import { Subject, takeUntil } from "rxjs";
import { ActionEnum } from "src/app/enums/action.enum";
import { ColumnTypeEnum } from "src/app/enums/columns.enum";
import { IArea, ICity } from "src/app/interfaces/location.interface";
import { IActions, TableComponent } from "src/app/pages/table/table.component";
import { LocationService } from "src/app/services/location.service";
import { PermissionService } from "src/app/services/permission.service";
import { GET_ALL_AREA_START } from "src/app/store/allAreaStore/all-area.action";
import { AllAreaSelector } from "src/app/store/allAreaStore/all-area.selector";
import { GET_CITY_START } from "src/app/store/cityStore/city.action";
import { CityDialogComponent } from "../city-dialog/city-dialog.component";
import { AreaDialogComponent } from "../area-dialog/area-dialog.component";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-area",
  templateUrl: "./area.component.html",
  styleUrls: ["./area.component.scss"],
  standalone: true,
  imports: [
    MatTableModule,
    TableComponent,
    MatCardModule,
    FeatherModule,
    CommonModule,
    MatButtonModule
  ],
})
export class AreaComponent implements OnDestroy {
  private unsubscribe$ = new Subject<void>();
  TABLE_DATA = toSignal(this._Store.select(AllAreaSelector));
  Permissions = this._PermissionService.Permissions;
  actions: IActions[] = [
    {
      action: ActionEnum.delete,
      permission: this.Permissions.Area.Delete,
      icon: "delete",
      label: "Delete Row",
    },
    {
      action: ActionEnum.update,
      permission: this.Permissions.Area.Edit,
      icon: "edit",
      label: "Update Row",
    },
  ];
  columns = [
    {
      columnDef: "id",
      header: "ID",
      cell: (element: IArea) => `${element?.id}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "name",
      header: "Name",
      cell: (element: IArea) => `${element?.name}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "cityID",
      header: "City ID",
      cell: (element: IArea) => `${element?.cityID}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "cityName",
      header: "City Name",
      cell: (element: IArea) => `${element?.city}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "branchID",
      header: "Branch ID",
      cell: (element: IArea) => `${element?.branchID}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "branch",
      header: "Branch Name",
      cell: (element: IArea) => `${element?.branch}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "area_id",
      header: "Area ID",
      cell: (element: IArea) => `${element?.area_id}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "driver",
      header: "Driver Name",
      cell: (element: IArea) => `${element?.driver}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "driverID",
      header: "Driver ID",
      cell: (element: IArea) => `${element?.driverID}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "governorate",
      header: "Governorate Name",
      cell: (element: IArea) => `${element?.governorate}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "governorateID",
      header: "Governorate ID",
      cell: (element: IArea) => `${element?.governorateID}`,
      display: false,
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
      this._Store.dispatch(GET_ALL_AREA_START());
    }
  }

  deleteRow(request: IArea) {
    if (this.Permissions.Area.Delete) {
      this._LocationService.DeleteArea(request.id).subscribe((res) => {
        this._Store.dispatch(GET_ALL_AREA_START());
      });
    }
  }

  AddOrUpdate(row?: IArea) {
    if (this.Permissions.Area.Edit || this.Permissions.Area.Create) {
      this._dialog
        .open(AreaDialogComponent, {
          enterAnimationDuration: "100ms",
          exitAnimationDuration: "100ms",
          height: "530px",
          width: "800px",
          data: row,
          disableClose: true,
        })
        .afterClosed()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res: boolean) => {
          if (res) {
            this._Store.dispatch(GET_ALL_AREA_START());
          }
        });
    }
  }
}
