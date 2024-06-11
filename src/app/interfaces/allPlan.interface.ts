import { IRequestStatus } from "../store/appStore";

export interface IFullPlanResponse extends IRequestStatus{
    data:      IFullPlan[];
}

export interface IFullPlan {
    id:             number;
    planId:         number;
    daysCount:      number;
    startDate:      Date;
    categoryID:     number;
    startDay:       number;
    isActive:       boolean;
    planName:       string;
    defaultSticker: string;
    planExprission: string;
    planCategory:   string;
    planLines:      PlanLine[];
    planPrice:      PlanPrice[];
    mealsTypes:     IFullMealType[];
    planDays:       IFullPlanDays[];
}

export interface PlanLine {
    id:           number;
    days:         number;
    daysNames:    string;
    mealName:     string;
    mealId:       number;
    typeName:     string;
    typeId:       number;
    mealCost:     number;
    mealPrice:    number;
    hdrId:        number;
    mealCategory: number;
}


export interface PlanPrice {
    id:                number;
    mealCatgeroyID:    number;
    planDayID:         number;
    categoryDaysCount: number;
    mealType:          number;
    amount:            number;
    categoryName:      string;
    typeName:          string;
    dayName:           string;
}

export interface ITransformedPlanPrice {
    dayName: string;
    [mealType: string]: string;
  }
// ============== Meals Types ==============

export interface IFullMealTypeResponse extends IRequestStatus{
    data:      IFullMealType[];
}

export interface IFullMealType {
    mealCategoryID:   number;
    mealCategoryName: string;
    typeID:           number;
    typeName:         string;
}

// ============== Meals Types ==============

export interface IFullPlanDaysResponse extends IRequestStatus{
    data:      IFullPlanDays[];
}

export interface IFullPlanDays {
    id:           number;
    name:         string;
    day_count:    number;
    companyID:    number;
    tb_PlanPrice: any[];
}

// ============== Create Plan ==============

export interface ICreatePlanResponse extends IRequestStatus{
    data:      ICreatePlan;
}

export interface ICreatePlan {
    planLines: PlanLine[];
    planPrice: PlanPrice[];
}

export interface IGeneratePlanRequest {
    planName:  string;
    category:  Category;
    mealsType: IFullMealType[];
    planDays:  IFullPlanDays[];
    planPrice: any[];
    lines:     any[];
    startDate: Date;
    daysCount: number;
}

interface Category {
    planID:   number;
    planName: string;
}

export interface IAddPlanRequest {
    id:             number;
    planId:         number;
    daysCount:      number;
    startDay:       number;
    startDate:      Date;
    isActive:       boolean;
    planName:       string;
    defaultSticker: string;
    planExprission: string;
    planCategory:   number;
    planLines:      PlanLine[];
    planPrice:      PlanPrice[];
}