import { CommonModule } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { Store } from "@ngrx/store";
import { FeatherModule } from "angular-feather";
import { TableComponent } from "src/app/pages/table/table.component";
import { SubscriptionService } from "src/app/services/subscription.service";
import {
  GET_CUSTOMER_LOG_FAILED,
  GET_CUSTOMER_LOG_START,
} from "src/app/store/customerLogStore/customerLog.action";
import {
  GET_DELIVERY_LOG_FAILED,
  GET_DELIVERY_LOG_START,
} from "src/app/store/deliveryLogStore/deliveryLog.action";
import {
  GET_SUBSCRIPTIONS_BY_SID_FAILED,
  GET_SUBSCRIPTIONS_BY_SID_START,
} from "src/app/store/subscriptionBySidStore/subscriptionBySid.action";
import { subscriptionBySidSelector } from "src/app/store/subscriptionBySidStore/subscriptionBySid.selector";
import {
  IDeliveryStatusStatics,
  ISubscriptionTableDetails,
  SubscriptionDetailsComponent,
} from "../subscription-details/subscription-details.component";
import { CustomerLogComponent } from "../../log-component/customer-log/customer-log.component";
import { DeliveryLogComponent } from "../../log-component/delivery-log/delivery-log.component";
import { SubscriptionByPhoneComponent } from "../subscription-by-phone/subscription-by-phone.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { InvoiceLogComponent } from "../../log-component/invoice-log/invoice-log.component";
import { MatInputModule } from "@angular/material/input";
import { MatDialog } from "@angular/material/dialog";
import { AreaSelector } from "src/app/store/areaStore/area.selector";
import { GET_AREA_START } from "src/app/store/areaStore/area.action";
import {
  GET_INVOICE_LOG_FAILED,
  GET_INVOICE_LOG_START,
} from "src/app/store/InvoiceLogStore/InvoiceLog.action";
import { GET_BRANCH_DRIVER_START } from "src/app/store/branchDriverStore/branchDriver.action";
import { BranchDriverSelector } from "src/app/store/branchDriverStore/branchDriver.selector";
import { HoldComponent } from "../../actions/hold/hold.component";
import { Subject, map, takeUntil } from "rxjs";
import { ActiveComponent } from "../../actions/active/active.component";
import { ChangeStartDateComponent } from "../../actions/change-start-date/change-start-date.component";
import { RestrictComponent } from "../../actions/restrict/restrict.component";
import { ExtendComponent } from "../../actions/extend/extend.component";
import { ChangeMealTypesComponent } from "../../actions/change-meal-types/change-meal-types.component";
import { GET_PLAN_CATEGORY_START } from "src/app/store/planCategoryStore/plan-category.action";
import { PlanCategorySelector } from "src/app/store/planCategoryStore/plan-category.selector";
import { ChangeDeliveryDaysComponent } from "../../actions/change-delivery-days/change-delivery-days.component";
import { GET_DELIVERY_DAY_START } from "src/app/store/deliveryDayStore/deliveryDay.action";
import { DeliveryDaySelector } from "src/app/store/deliveryDayStore/deliveryDay.selector";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DetachComponent } from "../../actions/detach/detach.component";
import { DeleteDayComponent } from "../../actions/delete-day/delete-day.component";
import { ChangeDeliveryDetailsComponent } from "../../actions/change-delivery-details/change-delivery-details.component";
import {
  DeliveryStatusEnum,
  SubscriptionStatusEnum,
} from "src/app/enums/subscriptions.enum";
import { ChangeStatusComponent } from "../../actions/change-status/change-status.component";
import { MigrateComponent } from "../../actions/migrate/migrate.component";
import { RenewComponent } from "../../actions/renew/renew.component";
import { ChangeNameDialogComponent } from "../../actions/change-name-dialog/change-name-dialog.component";
import { ChangeBranchDialogComponent } from "../../actions/change-branch-dialog/change-branch-dialog.component";
import { ChangePhoneDialogComponent } from "../../actions/change-phone-dialog/change-phone-dialog.component";
import { ChangeAddressDialogComponent } from "../../actions/change-address-dialog/change-address-dialog.component";
import { GET_CUSTOMER_ADDRESS_START } from "src/app/store/customerAddressStore/customerAddress.action";
import { CustomerAddressSelector } from "src/app/store/customerAddressStore/customerAddress.selector";
import { ChangeNoteDialogComponent } from "../../actions/change-note-dialog/change-note-dialog.component";
import { ChangeDeliveryNoteDialogComponent } from "../../actions/change-delivery-note-dialog/change-delivery-note-dialog.component";
import { UpdateNutritionDialogComponent } from "../../actions/update-nutrition-dialog/update-nutrition-dialog.component";
import { DeliveryNoteLogComponent } from "../../log-component/delivery-note-log/delivery-note-log.component";
import {
  GET_DELIVERY_NOTE_LOG_FAILED,
  GET_DELIVERY_NOTE_LOG_START,
} from "src/app/store/deliveryNoteLogStore/deliveryNoteLog.action";
import { PermissionService } from "src/app/services/permission.service";
import { snackBarConfig } from "src/app/models/MatSnackBarConfig";
import { UnrestrictComponent } from "../../actions/unrestrict/unrestrict.component";
import { DislikeComponent } from "../../actions/dislike/dislike.component";
import { GET_DISLIKE_LOG_START } from "src/app/store/dislikeLogStore/dislikeLog.action";
import { DislikeLogComponent } from "../../log-component/dislike-log/dislike-log.component";
import { ToIntPipe } from "src/app/pipes/to-int.pipe";
import { InvoiceLog } from "src/app/interfaces/log.interface";
import { MatChipListboxChange, MatChipsModule } from "@angular/material/chips";
import { MergeComponent } from "../../actions/merge/merge.component";
import { AutoDislikeComponent } from "../../actions/auto-dislike/auto-dislike.component";
import { PlanExporterComponent } from "../../plan-component/plan-exporter/plan-exporter.component";

@Component({
  selector: "app-subscription-manager",
  templateUrl: "./subscription-manager.component.html",
  styleUrls: ["./subscription-manager.component.scss"],
  standalone: true,
  imports: [
    MatTableModule,
    TableComponent,
    MatCardModule,
    FeatherModule,
    CommonModule,
    MatButtonModule,
    MatTabsModule,
    MatFormFieldModule,
    MatMenuModule,
    MatIconModule,
    DeliveryLogComponent,
    CustomerLogComponent,
    InvoiceLogComponent,
    SubscriptionDetailsComponent,
    SubscriptionByPhoneComponent,
    MatInputModule,
    DeliveryNoteLogComponent,
    DislikeLogComponent,
    ToIntPipe,
    MatChipsModule,
  ],
})
export class SubscriptionManagerComponent implements OnInit, OnDestroy {
  SUBSCRIPTION_DATA = toSignal(this._Store.select(subscriptionBySidSelector));
  branchDriver = toSignal(this._Store.select(BranchDriverSelector));
  AREA_DATA = toSignal(this._Store.select(AreaSelector));
  planCategories = toSignal(this._Store.select(PlanCategorySelector));
  deliveryDays = toSignal(this._Store.select(DeliveryDaySelector));
  customerAddresses = toSignal(this._Store.select(CustomerAddressSelector));
  Permissions = this._PermissionService.Permissions;
  private unsubscribe$ = new Subject<void>();

  isFilterByPhone: boolean = false;
  currentSID: string = "";
  currentSelectedRows: ISubscriptionTableDetails[] = [];
  restrictedSubscriptions: ISubscriptionTableDetails[] = [];
  holdSubscriptions: ISubscriptionTableDetails[] = [];
  cancelledSubscriptions: ISubscriptionTableDetails[] = [];
  deliveredSubscriptions: ISubscriptionTableDetails[] = [];
  pendingSubscriptions: ISubscriptionTableDetails[] = [];
  currentTabIndex = 0;

  constructor(
    private _Store: Store,
    private _SubscriptionService: SubscriptionService,
    public _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _PermissionService: PermissionService
  ) {}

  ngOnDestroy(): void {
    this._Store.dispatch(
      GET_SUBSCRIPTIONS_BY_SID_FAILED({
        error: new HttpErrorResponse({ error: "" }),
      })
    );
    this._Store.dispatch(
      GET_DELIVERY_LOG_FAILED({
        error: new HttpErrorResponse({ error: "" }),
      })
    );
    this._Store.dispatch(
      GET_CUSTOMER_LOG_FAILED({
        error: new HttpErrorResponse({ error: "" }),
      })
    );
    this._Store.dispatch(
      GET_INVOICE_LOG_FAILED({
        error: new HttpErrorResponse({ error: "" }),
      })
    );
    this._Store.dispatch(
      GET_DELIVERY_NOTE_LOG_FAILED({
        error: new HttpErrorResponse({ error: "" }),
      })
    );
    this._SubscriptionService.currentSID.next("");
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.currentSID = this._SubscriptionService.currentSID.value;
    this.searchBySID(this.currentSID);
    this.GetArea();
    this.GetPlanCategories();
    this.getBranchDrivers();
    this.GetDeliveryDays();
    this.GetCustomerAddress();
  }
  SubscriptionStatusEnum: typeof SubscriptionStatusEnum =
    SubscriptionStatusEnum;
  DeliveryStatusEnum: typeof DeliveryStatusEnum = DeliveryStatusEnum;
  // checkPlan(subscriptionDetails: ISubDetail[]) {}

  GetCustomerAddress() {
    this._Store
      .select(subscriptionBySidSelector)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        if (res.data) {
          // this.checkPlan(res.data.subscriptionDetails);
          this.dispatchCustomerAddress(
            this.SUBSCRIPTION_DATA()?.data?.subscriptionHeader.customerID || 0
          );
        }
      });
  }

  dispatchCustomerAddress(CustomerID: number) {
    this._Store.dispatch(GET_CUSTOMER_ADDRESS_START({ CustomerID }));
  }

  getBranchDrivers() {
    if (!this.branchDriver()?.data) {
      this._Store.dispatch(GET_BRANCH_DRIVER_START());
    }
  }

  GetData(SID_INPUT: HTMLInputElement, PHONE_INPUT: HTMLInputElement) {
    PHONE_INPUT.value = "";
    if (SID_INPUT.value) {
      this.FilterChip = "";
      this.currentSID = SID_INPUT.value;
      this.isFilterByPhone = false;
      SID_INPUT.blur();
      this._Store.dispatch(
        GET_SUBSCRIPTIONS_BY_SID_START({ data: Number(SID_INPUT.value) })
      );
      this._Store.dispatch(
        GET_CUSTOMER_LOG_START({ SID: Number(SID_INPUT.value) })
      );
      this._Store.dispatch(
        GET_DELIVERY_LOG_START({ SID: Number(SID_INPUT.value) })
      );
      this._Store.dispatch(
        GET_INVOICE_LOG_START({ SID: Number(SID_INPUT.value) })
      );
      this._Store.dispatch(
        GET_DELIVERY_NOTE_LOG_START({ SID: Number(SID_INPUT.value) })
      );
      this._Store.dispatch(
        GET_DISLIKE_LOG_START({ SID: Number(SID_INPUT.value) })
      );
    }
  }

  filterByPhone(INPUT: HTMLInputElement, SID_INPUT: HTMLInputElement) {
    this.isFilterByPhone = false;
    SID_INPUT.value = "";
    setTimeout(() => {
      if (INPUT.value) {
        INPUT.blur();
        this.isFilterByPhone = true;
      } else {
        this.isFilterByPhone = false;
      }
    }, 0);
  }

  searchBySID(SID: string) {
    if (SID) {
      this.FilterChip = "";
      this.isFilterByPhone = false;
      this._Store.dispatch(
        GET_SUBSCRIPTIONS_BY_SID_START({ data: Number(SID) })
      );
      this._Store.dispatch(GET_CUSTOMER_LOG_START({ SID: Number(SID) }));
      this._Store.dispatch(GET_DELIVERY_LOG_START({ SID: Number(SID) }));
      this._Store.dispatch(GET_INVOICE_LOG_START({ SID: Number(SID) }));
      this._Store.dispatch(GET_DELIVERY_NOTE_LOG_START({ SID: Number(SID) }));
      this._Store.dispatch(GET_DISLIKE_LOG_START({ SID: Number(SID) }));
    }
  }

  GetArea() {
    if (!this.AREA_DATA()?.data) {
      this._Store.dispatch(GET_AREA_START());
    }
  }

  GetPlanCategories() {
    if (!this.planCategories()?.data) {
      this._Store.dispatch(GET_PLAN_CATEGORY_START());
    }
  }

  GetDeliveryDays() {
    if (!this.deliveryDays()?.data) {
      this._Store.dispatch(GET_DELIVERY_DAY_START());
    }
  }
  // =============== Actions ================
  Hold(): void {
    if (this.Permissions.SubscriptionActions.hold) {
      this._dialog
        .open(HoldComponent, {
          enterAnimationDuration: "100ms",
          exitAnimationDuration: "100ms",
          height: "350px",
          width: "500px",
          data: this.SUBSCRIPTION_DATA()?.data?.subscriptionHeader
            ?.subscriptionsID,
          disableClose: true,
        })
        .afterClosed()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res: boolean) => {
          if (res) {
            this.searchBySID(this.currentSID);
          }
        });
    }
  }

  Activate(): void {
    if (this.Permissions.SubscriptionActions.Active) {
      this._dialog
        .open(ActiveComponent, {
          enterAnimationDuration: "100ms",
          exitAnimationDuration: "100ms",
          height: "350px",
          width: "500px",
          data: this.SUBSCRIPTION_DATA()?.data?.subscriptionHeader
            ?.subscriptionsID,
          disableClose: true,
        })
        .afterClosed()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res: boolean) => {
          if (res) {
            this.searchBySID(this.currentSID);
          }
        });
    }
  }

  ChangeStartDate(): void {
    if (this.Permissions.SubscriptionActions.ChangeStartDate) {
      this._dialog
        .open(ChangeStartDateComponent, {
          enterAnimationDuration: "100ms",
          exitAnimationDuration: "100ms",
          height: "350px",
          width: "500px",
          data: this.SUBSCRIPTION_DATA()?.data?.subscriptionHeader
            ?.subscriptionsID,
          disableClose: true,
        })
        .afterClosed()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res: boolean) => {
          if (res) {
            this.searchBySID(this.currentSID);
          }
        });
    }
  }

  Restrict(): void {
    if (this.Permissions.SubscriptionActions.Restrict) {
      this._dialog
        .open(RestrictComponent, {
          enterAnimationDuration: "100ms",
          exitAnimationDuration: "100ms",
          height: "410px",
          width: "500px",
          data: this.SUBSCRIPTION_DATA()?.data?.subscriptionHeader
            ?.subscriptionsID,
          disableClose: true,
        })
        .afterClosed()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res: boolean) => {
          if (res) {
            this.searchBySID(this.currentSID);
          }
        });
    }
  }

  Extend(): void {
    if (this.Permissions.SubscriptionActions.Extend) {
      this._dialog
        .open(ExtendComponent, {
          enterAnimationDuration: "100ms",
          exitAnimationDuration: "100ms",
          height: "350px",
          width: "500px",
          data: this.SUBSCRIPTION_DATA()?.data?.subscriptionHeader
            ?.subscriptionsID,
          disableClose: true,
        })
        .afterClosed()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res: boolean) => {
          if (res) {
            this.searchBySID(this.currentSID);
          }
        });
    }
  }

  ChangeMealTypes(): void {
    if (this.Permissions.SubscriptionActions.ChangeMealTypes) {
      this._dialog
        .open(ChangeMealTypesComponent, {
          enterAnimationDuration: "100ms",
          exitAnimationDuration: "100ms",
          height: "350px",
          width: "500px",
          data: this.SUBSCRIPTION_DATA()?.data?.subscriptionHeader,
          disableClose: true,
        })
        .afterClosed()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res: boolean) => {
          if (res) {
            this.searchBySID(this.currentSID);
          }
        });
    }
  }

  ChangeDeliveryDays(): void {
    if (this.Permissions.SubscriptionActions.ChangeDeliveryDays) {
      this._dialog
        .open(ChangeDeliveryDaysComponent, {
          enterAnimationDuration: "100ms",
          exitAnimationDuration: "100ms",
          height: "350px",
          width: "500px",
          data: this.SUBSCRIPTION_DATA()?.data?.subscriptionHeader,
          disableClose: true,
        })
        .afterClosed()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res: boolean) => {
          if (res) {
            this.searchBySID(this.currentSID);
          }
        });
    }
  }

  ChangeDayStatus(): void {
    if (this.Permissions.SubscriptionActions.ChangeDayState) {
      if (this.currentSelectedRows.length) {
        const validRows = this.currentSelectedRows.filter(
          (e) =>
            e.meals[0].deliveryStatus.toLowerCase() !=
              DeliveryStatusEnum.Deliveried.toLowerCase() &&
            e.meals[0].deliveryStatus.toLowerCase() !=
              DeliveryStatusEnum.Resticited.toLowerCase()
        );

        if (validRows.length) {
          this._dialog
            .open(ChangeStatusComponent, {
              enterAnimationDuration: "100ms",
              exitAnimationDuration: "100ms",
              height: "230px",
              width: "500px",
              data: {
                subscriptionsHeader:
                  this.SUBSCRIPTION_DATA()?.data?.subscriptionHeader,
                row: validRows,
              },
              disableClose: true,
            })
            .afterClosed()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((res: boolean) => {
              if (res) {
                this.searchBySID(this.currentSID);
                this.currentSelectedRows = [];
              }
            });
        } else {
          this._snackBar.open(
            "All selected rows are already delivered or resticted",
            "❌",
            snackBarConfig
          );
        }
      } else {
        this._snackBar.open("Please select rows", "❌", snackBarConfig);
      }
    }
  }

  ChangeDeliveryDetails(): void {
    if (this.Permissions.SubscriptionActions.ChangeDeliveryDetails) {
      if (this.currentSelectedRows.length) {
        const validRows = this.currentSelectedRows.filter(
          (e) =>
            e.meals[0].deliveryStatus.toLowerCase() !=
            DeliveryStatusEnum.Deliveried.toLowerCase()
        );

        if (validRows.length) {
          this._dialog
            .open(ChangeDeliveryDetailsComponent, {
              enterAnimationDuration: "100ms",
              exitAnimationDuration: "100ms",
              height: "490px",
              width: "600px",
              data: {
                subscriptionsHeader:
                  this.SUBSCRIPTION_DATA()?.data?.subscriptionHeader,
                row: this.currentSelectedRows,
              },
              disableClose: true,
            })
            .afterClosed()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((res: boolean) => {
              if (res) {
                this.searchBySID(this.currentSID);
                this.currentSelectedRows = [];
              }
            });
        } else {
          this._snackBar.open(
            "All selected rows are already delivered",
            "❌",
            snackBarConfig
          );
        }
      } else {
        this._snackBar.open("Please select rows", "❌", snackBarConfig);
      }
    }
  }

  Renew(): void {
    if (this.Permissions.SubscriptionActions.Renew) {
      this._dialog
        .open(RenewComponent, {
          enterAnimationDuration: "100ms",
          exitAnimationDuration: "100ms",
          height: "650px",
          width: "1200px",
          data: this.SUBSCRIPTION_DATA()?.data,
          disableClose: true,
        })
        .afterClosed()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res: boolean) => {
          if (res) {
            this.searchBySID(this.currentSID);
          }
        });
    }
  }

  Migrate(): void {
    if (this.Permissions.SubscriptionActions.Migrate) {
      this._dialog
        .open(MigrateComponent, {
          enterAnimationDuration: "100ms",
          exitAnimationDuration: "100ms",
          height: "650px",
          width: "1200px",
          data: this.SUBSCRIPTION_DATA()?.data?.subscriptionHeader,
          disableClose: true,
        })
        .afterClosed()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res: boolean) => {
          if (res) {
            this.searchBySID(this.currentSID);
          }
        });
    }
  }

  Delete(): void {
    if (this.Permissions.SubscriptionActions.DeleteDays) {
      if (this.currentSelectedRows.length) {
        const validRows = this.currentSelectedRows.filter(
          (e) =>
            e.meals[0].deliveryStatus.toLowerCase() !=
            DeliveryStatusEnum.Deliveried.toLowerCase()
        );

        if (validRows.length) {
          this._dialog
            .open(DeleteDayComponent, {
              enterAnimationDuration: "100ms",
              exitAnimationDuration: "100ms",
              height: "250px",
              width: "500px",
              data: {
                SID: this.SUBSCRIPTION_DATA()?.data?.subscriptionHeader
                  ?.subscriptionsID,
                dates: validRows.map((e) => e.deliveryDate),
              },
              disableClose: true,
            })
            .afterClosed()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((res: boolean) => {
              if (res) {
                this.currentSelectedRows = [];
                this.searchBySID(this.currentSID);
              }
            });
        } else {
          this._snackBar.open(
            "All selected rows are already delivered",
            "❌",
            snackBarConfig
          );
        }
      } else {
        this._snackBar.open("Please select rows", "❌", snackBarConfig);
      }
    }
  }

  Detach(): void {
    if (this.Permissions.SubscriptionActions.Deduct) {
      this._dialog
        .open(DetachComponent, {
          enterAnimationDuration: "100ms",
          exitAnimationDuration: "100ms",
          height: "600px",
          width: "1200px",
          data: {
            SID: this.SUBSCRIPTION_DATA()?.data?.subscriptionHeader
              ?.subscriptionsID,
            plan: this.currentPlan,
          },
          disableClose: true,
        })
        .afterClosed()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res: boolean) => {
          if (res) {
            this.searchBySID(this.currentSID);
          }
        });
    }
  }

  Merge(): void {
    if (this.Permissions.SubscriptionActions.Merge) {
      if (this.currentSelectedRows.length) {
        const validRows = this.currentSelectedRows.filter(
          (e) =>
            e.meals[0].deliveryStatus.toLowerCase() !=
            DeliveryStatusEnum.Deliveried.toLowerCase()
        );

        if (validRows.length) {
          this._dialog
            .open(MergeComponent, {
              enterAnimationDuration: "100ms",
              exitAnimationDuration: "100ms",
              height: "600px",
              width: "1200px",
              data: validRows,
              disableClose: true,
            })
            .afterClosed()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((res: boolean) => {
              this.currentSelectedRows = [];
              this.searchBySID(this.currentSID);
            });
        } else {
          this._snackBar.open(
            "All selected rows are already delivered",
            "❌",
            snackBarConfig
          );
        }
      } else {
        this._snackBar.open("Please select rows", "❌", snackBarConfig);
      }
    }
  }

  Unrestrict(): void {
    if (this.Permissions.SubscriptionActions.Unrestrict) {
      this._dialog
        .open(UnrestrictComponent, {
          enterAnimationDuration: "100ms",
          exitAnimationDuration: "100ms",
          height: "600px",
          width: "1200px",
          data: {
            SID: this.SUBSCRIPTION_DATA()?.data?.subscriptionHeader
              ?.subscriptionsID,
            plan: this.currentPlan,
          },
          disableClose: true,
        })
        .afterClosed()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res: boolean) => {
          if (res) {
            this.searchBySID(this.currentSID);
          }
        });
    }
  }

  RefreshPlan(isRefresh: boolean) {
    if (isRefresh) {
      this.searchBySID(this.currentSID);
    }
  }

  getSelectedRows(e: ISubscriptionTableDetails[]) {
    this.currentSelectedRows = e;
  }

  currentPlan: ISubscriptionTableDetails[] = [];
  getPlanDays(plan: ISubscriptionTableDetails[]) {
    this.currentPlan = plan;
  }

  changeAddress(
    enterAnimationDuration: string = "100ms",
    exitAnimationDuration: string = "100ms"
  ): void {
    if (this.Permissions.SubscriptionActions.EditCustomerData) {
      this._dialog
        .open(ChangeAddressDialogComponent, {
          enterAnimationDuration,
          exitAnimationDuration,
          height: "500px",
          width: "1200px",
          data: {
            subscription: this.SUBSCRIPTION_DATA()?.data?.subscriptionHeader,
            area: this.AREA_DATA(),
            customerAddresses: this.customerAddresses(),
          },
          disableClose: true,
        })
        .afterClosed()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res: boolean) => {
          if (res) {
            this.searchBySID(this.currentSID);
          }
        });
    }
  }

  changeName(
    enterAnimationDuration: string = "100ms",
    exitAnimationDuration: string = "100ms"
  ): void {
    if (this.Permissions.SubscriptionActions.EditCustomerData) {
      this._dialog
        .open(ChangeNameDialogComponent, {
          enterAnimationDuration,
          exitAnimationDuration,
          height: "200px",
          width: "500px",
          data: {
            subscription: this.SUBSCRIPTION_DATA()?.data?.subscriptionHeader,
          },
          disableClose: true,
        })
        .afterClosed()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res: boolean) => {
          if (res) {
            this.searchBySID(this.currentSID);
          }
        });
    }
  }

  changeBranchDriver(
    enterAnimationDuration: string = "100ms",
    exitAnimationDuration: string = "100ms"
  ): void {
    if (this.Permissions.SubscriptionActions.ChangeDeliveryDetails) {
      this._dialog
        .open(ChangeBranchDialogComponent, {
          enterAnimationDuration,
          exitAnimationDuration,
          height: "230px",
          width: "1200px",
          data: {
            subscription: this.SUBSCRIPTION_DATA()?.data?.subscriptionHeader,
          },
          disableClose: true,
        })
        .afterClosed()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res: boolean) => {
          if (res) {
            this.searchBySID(this.currentSID);
          }
        });
    }
  }

  changePhone(
    enterAnimationDuration: string = "100ms",
    exitAnimationDuration: string = "100ms"
  ): void {
    if (this.Permissions.SubscriptionActions.EditCustomerData) {
      this._dialog
        .open(ChangePhoneDialogComponent, {
          enterAnimationDuration,
          exitAnimationDuration,
          height: "230px",
          width: "1200px",
          data: {
            subscription: this.SUBSCRIPTION_DATA()?.data?.subscriptionHeader,
          },
          disableClose: true,
        })
        .afterClosed()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res: boolean) => {
          if (res) {
            this.searchBySID(this.currentSID);
          }
        });
    }
  }

  changeNotes() {
    if (this.Permissions.SubscriptionActions.UpdateNotes) {
      this._dialog
        .open(ChangeNoteDialogComponent, {
          enterAnimationDuration: "100ms",
          exitAnimationDuration: "100ms",
          height: "350px",
          width: "800px",
          data: this.SUBSCRIPTION_DATA()?.data?.subscriptionHeader,
          disableClose: true,
        })
        .afterClosed()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res: boolean) => {
          if (res) {
            this.searchBySID(this.currentSID);
          }
        });
    }
  }

  changeDeliveryNotes() {
    if (this.Permissions.SubscriptionActions.ChangeDeliveryNotes) {
      if (this.currentSelectedRows.length) {
        this._dialog
          .open(ChangeDeliveryNoteDialogComponent, {
            enterAnimationDuration: "100ms",
            exitAnimationDuration: "100ms",
            height: "410px",
            width: "800px",
            data: {
              subscriptionsHeader:
                this.SUBSCRIPTION_DATA()?.data?.subscriptionHeader,
              row: this.currentSelectedRows,
            },
            disableClose: true,
          })
          .afterClosed()
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe((res: boolean) => {
            if (res) {
              this.searchBySID(this.currentSID);
              this.currentSelectedRows = [];
            }
          });
      } else {
        this._snackBar.open("Please select rows", "❌", snackBarConfig);
      }
    }
  }

  changeNutritions() {
    if (this.Permissions.SubscriptionActions.UpdateNutiration) {
      this._dialog
        .open(UpdateNutritionDialogComponent, {
          enterAnimationDuration: "100ms",
          exitAnimationDuration: "100ms",
          height: "350px",
          width: "800px",
          data: this.SUBSCRIPTION_DATA()?.data?.subscriptionHeader
            .subscriptionsID,
          disableClose: true,
        })
        .afterClosed()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res: boolean) => {
          if (res) {
            this.searchBySID(this.currentSID);
          }
        });
    }
  }

  Dislike(): void {
    if (this.Permissions.SubscriptionActions.Dislike) {
      this._dialog
        .open(DislikeComponent, {
          enterAnimationDuration: "100ms",
          exitAnimationDuration: "100ms",
          height: "500px",
          width: "600px",
          data: this.SUBSCRIPTION_DATA()?.data,
          disableClose: true,
        })
        .afterClosed()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res: boolean) => {
          if (res) {
            this.searchBySID(this.currentSID);
          }
        });
    }
  }

  AutoDislike(): void {
    if (this.Permissions.SubscriptionActions.Dislike) {
      this._dialog
        .open(AutoDislikeComponent, {
          enterAnimationDuration: "100ms",
          exitAnimationDuration: "100ms",
          height: "750px",
          width: "1800px",
          data: this.SUBSCRIPTION_DATA()?.data,
          disableClose: true,
        })
        .afterClosed()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res: boolean) => {
          if (res) {
            this.searchBySID(this.currentSID);
          }
        });
    }
  }

  // ====================  Filter Data ====================
  currentInvoice!: InvoiceLog;
  filterByInvoice(row: InvoiceLog) {
    this.FilterChip = "";
    this.currentInvoice = row;
    this.currentTabIndex = 1;
    setTimeout(() => {
      this.currentTabIndex = 0;
    }, 1);
  }
  // ====================  Statics ====================
  getStaticsOfDeliveryStatus(e: IDeliveryStatusStatics) {
    this.pendingSubscriptions = e.pending;
    this.deliveredSubscriptions = e.delivered;
    this.restrictedSubscriptions = e.restricted;
    this.holdSubscriptions = e.hold;
    this.cancelledSubscriptions = e.cancelled;
  }

  FilterChip: string = "";
  onChipChange(e: MatChipListboxChange) {
    this.FilterChip = e.value;
  }

  // ========================= export =========================
  export(): void {
    if (this.Permissions.SubscriptionActions.Dislike) {
      this._dialog.open(PlanExporterComponent, {
        enterAnimationDuration: "100ms",
        exitAnimationDuration: "100ms",
        height: "800px",
        width: "1800px",
        data: this.SUBSCRIPTION_DATA()?.data,
        disableClose: true,
      });
    }
  }
}
