import { IRequestStatus } from "../store/appStore";
import { IDriver } from "./subscription.interface";

export interface IBRANCH_RESPONSE extends IRequestStatus {
  data: IBRANCH[];
}

export interface IBRANCH {
  branchID: number;
  branchName: string;
}

export interface IBRANCH_DRIVER_RESPONSE extends IRequestStatus {
  data: IBRANCH_DRIVER[];
}

export interface IBRANCH_DRIVER {
  branchID: number;
  branchName: string;
  drivers: IDriver[];
}
