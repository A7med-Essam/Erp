import { IRequestStatus } from "../store/appStore";

export interface IPLAN_CATEGORY_RESPONSE extends IRequestStatus {
  data: IPLAN_CATEGORY[];
}

export interface IPLAN_CATEGORY {
  planID: number;
  planName: string;
}
