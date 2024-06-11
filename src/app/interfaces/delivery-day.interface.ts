import { IRequestStatus } from "../store/appStore";

export interface IDELIVERY_DAY_RESPONSE extends IRequestStatus {
  data: IDELIVERY_DAY[];
}

export interface IDELIVERY_DAY {
  day_id: number;
  day_name: string;
  show: boolean;
}
