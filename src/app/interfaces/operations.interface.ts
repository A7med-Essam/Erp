import { IPaginatorResponse, IRequestStatus } from "../store/appStore";
import { IPaginateOptions } from "./paginator.interface";

export interface IOperationsResponse
  extends IPaginatorResponse,
    IRequestStatus {
  data: IOperations[];
}

export interface IOperations {
  id: number;
  subscrbtionId: number;
  customerId: number;
  dayNumber: number;
  driverName: string;
  deliverBranchName: string;
  customerBranchName: string;
  dayName: string;
  dayState: number;
  dayNotes: null;
  customerName: string;
  deliveryDate: Date;
  printDate: Date;
  planExpression: string;
  type: string;
  salesEntry: number;
  inventoryEntry: number;
}

export interface IOperationsRequest extends IPaginateOptions {
  dateFrom?: string | null;
  dateTo?: string | null;
  customerID?: number | null;
  isPrintDate?: boolean;
  subscriptionNumber?: number | null;
}
