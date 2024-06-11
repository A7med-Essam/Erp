import { HttpErrorResponse } from "@angular/common/http";
import { ActionReducerMap } from "@ngrx/store";

// effects
import { SubscriptionByPhoneEffect } from "./subscriptionByPhoneStore/subscriptionByPhone.effect";
import { SubscriptionBySidEffect } from "./subscriptionBySidStore/subscriptionBySid.effect";
import { FullSubscriptionEffect } from "./fullSubscriptionStore/fullSubscription.effect";
import { CustomerCategoryEffect } from "./customerCategoryStore/customerCategory.effect";
import { DeliveryNoteLogEffect } from "./deliveryNoteLogStore/deliveryNoteLog.effect";
import { CustomerAddressEffect } from "./customerAddressStore/customerAddress.effect";
import { LastPaymentEffect } from "./dashboardStore/PaymentStore/lastPayment.effect";
import { ActivityEffect } from "./dashboardStore/ActivityStore/activity.effect";
import { SubCountEffect } from "./dashboardStore/SubCountStore/subCount.effect";
import { PlanCategoryEffect } from "./planCategoryStore/plan-category.effect";
import { SubscriptionEffect } from "./subscriptionStore/subscription.effect";
import { BranchDriverEffect } from "./branchDriverStore/branchDriver.effect";
import { ExpiredEffect } from "./dashboardStore/ExpiredStore/expired.effect";
import { AllPlanDaysEffect } from "./allPlanDaysStore/all-PlanDays.effect";
import { AllMealTypeEffect } from "./allMealTypeStore/all-MealType.effect";
import { PaymentTypeEffect } from "./paymentTypeStore/paymentType.effect";
import { DeliveryDayEffect } from "./deliveryDayStore/deliveryDay.effect";
import { CustomerLogEffect } from "./customerLogStore/customerLog.effect";
import { DeliveryLogEffect } from "./deliveryLogStore/deliveryLog.effect";
import { GovernorateEffect } from "./governorateStore/governorate.effect";
import { PermissionEffect } from "./permissionStore/permission.effect";
import { InvoiceLogEffect } from "./InvoiceLogStore/InvoiceLog.effect";
import { SalesEffect } from "./dashboardStore/SalesStore/sales.effect";
import { DislikeItemEffect } from "./dislikeStore/dislike-item.effect";
import { DislikeLogEffect } from "./dislikeLogStore/dislikeLog.effect";
import { RetentionEffect } from "./retentionStore/retention.effect";
import { OperationEffect } from "./operationStore/operation.effect";
import { MealItemEffect } from "./mealItemStore/mealItem.effect";
import { CustomerEffect } from "./customerStore/customer.effect";
import { MealTypeEffect } from "./mealTypeStore/mealType.effect";
import { AllAreaEffect } from "./allAreaStore/all-area.effect";
import { AllPlanEffect } from "./allPlanStore/all-plan.effect";
import { PlanDayEffect } from "./planDayStore/planDay.effect";
import { InvoiceEffect } from "./invoiceStore/invoice.effect";
import { DislikeEffect } from "./dislikeStore/dislike.effect";
import { BranchEffect } from "./branchStore/branch.effect";
import { DriverEffect } from "./driverStore/driver.effect";
import { MealsEffect } from "./mealsStore/meals.effect";
import { AuthEffect } from "./authStore/auth.effect";
import { PlanEffect } from "./planStore/plan.effect";
import { AreaEffect } from "./areaStore/area.effect";
import { UserEffect } from "./userStore/user.effect";
import { RoleEffect } from "./roleStore/role.effect";
import { CityEffect } from "./cityStore/city.effect";
import { LogEffect } from "./logStore/log.effect";

// reducers
import * as fromSubscriptionByPhoneStore from "./subscriptionByPhoneStore/subscriptionByPhone.reducer";
import * as fromSubscriptionBySidStore from "./subscriptionBySidStore/subscriptionBySid.reducer";
import * as fromDashboardPaymentStore from "./dashboardStore/PaymentStore/lastPayment.reducer";
import * as fromCustomerCategoryStore from "./customerCategoryStore/customerCategory.reducer";
import * as fromFullSubscriptionStore from "./fullSubscriptionStore/fullSubscription.reducer";
import * as fromDashboardSubCountStore from "./dashboardStore/SubCountStore/subCount.reducer";
import * as fromDashboardActivityStore from "./dashboardStore/ActivityStore/activity.reducer";
import * as fromCustomerAddressActions from "./customerAddressStore/customerAddress.reducer";
import * as fromDashboardExpiredStore from "./dashboardStore/ExpiredStore/expired.reducer";
import * as fromDeliveryNoteLogStore from "./deliveryNoteLogStore/deliveryNoteLog.reducer";
import * as fromDashboardSalesStore from "./dashboardStore/SalesStore/sales.reducer";
import * as fromPlanCategoryStore from "./planCategoryStore/plan-category.reducer";
import * as fromSubscriptionStore from "./subscriptionStore/subscription.reducer";
import * as frombranchDriverStore from "./branchDriverStore/branchDriver.reducer";
import * as fromAllMealTypeStore from "./allMealTypeStore/all-MealType.reducer";
import * as fromCustomerLogStores from "./customerLogStore/customerLog.reducer";
import * as fromPaymentTypeStore from "./paymentTypeStore/paymentType.reducer";
import * as fromDeliveryDayStore from "./deliveryDayStore/deliveryDay.reducer";
import * as fromGovernorateStore from "./governorateStore/governorate.reducer";
import * as fromAllPlanDayStore from "./allPlanDaysStore/all-PlanDays.reducer";
import * as fromDislikeItemStore from "./dislikeStore/dislike-item.reducer";
import * as fromInvoiceLogStore from "./InvoiceLogStore/InvoiceLog.reducer";
import * as fromPermissionStore from "./permissionStore/permission.reducer";
import * as fromDislikeLogStore from "./dislikeLogStore/dislikeLog.reducer";
import * as fromDeliveryLog from "./deliveryLogStore/deliveryLog.reducer";
import * as fromRetentionStore from "./retentionStore/retention.reducer";
import * as fromOperationStore from "./operationStore/operation.reducer";
import * as fromCustomerStore from "./customerStore/customer.reducer";
import * as fromMealTypeStore from "./mealTypeStore/mealType.reducer";
import * as fromMealItemStore from "./mealItemStore/mealItem.reducer";
import * as fromAllAreaStore from "./allAreaStore/all-area.reducer";
import * as fromAllPlanStore from "./allPlanStore/all-plan.reducer";
import * as fromPlanDayStore from "./planDayStore/planDay.reducer";
import * as fromInvoiceStore from "./invoiceStore/invoice.reducer";
import * as fromDislikeStore from "./dislikeStore/dislike.reducer";
import * as fromBranchStore from "./branchStore/branch.reducer";
import * as fromDriverStore from "./driverStore/driver.reducer";
import * as fromMealStore from "./mealsStore/meals.reducer";
import * as fromAuthStore from "./authStore/auth.reducer";
import * as fromAreaStore from "./areaStore/area.reducer";
import * as fromPlanStore from "./planStore/plan.reducer";
import * as fromUserStore from "./userStore/user.reducer";
import * as fromRoleStore from "./roleStore/role.reducer";
import * as fromCityStore from "./cityStore/city.reducer";
import * as fromLogStore from "./logStore/log.reducer";

export interface AppState {
  login: fromAuthStore.IState;
  GetAllCustomers: fromCustomerStore.IState;
  GetAllSubscriptions: fromSubscriptionStore.IState;
  GetFullDataByPhone: fromFullSubscriptionStore.IState;
  GetSubscriptionsByPhone: fromSubscriptionByPhoneStore.IState;
  GetSubscriptionsBySID: fromSubscriptionBySidStore.IState;
  GetAreas: fromAreaStore.IState;
  GetCustomersCategory: fromCustomerCategoryStore.IState;
  GetPlansCategory: fromPlanCategoryStore.IState;
  GetPlans: fromPlanStore.IState;
  GetMealsTypes: fromMealTypeStore.IState;
  GetAllBranchies: fromBranchStore.IState;
  GetDeliveryDays: fromDeliveryDayStore.IState;
  GetDislikeCategory: fromDislikeStore.IState;
  GeneratePlan: fromPlanStore.IGENERATE_PLAN_STATE;
  GetcustomerAdress: fromCustomerAddressActions.IState;
  GetBranchiesDrivers: frombranchDriverStore.IState;
  GetPaymentType: fromPaymentTypeStore.IState;
  GetPlanDays: fromPlanDayStore.IState;
  GetCustomerLog: fromCustomerLogStores.IState;
  GetDeliveryLog: fromDeliveryLog.IState;
  GetSubscriptionInvoices: fromInvoiceLogStore.IState;
  GetMealsByMealType: fromMealStore.IState;
  GetAllInvoice: fromInvoiceStore.IState;
  GetItems: fromMealItemStore.IState;
  CustomersRetintion: fromRetentionStore.IState;
  GetAllLogs: fromLogStore.IState;
  GetOperations: fromOperationStore.IState;
  GetLastPayment: fromDashboardPaymentStore.IState;
  GetSubCounts: fromDashboardSubCountStore.IState;
  GetLastActivity: fromDashboardActivityStore.IState;
  GetExpiredToday: fromDashboardExpiredStore.IState;
  GetSales: fromDashboardSalesStore.IState;
  GetdeilveryNotes: fromDeliveryNoteLogStore.IState;
  user: fromUserStore.IState;
  role: fromRoleStore.IState;
  roleClaim: fromPermissionStore.IState;
  GetDislikeItem: fromDislikeItemStore.IState;
  GetDislikeMeal: fromDislikeLogStore.IState;
  GetALlAreas: fromAllAreaStore.IState;
  GetAllDrivers: fromDriverStore.IState;
  GetALlCities: fromCityStore.IState;
  GetALLGovernorates: fromGovernorateStore.IState;
  GetAllPlans: fromAllPlanStore.IState;
  GetAllPlanDays: fromAllPlanDayStore.IState;
  GetAllMealsType: fromAllMealTypeStore.IState;
}

export const APP_STORE: ActionReducerMap<AppState> = {
  login: fromAuthStore.Reducer,
  GetAllCustomers: fromCustomerStore.Reducer,
  GetAllSubscriptions: fromSubscriptionStore.Reducer,
  GetFullDataByPhone: fromFullSubscriptionStore.Reducer,
  GetSubscriptionsByPhone: fromSubscriptionByPhoneStore.Reducer,
  GetSubscriptionsBySID: fromSubscriptionBySidStore.Reducer,
  GetAreas: fromAreaStore.Reducer,
  GetCustomersCategory: fromCustomerCategoryStore.Reducer,
  GetPlansCategory: fromPlanCategoryStore.Reducer,
  GetPlans: fromPlanStore.getPlanReducer,
  GetMealsTypes: fromMealTypeStore.Reducer,
  GetAllBranchies: fromBranchStore.Reducer,
  GetDeliveryDays: fromDeliveryDayStore.Reducer,
  GetDislikeCategory: fromDislikeStore.Reducer,
  GeneratePlan: fromPlanStore.generatePlanReducer,
  GetcustomerAdress: fromCustomerAddressActions.Reducer,
  GetBranchiesDrivers: frombranchDriverStore.Reducer,
  GetPaymentType: fromPaymentTypeStore.Reducer,
  GetPlanDays: fromPlanDayStore.Reducer,
  GetCustomerLog: fromCustomerLogStores.Reducer,
  GetDeliveryLog: fromDeliveryLog.Reducer,
  GetSubscriptionInvoices: fromInvoiceLogStore.Reducer,
  GetMealsByMealType: fromMealStore.Reducer,
  GetAllInvoice: fromInvoiceStore.Reducer,
  GetItems: fromMealItemStore.Reducer,
  CustomersRetintion: fromRetentionStore.Reducer,
  GetAllLogs: fromLogStore.Reducer,
  GetOperations: fromOperationStore.Reducer,
  GetLastPayment: fromDashboardPaymentStore.Reducer,
  GetSubCounts: fromDashboardSubCountStore.Reducer,
  GetLastActivity: fromDashboardActivityStore.Reducer,
  GetExpiredToday: fromDashboardExpiredStore.Reducer,
  GetSales: fromDashboardSalesStore.Reducer,
  GetdeilveryNotes: fromDeliveryNoteLogStore.Reducer,
  user: fromUserStore.Reducer,
  role: fromRoleStore.Reducer,
  roleClaim: fromPermissionStore.Reducer,
  GetDislikeItem: fromDislikeItemStore.Reducer,
  GetDislikeMeal: fromDislikeLogStore.Reducer,
  GetALlAreas: fromAllAreaStore.Reducer,
  GetAllDrivers: fromDriverStore.Reducer,
  GetALlCities: fromCityStore.Reducer,
  GetALLGovernorates: fromGovernorateStore.Reducer,
  GetAllPlans: fromAllPlanStore.Reducer,
  GetAllPlanDays: fromAllPlanDayStore.Reducer,
  GetAllMealsType: fromAllMealTypeStore.Reducer,
};

export const APP_EFFECTS = [
  AuthEffect,
  CustomerEffect,
  SubscriptionEffect,
  FullSubscriptionEffect,
  SubscriptionBySidEffect,
  SubscriptionByPhoneEffect,
  AreaEffect,
  CustomerCategoryEffect,
  PlanCategoryEffect,
  PlanEffect,
  MealTypeEffect,
  BranchEffect,
  DeliveryDayEffect,
  DislikeEffect,
  CustomerAddressEffect,
  BranchDriverEffect,
  PaymentTypeEffect,
  PlanDayEffect,
  CustomerLogEffect,
  DeliveryLogEffect,
  InvoiceLogEffect,
  MealsEffect,
  InvoiceEffect,
  MealItemEffect,
  RetentionEffect,
  LogEffect,
  OperationEffect,
  ActivityEffect,
  SubCountEffect,
  ExpiredEffect,
  LastPaymentEffect,
  SalesEffect,
  DeliveryNoteLogEffect,
  UserEffect,
  RoleEffect,
  PermissionEffect,
  DislikeItemEffect,
  DislikeLogEffect,
  AllAreaEffect,
  DriverEffect,
  CityEffect,
  GovernorateEffect,
  AllPlanEffect,
  AllPlanDaysEffect,
  AllMealTypeEffect,
];

export interface IHttpResponse {
  loading: boolean;
  error: HttpErrorResponse | null;
}

export interface IPaginatorResponse {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface IRequestStatus {
  succeeded: boolean;
  messages: string[];
}

export interface ICreateResponse extends IRequestStatus {
  data: number;
}

export interface IExportResponse extends IRequestStatus {
  data: string;
}

export interface IExportRequest {
  from: string;
  to: string;
  body: string[];
}
