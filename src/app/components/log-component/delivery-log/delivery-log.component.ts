import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import { Store } from "@ngrx/store";
import { FeatherModule } from "angular-feather";
import { ColumnTypeEnum } from "src/app/enums/columns.enum";
import { IDeliveryLog } from "src/app/interfaces/log.interface";
import { TableComponent } from "src/app/pages/table/table.component";
import { DeliveryLogSelector } from "src/app/store/deliveryLogStore/deliveryLog.selector";

@Component({
  selector: "app-delivery-log",
  templateUrl: "./delivery-log.component.html",
  styleUrls: ["./delivery-log.component.scss"],
  standalone: true,
  imports: [
    MatTableModule,
    TableComponent,
    MatCardModule,
    FeatherModule,
    CommonModule,
  ],
})
export class DeliveryLogComponent {
  TABLE_DATA = toSignal(this._Store.select(DeliveryLogSelector));

  columns = [
    {
      columnDef: "deliveryDate",
      header: "Delivery Date",
      cell: (element: IDeliveryLog) => `${element?.deliveryDate}`,
      display: true,
      type: ColumnTypeEnum.date,
    },
    {
      columnDef: "printDate",
      header: "Print Date",
      cell: (element: IDeliveryLog) => `${element?.printDate}`,
      display: false,
      type: ColumnTypeEnum.date,
    },
    {
      columnDef: "planExpression",
      header: "Plan Expression",
      cell: (element: IDeliveryLog) => `${element?.planExpression}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "deliveryAdress",
      header: "Delivery Adress",
      cell: (element: IDeliveryLog) => `${element?.deliveryAdress}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "driverName",
      header: "Driver Name",
      cell: (element: IDeliveryLog) => `${element?.driverName}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "deliverBranchName",
      header: "Deliver Branch Name",
      cell: (element: IDeliveryLog) => `${element?.deliverBranchName}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "customerBranch",
      header: "Customer Branch",
      cell: (element: IDeliveryLog) => `${element?.customerBranch}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "customerBranchName",
      header: "Customer Branch Name",
      cell: (element: IDeliveryLog) => `${element?.customerBranchName}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "dayName",
      header: "Day Name",
      cell: (element: IDeliveryLog) => `${element?.dayName}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "dayState",
      header: "Day State",
      cell: (element: IDeliveryLog) => `${element?.dayState}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "dayNotes",
      header: "Day Notes",
      cell: (element: IDeliveryLog) => `${element?.dayNotes}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "customerNote",
      header: "Customer Note",
      cell: (element: IDeliveryLog) => `${element?.customerNote}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "deliveryNote",
      header: "Delivery Note",
      cell: (element: IDeliveryLog) => `${element?.deliveryNote}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "meals",
      header: "Meals",
      cell: (element: IDeliveryLog) => `${element?.meals}`,
      display: true,
      type: ColumnTypeEnum.format,
    },
  ];

  constructor(private _Store: Store) {}
}
