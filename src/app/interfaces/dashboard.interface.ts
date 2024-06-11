import { IRequestStatus } from "../store/appStore";

// =================================== SUBSCRIPTION COUNT ====================================
export interface ISubCountResponse extends IRequestStatus {
  data: ISubCount[];
}

export interface ISubCount {
  caption: string;
  subCount: number;
}

// =================================== SALES ====================================
export interface ISalesResponse extends IRequestStatus {
  data: ISales[];
}

export interface ISales {
  month: string;
  value: number;
}

// =================================== EXPIRED ====================================
export interface IExpiredResponse extends IRequestStatus {
  data: IExpired[];
}

export interface IExpired {
  sid:          number;
  cid:          number;
  customerName: string;
  plan:         string;
  customerType: string;
  phone:        string;
}

// =================================== Payment ====================================
export interface ILastPaymentResponse extends IRequestStatus {
  data: ILastPayment[];
}

export interface ILastPayment {
  customerName: string;
  sid:          number;
  invoiceType:  string;
  value:        number;
}


// =================================== Activity ====================================
export interface IActivityResponse extends IRequestStatus {
  data: IActivity[];
}

export interface IActivity {
  time:       string;
  action:     string;
  actionType: string;
}
