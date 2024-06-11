import { Component, OnInit } from "@angular/core";
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
import { IPermission, IRole } from "src/app/interfaces/identity.interface";
import { IdentityService } from "src/app/services/identity.service";
import { RoleSelector } from "src/app/store/roleStore/role.selector";
import { GET_ROLE_START } from "src/app/store/roleStore/role.action";
import { PermissionSelector } from "src/app/store/permissionStore/permission.selector";
import { GET_PERMISSION_START } from "src/app/store/permissionStore/permission.action";

@Component({
  selector: "app-permission",
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
  templateUrl: "./permission.component.html",
  styleUrls: ["./permission.component.scss"],
})
export class PermissionComponent implements OnInit {
  columns = [
    {
      columnDef: "id",
      header: "ID",
      cell: (element: IPermission) => `${element?.id}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "claimType",
      header: "Claim Type",
      cell: (element: IPermission) => `${element?.claimType}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "claimValue",
      header: "Claim Value",
      cell: (element: IPermission) => `${element?.claimValue}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "group",
      header: "Group",
      cell: (element: IPermission) => `${element?.group}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "roleId",
      header: "Role ID",
      cell: (element: IPermission) => `${element?.roleId}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "selected",
      header: "Selected",
      cell: (element: IPermission) => `${element?.selected}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
  ];
  TABLE_DATA = toSignal(this._Store.select(PermissionSelector));

  constructor(
    private _Store: Store,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.GetData();
  }

  GetData() {
    if (!this.TABLE_DATA()?.data) {
      this._Store.dispatch(GET_PERMISSION_START());
    }
  }
}
