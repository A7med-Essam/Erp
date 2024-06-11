import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatDividerModule } from "@angular/material/divider";
import { FeatherModule } from "angular-feather";
import { MatCardModule } from "@angular/material/card";
import { toSignal } from "@angular/core/rxjs-interop";
import { SubCountSelector } from "src/app/store/dashboardStore/SubCountStore/subCount.selector";
import { Store } from "@ngrx/store";
import { GET_SUBSCRIPTION_COUNT_START } from "src/app/store/dashboardStore/SubCountStore/subCount.action";
import { SubCountEnum } from "src/app/enums/dashboard.enum";

@Component({
  selector: "app-sub-count",
  standalone: true,
  imports: [CommonModule, MatDividerModule, FeatherModule, MatCardModule],
  templateUrl: "./sub-count.component.html",
  styleUrls: ["./sub-count.component.scss"],
})
export class SubCountComponent implements OnInit {
  constructor(private _Store: Store) {}
  ngOnInit(): void {
    this.getSubCount();
  }
  subCount = toSignal(this._Store.select(SubCountSelector));

  getSubCount() {
    if (!this.subCount()?.data) {
      this._Store.dispatch(GET_SUBSCRIPTION_COUNT_START());
    }
  }

  mockData = [
    {
      caption: "All Subscription",
      subCount: 0,
    },
    {
      caption: "active Subscription",
      subCount: 0,
    },
    {
      caption: "Hold Subscription",
      subCount: 0,
    },
    {
      caption: "Expired Subscription",
      subCount: 0,
    },
  ];

  getColor(status: string) {
    switch (status) {
      case SubCountEnum.active:
        return "success";
      case SubCountEnum.hold:
        return "warning";
      case SubCountEnum.expired:
        return "error";
      default:
        return "accent";
    }
  }
}
