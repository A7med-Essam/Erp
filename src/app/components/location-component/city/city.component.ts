import { CommonModule } from "@angular/common";
import { Component, Input, OnDestroy } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatCardModule } from "@angular/material/card";
import { MatDialog } from "@angular/material/dialog";
import { MatTableModule } from "@angular/material/table";
import { Store } from "@ngrx/store";
import { FeatherModule } from "angular-feather";
import { ActionEnum } from "src/app/enums/action.enum";
import { ColumnTypeEnum } from "src/app/enums/columns.enum";
import { ICity } from "src/app/interfaces/location.interface";
import { IActions, TableComponent } from "src/app/pages/table/table.component";
import { LocationService } from "src/app/services/location.service";
import { PermissionService } from "src/app/services/permission.service";
import { GET_CITY_START } from "src/app/store/cityStore/city.action";
import { CitySelector } from "src/app/store/cityStore/city.selector";
import { CityDialogComponent } from "../city-dialog/city-dialog.component";
import { Subject, takeUntil } from "rxjs";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-city",
  templateUrl: "./city.component.html",
  styleUrls: ["./city.component.scss"],
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
export class CityComponent implements OnDestroy{
  private unsubscribe$ = new Subject<void>();
  TABLE_DATA = toSignal(this._Store.select(CitySelector));
  Permissions = this._PermissionService.Permissions;
  actions: IActions[] = [
    {
      action: ActionEnum.delete,
      permission: this.Permissions.City.Delete,
      icon: "delete",
      label: "Delete Row",
    },
    {
      action: ActionEnum.update,
      permission: this.Permissions.City.Edit,
      icon: "edit",
      label: "Update Row",
    },
  ];
  columns = [
    {
      columnDef: "id",
      header: "ID",
      cell: (element: ICity) => `${element?.id}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "cityID",
      header: "City ID",
      cell: (element: ICity) => `${element?.cityID}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "cityName",
      header: "City Name",
      cell: (element: ICity) => `${element?.cityName}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "goverID",
      header: "Governorate ID",
      cell: (element: ICity) => `${element?.goverID}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "goverName",
      header: "Governorate Name",
      cell: (element: ICity) => `${element?.goverName}`,
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
      this._Store.dispatch(GET_CITY_START());
    }
  }

  deleteRow(request: ICity) {
    if (this.Permissions.City.Delete) {
      this._LocationService.DeleteCity(request.id).subscribe((res) => {
        this._Store.dispatch(GET_CITY_START());
      });
    }
  }

  AddOrUpdate(row?: ICity) {
    if (this.Permissions.City.Edit || this.Permissions.City.Create) {
      this._dialog
        .open(CityDialogComponent, {
          enterAnimationDuration: "100ms",
          exitAnimationDuration: "100ms",
          height: "320px",
          width: "800px",
          data: row,
          disableClose: true,
        })
        .afterClosed()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res: boolean) => {
          if (res) {
            this._Store.dispatch(GET_CITY_START());
          }
        });
    }
  }
}
