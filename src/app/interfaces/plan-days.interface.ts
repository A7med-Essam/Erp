import { IRequestStatus } from "../store/appStore";

export interface IPLAN_DAYS_RESPONSE extends IRequestStatus {
  data: IPLAN_DAYS[];
}

export interface IPLAN_DAYS {
  dayCount: number;
}
