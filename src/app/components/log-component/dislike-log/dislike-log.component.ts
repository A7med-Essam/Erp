import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import { Store } from "@ngrx/store";
import { FeatherModule } from "angular-feather";
import { ActionEnum } from "src/app/enums/action.enum";
import { ColumnTypeEnum } from "src/app/enums/columns.enum";
import { IDislikeLog, InvoiceLog } from "src/app/interfaces/log.interface";
import { IActions, TableComponent } from "src/app/pages/table/table.component";
import { LogService } from "src/app/services/log.service";
import { PermissionService } from "src/app/services/permission.service";
import { InvoiceLogSelector } from "src/app/store/InvoiceLogStore/InvoiceLog.selector";
import { GET_DISLIKE_LOG_START } from "src/app/store/dislikeLogStore/dislikeLog.action";
import { DislikeLogSelector } from "src/app/store/dislikeLogStore/dislikeLog.selector";

@Component({
  selector: "app-dislike-log",
  templateUrl: "./dislike-log.component.html",
  styleUrls: ["./dislike-log.component.scss"],
  standalone: true,
  imports: [
    MatTableModule,
    TableComponent,
    MatCardModule,
    FeatherModule,
    CommonModule,
  ],
})
export class DislikeLogComponent {
  TABLE_DATA = toSignal(this._Store.select(DislikeLogSelector));
  Permissions = this._PermissionService.Permissions;

  actions: IActions[] = [
    {
      action: ActionEnum.delete,
      permission: this.Permissions.SubscriptionActions.DeleteDislike,
      icon: "delete",
      label: "Delete Row",
    },
  ];
  columns = [
    {
      columnDef: "ID",
      header: "ID",
      cell: (element: IDislikeLog) => `${element?.id}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "mealID",
      header: "Meal ID",
      cell: (element: IDislikeLog) => `${element?.mealID}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "mealName",
      header: "Meal Name",
      cell: (element: IDislikeLog) => `${element?.mealName}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "oppsiteMealID",
      header: "Oppsite Meal ID",
      cell: (element: IDislikeLog) => `${element?.oppsiteMealID}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "oppsiteMealName",
      header: "Oppsite Meal Name",
      cell: (element: IDislikeLog) => `${element?.oppsiteMealName}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "notes",
      header: "Notes",
      cell: (element: IDislikeLog) => `${element?.notes}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
  ];

  constructor(
    private _Store: Store,
    private _PermissionService: PermissionService,
    private _LogService: LogService
  ) {}
  @Input() SID: number = 0;

  deleteRow(request: IDislikeLog) {
    if (this.Permissions.SubscriptionActions.DeleteDislike) {
      this._LogService.DeleteDislikeLog(request.id).subscribe((res) => {
        this._Store.dispatch(GET_DISLIKE_LOG_START({ SID: this.SID }));
      });
    }
  }
}
