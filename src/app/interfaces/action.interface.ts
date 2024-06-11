import { IRequestStatus } from "../store/appStore";
import { ICustomerPhone } from "./customer.interface";
import { IDELIVERY_DAY } from "./delivery-day.interface";
import { IDISLIKE } from "./dislike.interface";

export interface IHoldAction {
  SID: number;
  StartHoldDate: string;
  Notes: string;
}

export interface IActiveAction {
  SID: number;
  StartDate: string;
  Notes: string;
}

export interface IChangeStartDate {
  SID: number;
  statrdate: string;
  Notes: string;
}

export interface IRestrictAction {
  SID: number;
  datefrom: string;
  dateto: string;
  Notes: string;
}

export interface IUnrestrictAction {
  sid: number;
  dates: string[];
}

export interface IExtendAction {
  SID: number;
  DaysCount: number;
  Notes: string;
}

export interface IChangeMealTypeAction {
  SID: number;
  Notes: string;
  mealsType: MealTypeAction[];
}

export interface MealTypeAction {
  mealTypeCategoryID: number;
  mealTypeCategoryName: string;
  mealTypeID: number;
  mealTypeName: string;
}

export interface IChangeDeliveryDaysAction {
  SID: number;
  Notes: string;
  deliveryDays: IDELIVERY_DAY[];
}

export interface IDetachAction {
  SID: number;
  Notes: string;
  dates: string[];
}

export interface IChangeDeliveryDetailsAction {
  SID: number;
  Notes: string;
  BranchID: string;
  DriverID: string;
  AdressID: string;
  dates: string[];
}

export interface IChangeStatusAction {
  SID: number;
  Status: number;
  dates: string[];
}
export interface IDislikeAction {
  SID: number;
  Mealid: number;
  OppsitMealID: number;
  Notes: string;
}
export interface IReplaceMealsAction {
  DayLineID: number;
  MealID: number;
}

// ======================= Change Name ========================
export interface IChangeNameAction {
  customerId: number;
  SID: number;
  customerName: string;
}

// ======================= Change Branch - Driver ========================
export interface IChangeBranchDriverAction {
  branchID: number;
  driverID: number;
  SID: number;
}

// ======================= Change Phones ========================
export interface IChangePhoneAction {
  customerPhons: ICustomerPhone[];
}

// ======================= Change Notes ========================
export interface IChangeNotesAction {
  sid: number;
  Notes: string;
}

// ======================= Change Delivery Notes ========================
export interface IChangeDeliveryNotesAction {
  sid: number;
  Notes: string;
  dates: string[];
}

// ======================= Update Nutrition ========================
export interface IUpdateNutritionAction {
  sid: number;
  carb: number;
  protin: number;
}

// ======================= Merge Days ========================

export interface IMergeAction {
  Notes: string;
  days: MergeDays[];
}

interface MergeDays {
  id: number;
  dayName: string;
  deliveryDate: string;
}
// ======================= AutoDislikeAction ========================

export interface IAutoDislikeAction {
  SID: number;
  dislike: IDISLIKE[];
}

export interface IApplyAutoDislikeAction {
  mealsToSave:     IDislikeMeals[];
  dislikeCategory: IDISLIKE[];
  sid:             number;
}

export interface IDislikeMeals {
  id:     number;
  mealID: number;
}

// ======================= Export Plan Action ========================

export interface ExportPlanResponse extends IRequestStatus {
  data:      IPlanDetails;
}

export interface IPlanDetails {
  sid:              number;
  name:             string;
  adress:           string;
  email:            string;
  phone:            string;
  plan:             string;
  status:           string;
  remaingDays:      number;
  deliveryBranch:   string;
  startDate:        string;
  lastDeliveryDate: string;
  details:          IMealDetails[];
}

export interface IMealDetails {
  deliveryDay:     string;
  dayName:         string;
  mealType:        string;
  meal:            string;
  mealsNutrations: MealsNutrations;
}

export interface MealsNutrations {
  mealID:   number;
  calories: number;
  protein:  number;
  fats:     number;
  carb:     number;
}