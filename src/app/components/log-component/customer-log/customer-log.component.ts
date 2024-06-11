import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import { Store } from "@ngrx/store";
import { FeatherModule } from "angular-feather";
import { map } from "rxjs";
import { ColumnTypeEnum } from "src/app/enums/columns.enum";
import { ICustomerLog } from "src/app/interfaces/log.interface";
import { TableComponent } from "src/app/pages/table/table.component";
import { CustomerLogSelector } from "src/app/store/customerLogStore/customerLog.selector";

@Component({
  selector: "app-customer-log",
  templateUrl: "./customer-log.component.html",
  styleUrls: ["./customer-log.component.scss"],
  standalone: true,
  imports: [
    MatTableModule,
    TableComponent,
    MatCardModule,
    FeatherModule,
    CommonModule,
  ],
})
export class CustomerLogComponent {
  TABLE_DATA = toSignal(
    this._Store.select(CustomerLogSelector).pipe(
      map((res) => {
        const modifiedResponse = { ...res };
        if (modifiedResponse.data) {
          modifiedResponse.data = [...modifiedResponse.data].sort(
            (a, b) => b.id - a.id
          );
        }
        return modifiedResponse;
      })
    )
  );



  columns = [
    {
      columnDef: "id",
      header: "ID",
      cell: (element: ICustomerLog) => `${element?.id}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "sid",
      header: "SID",
      cell: (element: ICustomerLog) => `${element?.sid}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "date",
      header: "Date",
      cell: (element: ICustomerLog) => `${element?.date}`,
      display: true,
      type: ColumnTypeEnum.date,
    },
    {
      columnDef: "action",
      header: "Action",
      cell: (element: ICustomerLog) => `${element?.action}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "notes",
      header: "Notes",
      cell: (element: ICustomerLog) => `${element?.notes}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "user",
      header: "User",
      cell: (element: ICustomerLog) => `${element?.user}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "actionstypes",
      header: "Actions Types",
      cell: (element: ICustomerLog) => `${element?.actionstypes}`,
      display: true,
      type: ColumnTypeEnum.badge,
    },
    {
      columnDef: "deliveryDate",
      header: "Delivery Date",
      cell: (element: ICustomerLog) => `${element?.deliveryDate}`,
      display: true,
      type: ColumnTypeEnum.date,
    },
    {
      columnDef: "remaingDays",
      header: "Remaing Days",
      cell: (element: ICustomerLog) => `${element?.remaingDays}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
  ];

  constructor(private _Store: Store) {}
}
