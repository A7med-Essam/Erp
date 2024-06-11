import { IRequestStatus } from "../store/appStore";

export interface IAreaResponse extends IRequestStatus {
  data: IArea[];
}

export interface IArea {
  id: number;
  areaName: string;
  branchId: number;
  branchName: string;
  Adress: string;
}
