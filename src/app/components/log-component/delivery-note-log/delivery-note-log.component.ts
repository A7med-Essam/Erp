import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import { Store } from "@ngrx/store";
import { FeatherModule } from "angular-feather";
import { ColumnTypeEnum } from "src/app/enums/columns.enum";
import { IDeliveryNoteLog, InvoiceLog } from "src/app/interfaces/log.interface";
import { TableComponent } from "src/app/pages/table/table.component";
import { InvoiceLogSelector } from "src/app/store/InvoiceLogStore/InvoiceLog.selector";
import { DeliveryNoteLogSelector } from "src/app/store/deliveryNoteLogStore/deliveryNoteLog.selector";

@Component({
  selector: "app-delivery-note-log",
  standalone: true,
  imports: [
    MatTableModule,
    TableComponent,
    MatCardModule,
    FeatherModule,
    CommonModule,
  ],
  templateUrl: "./delivery-note-log.component.html",
  styleUrls: ["./delivery-note-log.component.scss"],
})
export class DeliveryNoteLogComponent {
  TABLE_DATA = toSignal(this._Store.select(DeliveryNoteLogSelector));

  columns = [
    {
      columnDef: "dayID",
      header: "Day ID",
      cell: (element: IDeliveryNoteLog) => `${element?.dayID}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "deliveryDate",
      header: "Delivery Date",
      cell: (element: IDeliveryNoteLog) => `${element?.deliveryDate}`,
      display: true,
      type: ColumnTypeEnum.date,
    },
    {
      columnDef: "dayName",
      header: "Day Name",
      cell: (element: IDeliveryNoteLog) => `${element?.dayName}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "adress",
      header: "Address",
      cell: (element: IDeliveryNoteLog) => `${element?.adress}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "driver",
      header: "Driver",
      cell: (element: IDeliveryNoteLog) => `${element?.driver}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "branch",
      header: "Branch",
      cell: (element: IDeliveryNoteLog) => `${element?.branch}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "deliveryNotes",
      header: "Delivery Notes",
      cell: (element: IDeliveryNoteLog) => `${element?.deliveryNotes}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "status",
      header: "Status",
      cell: (element: IDeliveryNoteLog) => `${element?.status}`,
      display: true,
      type: ColumnTypeEnum.badge,
    },
  ];

  constructor(private _Store: Store) {}
}
