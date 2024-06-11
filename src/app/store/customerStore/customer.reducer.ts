import { createReducer, on } from "@ngrx/store";
import { ICustomerInfo } from "src/app/interfaces/customer.interface";
import { IHttpResponse, IPaginatorResponse, IRequestStatus } from "../appStore";
import * as fromActions from "./customer.action";

export interface IState
  extends IHttpResponse,
    IPaginatorResponse,
    IRequestStatus {
  data: ICustomerInfo[] | null;
}

const initalValue: IState = {
  error: null,
  loading: true,
  data: null,
  messages: [],
  succeeded: false,
  currentPage: 0,
  hasNextPage: false,
  hasPreviousPage: false,
  pageSize: 0,
  totalCount: 0,
  totalPages: 0,
};

let newCustomer:ICustomerInfo = {
  customerName:"",
  birthDate:new Date(),
  email:"",
  customerType:"",
  regType:"",
  status:false,
  height:"",
  weight:"",
  customerAdress:[],
  customerCategory:0,
  customerId:0,
  customerPhon:[],
  id:0,
  phone:"",
  regDate:new Date(),
};

export const Reducer = createReducer(
  initalValue,
  on(fromActions.GET_CUSTOMER_START, (state) => ({
    ...state,
    loading: true,
    error: null,
    succeeded: false,
  })),
  on(fromActions.GET_CUSTOMER_SUCCESS, (state, action) => ({
    ...state,
    error: null,
    loading: false,
    data: action.data.data,
    succeeded: action.data.succeeded,
    currentPage: action.data.currentPage,
    hasNextPage: action.data.hasNextPage,
    hasPreviousPage: action.data.hasPreviousPage,
    pageSize: action.data.pageSize,
    totalCount: action.data.totalCount,
    totalPages: action.data.totalPages,
  })),
  on(fromActions.GET_CUSTOMER_FAILED, (state, action) => ({
    ...state,
    error: action.error,
    data:null,
    loading: false,
    messages: [action.error.message],
    succeeded: false,
  })),
  on(fromActions.DELETE_CUSTOMER_START, (state, action) => {
    const deletedCustomerId = action.customerID;
    const updatedData =
      state?.data?.filter(
        (customer) => customer.id !== deletedCustomerId
      ) || [];
    return {
      ...state,
      data: updatedData,
    };
  }),
  on(fromActions.DELETE_CUSTOMER_SUCCESS, (state, action) => {
    return {
      ...state,
      loading: false,
      messages: action.data?.messages,
      succeeded: action.data?.succeeded,
    };
  }),
  on(fromActions.DELETE_CUSTOMER_FAILED, (state, action) => ({
    ...state,
    error: action.error,
    loading: false,
    messages: [action.error.message],
    succeeded: false,
  })),
  on(fromActions.CREATE_CUSTOMER_START, (state, action) => {
    newCustomer = {
      birthDate:action.data.birthDate,
      email:action.data.email,
      customerType:action.data.customerType.toString(),
      regType:action.data.regType,
      status:action.data.status,
      height:action.data.height,
      weight:action.data.weight,
      customerAdress:action.data.customerAdresses,
      customerCategory:action.data.categoryId,
      customerName:action.data.customerName,
      customerPhon:action.data.customerPhons,
      phone:action.data.customerPhons[0].phone,
      regDate: new Date(),
      customerId:0,
      id:0      
    }
    return {
      ...state,
      succeeded: false,
    };
  }),
  on(fromActions.CREATE_CUSTOMER_SUCCESS, (state, action) => {
    newCustomer.customerId = action.data.data;
    let customer = [...state.data||[]];
    if (action.data.succeeded) {
      customer = [...state.data||[], newCustomer]
    }
    return {
      ...state,
      loading: false,
      messages: action.data?.messages,
      succeeded: action.data?.succeeded,
      data:customer
    };
  }),
  on(fromActions.CREATE_CUSTOMER_FAILED, (state, action) => ({
    ...state,
    error: action.error,
    loading: false,
    data: null,
    messages: [action.error.message],
    succeeded: false,
  }))
);