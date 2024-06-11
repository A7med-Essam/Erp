import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import { Store } from "@ngrx/store";
import { ColumnTypeEnum } from "src/app/enums/columns.enum";
import { InvoiceTypeEnum } from "src/app/enums/invoice.enum";
import { ILastPayment } from "src/app/interfaces/dashboard.interface";
import { IActions, TableComponent } from "src/app/pages/table/table.component";
import { GET_LAST_PAYMENT_START } from "src/app/store/dashboardStore/PaymentStore/lastPayment.action";
import { LastPaymentSelector } from "src/app/store/dashboardStore/PaymentStore/lastPayment.selector";

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.scss"],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, TableComponent],
})
export class PaymentComponent implements OnInit {
  columns = [
    {
      columnDef: "sid",
      header: "SID",
      cell: (element: ILastPayment) => `${element?.sid}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "customerName",
      header: "Customer Name",
      cell: (element: ILastPayment) => `${element?.customerName}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "invoiceType",
      header: "Invoice Type",
      cell: (element: ILastPayment) => `${element?.invoiceType}`,
      display: true,
      type: ColumnTypeEnum.badge,
    },
    {
      columnDef: "value",
      header: "Amount",
      cell: (element: ILastPayment) => `${element?.value}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
  ];
  TABLE_DATA = toSignal(this._Store.select(LastPaymentSelector));
  constructor(private _Store: Store) {}

  ngOnInit(): void {
    this.GetData();
  }

  GetData() {
    if (!this.TABLE_DATA()?.data) {
      this._Store.dispatch(GET_LAST_PAYMENT_START());
    }
  }
}
