import { IPaginatorResponse, IRequestStatus } from "../store/appStore";
import { IPaginateOptions } from "./paginator.interface";


// ======================================================= Customer Log =======================================================

export interface ICustomerLogResponse extends IRequestStatus {
    data:      ICustomerLog[];
}

export interface ICustomerLog {
    id:          number;
    sid:          number;
    date:         string;
    action:       string;
    notes:        string;
    user:         string;
    actionstypes: string;
    deliveryDate: string;
    remaingDays:  number;
}
// ======================================================= Delivery Log =======================================================

export interface IDeliveryLogResponse extends IRequestStatus {
    data:      IDeliveryLog[];
}

export interface IDeliveryLog {
    deliveryDate:       string;
    printDate:          string;
    dayID:              number;
    dayNumber:          number;
    planExpression:     string;
    deliveryAdress:     string;
    driverName:         string;
    deliverBranchName:  string;
    customerBranch:     string;
    customerBranchName: string;
    dayName:            string;
    dayState:           string;
    dayNotes:           string;
    customerNote:       string;
    deliveryNote:       string;
    meals:              string;
}

// ======================================================= Invoice Log =======================================================

export interface InvoiceLogResponse extends IRequestStatus {
    data:      InvoiceLog[];
}

export interface InvoiceLog {
    sid:           number;
    payDate:       string;
    invoiceNumber: number;
    serial:        string;
    branch:        string;
    user:          string;
    total:         number;
    tax:           number;
    discount:      number;
    net:           number;
    bagValue:      number;
    payStatus:     string;
    invoiceType:   string;
    year:          number;
}

// ======================================================= All Logs =======================================================

export interface IAllLogsRequest extends IPaginateOptions {
    from?: string;
    to?: string;
}

export interface ILogsResponse extends IPaginatorResponse,IRequestStatus {
    data: ILogs[];
}

export interface ILogs {
    id:          number;
    sid:          number;
    date:         Date;
    action:       string;
    notes:        string;
    user:         string;
    customer: string;
    actionstypes: string;
    deliveryDate: Date;
    remaingDays:  number;
}

// ======================================================= Delvery Note Log =======================================================

export interface IDeliveryNoteLogResponse extends IRequestStatus {
    data:      IDeliveryNoteLog[];
}

export interface IDeliveryNoteLog {
    dayID:         number;
    deliveryDate:  string;
    dayName:       string;
    adress:        string;
    driver:        string;
    branch:        string;
    deliveryNotes: string;
    status:        string;
}

// ======================================================= Delvery Note Log =======================================================
export interface IDislikeLogResponse extends IRequestStatus {
    data:      IDislikeLog[];
}

export interface IDislikeLog {
    id:              number;
    mealID:          number;
    mealName:        string;
    oppsiteMealID:   number;
    oppsiteMealName: string;
    notes:           string;
}