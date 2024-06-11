import { Injectable } from "@angular/core";
import { ApiConfigService } from "../core/api-config.service";
import { Observable } from "rxjs";
import { HttpParams } from "@angular/common/http";
import {
  IHoldAction,
  IActiveAction,
  IChangeStartDate,
  IRestrictAction,
  IExtendAction,
  IChangeMealTypeAction,
  IChangeDeliveryDaysAction,
  IDetachAction,
  IChangeDeliveryDetailsAction,
  IChangeStatusAction,
  IReplaceMealsAction,
  IChangeBranchDriverAction,
  IChangeNameAction,
  IChangePhoneAction,
  IChangeNotesAction,
  IChangeDeliveryNotesAction,
  IUpdateNutritionAction,
  IUnrestrictAction,
  IDislikeAction,
  IMergeAction,
  IAutoDislikeAction,
  IApplyAutoDislikeAction,
  ExportPlanResponse,
} from "../interfaces/action.interface";
import {
  ICreateCustomMealRequest,
  IGetMealItemAction,
  IGetMealsAction,
  IGetMealsResponse,
  IMealDetailsResponse,
  IMealItemResponse,
  IMigration,
  IRenew,
} from "../interfaces/meals.interface";
import { ICreateResponse, IRequestStatus } from "../store/appStore";
import {
  ICustomerAddressDetails,
  ICustomerPhone,
  ICustomerPhoneResponse,
  IUpdateCustomerAddressRequest,
} from "../interfaces/customer.interface";
import { IAutoDislikeResponse } from "../interfaces/dislike.interface";

@Injectable({
  providedIn: "root",
})
export class ActionsService {
  constructor(private _ApiConfigService: ApiConfigService) {}

  Hold(request: IHoldAction): Observable<IRequestStatus> {
    let params = new HttpParams()
      .set("SID", request.SID)
      .set("StartHoldDate", request.StartHoldDate)
      .set("Notes", request.Notes);
    return this._ApiConfigService.postReq(`v1/Actions/Hold`, "", params);
  }

  Active(request: IActiveAction): Observable<IRequestStatus> {
    let params = new HttpParams()
      .set("SID", request.SID)
      .set("StartDate", request.StartDate)
      .set("Notes", request.Notes);
    return this._ApiConfigService.postReq(`v1/Actions/Active`, "", params);
  }

  ChangeStartDate(request: IChangeStartDate): Observable<IRequestStatus> {
    let params = new HttpParams()
      .set("SID", request.SID)
      .set("statrdate", request.statrdate)
      .set("Notes", request.Notes);
    return this._ApiConfigService.postReq(
      `v1/Actions/ChangeStartDate`,
      "",
      params
    );
  }

  Restrict(request: IRestrictAction): Observable<IRequestStatus> {
    let params = new HttpParams()
      .set("SID", request.SID)
      .set("datefrom", request.datefrom)
      .set("dateto", request.dateto)
      .set("Notes", request.Notes);
    return this._ApiConfigService.postReq(`v1/Actions/Restrict`, "", params);
  }

  Unrestrict(request: IUnrestrictAction): Observable<IRequestStatus> {
    let params = new HttpParams().set("sid", request.sid);
    return this._ApiConfigService.postReq(
      `v1/Actions/Unrestrict`,
      request.dates,
      params
    );
  }

  Extend(request: IExtendAction): Observable<IRequestStatus> {
    let params = new HttpParams()
      .set("SID", request.SID)
      .set("DaysCount", request.DaysCount)
      .set("Notes", request.Notes);
    return this._ApiConfigService.postReq(`v1/Actions/Extend`, "", params);
  }

  ChangeMealTypes(request: IChangeMealTypeAction): Observable<IRequestStatus> {
    let params = new HttpParams()
      .set("SID", request.SID)
      .set("Notes", request.Notes);
    return this._ApiConfigService.postReq(
      `v1/Actions/ChangeMealTypes`,
      request.mealsType,
      params
    );
  }

  ChangeDeliveryDays(
    request: IChangeDeliveryDaysAction
  ): Observable<IRequestStatus> {
    let params = new HttpParams()
      .set("SID", request.SID)
      .set("Notes", request.Notes);
    return this._ApiConfigService.postReq(
      `v1/Actions/ChangeDeliveryDays`,
      request.deliveryDays,
      params
    );
  }

  Detach(request: IDetachAction): Observable<IRequestStatus> {
    let params = new HttpParams()
      .set("SID", request.SID)
      .set("Notes", request.Notes);
    return this._ApiConfigService.postReq(
      `v1/Actions/Detact`,
      request.dates,
      params
    );
  }

  Delete(request: IDetachAction): Observable<IRequestStatus> {
    let params = new HttpParams()
      .set("SID", request.SID)
      .set("Notes", request.Notes);
    return this._ApiConfigService.postReq(
      `v1/Actions/DeletePlanDays`,
      request.dates,
      params
    );
  }

  ChangeDeliveryDetails(
    request: IChangeDeliveryDetailsAction
  ): Observable<IRequestStatus> {
    let params = new HttpParams()
      .set("SID", request.SID)
      .set("Notes", request.Notes)
      .set("BranchID", request.BranchID)
      .set("DriverID", request.DriverID)
      .set("AdressID", request.AdressID);
    return this._ApiConfigService.postReq(
      `v1/Actions/ChangeDeliveryDetails`,
      request.dates,
      params
    );
  }

  ChangeStatus(request: IChangeStatusAction): Observable<IRequestStatus> {
    let params = new HttpParams()
      .set("SID", request.SID)
      .set("Status", request.Status);
    return this._ApiConfigService.postReq(
      `v1/Actions/changeDaysStatus`,
      request.dates,
      params
    );
  }

  AutoDislikeMeals(request: IDislikeAction): Observable<IRequestStatus> {
    let params = new HttpParams()
      .set("SID", request.SID)
      .set("Mealid", request.Mealid)
      .set("OppsitMealID", request.OppsitMealID)
      .set("Notes", request.Notes);
    return this._ApiConfigService.postReq(
      `v1/Actions/AutoDislikeMeals`,
      "",
      params
    );
  }

  ReplaceMeal(request: IReplaceMealsAction): Observable<IRequestStatus> {
    let params = new HttpParams()
      .set("DayLineID", request.DayLineID)
      .set("MealID", request.MealID);
    return this._ApiConfigService.postReq(`v1/Actions/ReplaceMeal`, "", params);
  }

  GetMealsByMealType(request: IGetMealsAction): Observable<IGetMealsResponse> {
    let params = new HttpParams()
      .set("MealTypeID", request.MealTypeID)
      .set("pagenumber", request.pagenumber)
      .set("pagesize", request.pagesize)
      .set("mealname", request.mealname || "");
    return this._ApiConfigService.getReq(
      `v1/Actions/GetMealsByMealType`,
      params
    );
  }

  Migration(request: IMigration): Observable<IRequestStatus> {
    return this._ApiConfigService.postReq(`v1/Actions/Migration`, request);
  }

  Renew(request: IRenew): Observable<IRequestStatus> {
    return this._ApiConfigService.postReq(`v1/Actions/RenewPlan`, request);
  }

  GetMealsItems(request: IGetMealItemAction): Observable<IMealItemResponse> {
    let params = new HttpParams()
      .set("pagenumber", request.pagenumber)
      .set("pagesize", request.pagesize)
      .set("ItemName", request.ItemName || "");
    return this._ApiConfigService.getReq(`v1/Actions/GetItems`, params);
  }

  GetMealByID(MealID: number): Observable<IMealDetailsResponse> {
    let params = new HttpParams().set("MealID", MealID);
    return this._ApiConfigService.getReq(`v1/Actions/GetMealByID`, params);
  }

  CreateCustomMeeal(request: {
    data: ICreateCustomMealRequest;
    DayID: number;
  }): Observable<IRequestStatus> {
    let params = new HttpParams().set("DayID", request.DayID);
    return this._ApiConfigService.postReq(
      `v1/Actions/CreateCustomMeeal`,
      request.data,
      params
    );
  }

  ChangeName(request: IChangeNameAction): Observable<IRequestStatus> {
    let params = new HttpParams()
      .set("CustomerID", request.customerId)
      .set("CustomerName", request.customerName)
      .set("SID", request.SID);
    return this._ApiConfigService.postReq(`v1/Actions/ChangeName`, "", params);
  }

  ChangeBranchDriver(
    request: IChangeBranchDriverAction
  ): Observable<IRequestStatus> {
    let params = new HttpParams()
      .set("BranchId", request.branchID)
      .set("DriverID", request.driverID)
      .set("SID", request.SID);
    return this._ApiConfigService.postReq(
      `v1/Actions/ChangeBranchDriver`,
      "",
      params
    );
  }

  UpdateCustomerPhons(request: IChangePhoneAction): Observable<IRequestStatus> {
    return this._ApiConfigService.postReq(
      `v1/Actions/UpdateCustomerPhons`,
      request.customerPhons
    );
  }

  UpdateCustomerAdress(
    request: IUpdateCustomerAddressRequest
  ): Observable<IRequestStatus> {
    let params = new HttpParams()
      .set("customerid", request.customerId)
      .set("SID", request.SID);
    return this._ApiConfigService.postReq(
      `v1/Actions/UpdateCustomerAdress`,
      request.customerAdresses,
      params
    );
  }

  GetCustomersPhones(CID: number): Observable<ICustomerPhoneResponse> {
    let params = new HttpParams().set("CID", CID);
    return this._ApiConfigService.getReq(
      `v1/Actions/GetCustomersPhones`,
      params
    );
  }

  UpdateNotes(request: IChangeNotesAction): Observable<IRequestStatus> {
    let params = new HttpParams()
      .set("sid", request.sid)
      .set("notes", request.Notes);
    return this._ApiConfigService.postReq(`v1/Actions/UpdateNotes`, "", params);
  }

  UpdateDeliveryNotes(
    request: IChangeDeliveryNotesAction
  ): Observable<IRequestStatus> {
    let params = new HttpParams()
      .set("sid", request.sid)
      .set("Notes", request.Notes);
    return this._ApiConfigService.postReq(
      `v1/Actions/UpdateDeliveryNotes`,
      request.dates,
      params
    );
  }

  UpdateNutrition(request: IUpdateNutritionAction): Observable<IRequestStatus> {
    let params = new HttpParams()
      .set("sid", request.sid)
      .set("carb", request.carb)
      .set("protin", request.protin);
    return this._ApiConfigService.postReq(
      `v1/Actions/UpdateCarbProtin`,
      "",
      params
    );
  }

  Merge(request: IMergeAction): Observable<IRequestStatus> {
    let params = new HttpParams().set("Notes", request.Notes);
    return this._ApiConfigService.postReq(
      `v1/Actions/MergeDays`,
      request.days,
      params
    );
  }

  AutoDislikeAction(
    request: IAutoDislikeAction
  ): Observable<IAutoDislikeResponse> {
    let params = new HttpParams().set("SID", request.SID);
    return this._ApiConfigService.postReq(
      `v1/Actions/AutoDislikeAction`,
      request.dislike,
      params
    );
  }

  ApplyAutoDislike(
    request: IApplyAutoDislikeAction
  ): Observable<IRequestStatus> {
    return this._ApiConfigService.postReq(
      `v1/Actions/ApplyAutoDislike`,
      request
    );
  }

  ExportPlan(request: number): Observable<ExportPlanResponse> {
    let params = new HttpParams().set("SID", request);
    return this._ApiConfigService.getReq(`v1/Actions/ExportPlan`, params);
  }
}
