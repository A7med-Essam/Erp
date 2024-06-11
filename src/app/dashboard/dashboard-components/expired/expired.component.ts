import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FeatherModule } from "angular-feather";
import { MatCardModule } from "@angular/material/card";
import { IActions, TableComponent } from "src/app/pages/table/table.component";
import { IExpired } from "src/app/interfaces/dashboard.interface";
import { CustomerTypeEnum } from "src/app/enums/customer.enum";
import { ColumnTypeEnum } from "src/app/enums/columns.enum";
import { toSignal } from "@angular/core/rxjs-interop";
import { Store } from "@ngrx/store";
import { ExpiredSelector } from "src/app/store/dashboardStore/ExpiredStore/expired.selector";
import { GET_EXPIRED_START } from "src/app/store/dashboardStore/ExpiredStore/expired.action";
import { MatTableModule } from "@angular/material/table";

@Component({
  selector: "app-expired",
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, TableComponent],
  templateUrl: "./expired.component.html",
  styleUrls: ["./expired.component.scss"],
})
export class ExpiredComponent implements OnInit {
  mockData: IExpired[] = [
    {
      sid: 0,
      cid: 0,
      customerName: "Customer Name",
      plan: "LW-0M-0-00 DAYS",
      customerType: CustomerTypeEnum.Customer,
      phone: "0000 000 000",
    },
  ];
  columns = [
    {
      columnDef: "sid",
      header: "SID",
      cell: (element: IExpired) => `${element?.sid}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "cid",
      header: "CID",
      cell: (element: IExpired) => `${element?.cid}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "customerName",
      header: "Customer Name",
      cell: (element: IExpired) => `${element?.customerName}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "customerType",
      header: "customer Type",
      cell: (element: IExpired) => `${element?.customerType}`,
      display: true,
      type: ColumnTypeEnum.badge,
    },
    {
      columnDef: "plan",
      header: "Plan",
      cell: (element: IExpired) => `${element?.plan}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "phone",
      header: "Phone",
      cell: (element: IExpired) => `${element?.phone}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
  ];
  TABLE_DATA = toSignal(this._Store.select(ExpiredSelector));
  constructor(private _Store: Store) {}

  ngOnInit(): void {
    this.GetData();
  }

  GetData() {
    if (!this.TABLE_DATA()?.data) {
      this._Store.dispatch(GET_EXPIRED_START());
    }
  }
}
