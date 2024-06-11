import { Component, OnInit } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { Store } from "@ngrx/store";
import { GET_ACTIVITY_START } from "src/app/store/dashboardStore/ActivityStore/activity.action";
import { ActivitySelector } from "src/app/store/dashboardStore/ActivityStore/activity.selector";

interface activity {
  time: string;
  actionType: string;
  action: string;
}

@Component({
  selector: "app-activity",
  templateUrl: "./activity.component.html",
})
export class ActivityComponent implements OnInit {
  activity: activity[] = [
    {
      time: "17:51",
      action:
        "Change Start Date Start From Date 04/06/2024 00:00:00with remaing days  1",
      actionType: "ring-success",
    },
    {
      time: "17:51",
      action:
        "change Delivery Days from Sunday  to Saturday with remaing days  1",
      actionType: "ring-success",
    },
    {
      time: "17:50",
      action:
        "Active Subscription in date 04/06/2024 00:00:00 with remaing days  1",
      actionType: "ring-success",
    },
    {
      time: "17:50",
      action:
        "Hold Subscriptions In Date04/06/2024 00:00:00 |with remaing Days 1 ",
      actionType: "ring-success",
    },
  ];

  constructor(private _Store: Store) {}
  ngOnInit(): void {
    this.getActivity();
  }
  Activity = toSignal(this._Store.select(ActivitySelector));

  getActivity() {
    if (!this.Activity()?.data) {
      this._Store.dispatch(GET_ACTIVITY_START());
    }
  }
}
