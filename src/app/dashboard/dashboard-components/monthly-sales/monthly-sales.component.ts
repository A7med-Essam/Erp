import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatDividerModule } from "@angular/material/divider";
import { FeatherModule } from "angular-feather";
import { MatCardModule } from "@angular/material/card";
import { toSignal } from "@angular/core/rxjs-interop";
import { Store } from "@ngrx/store";
import { SalesSelector } from "src/app/store/dashboardStore/SalesStore/sales.selector";
import { GET_SALES_START } from "src/app/store/dashboardStore/SalesStore/sales.action";

@Component({
  selector: "app-monthly-sales",
  standalone: true,
  imports: [CommonModule, MatDividerModule, FeatherModule, MatCardModule],
  templateUrl: "./monthly-sales.component.html",
  styleUrls: ["./monthly-sales.component.scss"],
})
export class MonthlySalesComponent implements OnInit {
  constructor(private _Store: Store) {}
  ngOnInit(): void {
    this.getSales();
  }
  sales = toSignal(this._Store.select(SalesSelector));

  getSales() {
    if (!this.sales()?.data) {
      this._Store.dispatch(GET_SALES_START());
    }
  }

  mockData = [
    {
      month: "2024/January",
      value: 362290.9,
    },
    {
      month: "2024/February",
      value: 335689.33,
    },
    {
      month: "2024/March",
      value: 243426.71,
    },
    {
      month: "2024/April",
      value: 27018.14,
    },
    {
      month: "2024/May",
      value: 26234.03,
    }
  ];
}
