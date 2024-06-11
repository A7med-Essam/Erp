import { Component, Inject, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { SelectSearchDirective } from "src/app/directives/select-search.directive";
import { ActionsService } from "src/app/services/actions.service";
import { ISubscriptionTableDetails } from "../../subscription-component/subscription-details/subscription-details.component";
import {
  TableColumn,
  TableComponent,
} from "src/app/pages/table/table.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ColumnTypeEnum } from "src/app/enums/columns.enum";
import {
  ISubDetail,
  ISubscriptionDetail,
} from "src/app/interfaces/subscription.interface";
import { Store } from "@ngrx/store";
import { GET_DISLIKE_START } from "src/app/store/dislikeStore/dislike.action";
import { toSignal } from "@angular/core/rxjs-interop";
import { DislikeSelector } from "src/app/store/dislikeStore/dislike.selector";
import { IAutoDislike, IDISLIKE } from "src/app/interfaces/dislike.interface";
import { MatCardModule } from "@angular/material/card";
import { IApplyAutoDislikeAction } from "src/app/interfaces/action.interface";
import { DeliveryStatusEnum } from "src/app/enums/subscriptions.enum";
import { Subject, takeUntil } from "rxjs";

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSelectModule,
    SelectSearchDirective,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    TableComponent,
    MatCardModule,
  ],
  selector: "app-auto-dislike",
  templateUrl: "./auto-dislike.component.html",
  styleUrls: ["./auto-dislike.component.scss"],
})
export class AutoDislikeComponent implements OnDestroy {
  private unsubscribe$ = new Subject<void>();
  DislikeCategory = toSignal(this._Store.select(DislikeSelector));
  dislikes: IAutoDislike = { mealsToChange: [], mealsToSave: [] };
  dislikeCategoryColumns: TableColumn[] = [
    {
      columnDef: "dilikeCategoryName",
      header: "Categories",
      cell: (element: IDISLIKE) => `${element?.dilikeCategoryName}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
  ];
  columns: TableColumn[] = [
    {
      columnDef: "dayID",
      header: "Day ID",
      cell: (element: ISubDetail) => `${element?.dayID}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "mealTypeName",
      header: "Meal Type",
      cell: (element: ISubDetail) => `${element?.mealTypeName}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "mealName",
      header: "Meal Name",
      cell: (element: ISubDetail) => `${element?.mealName}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
  ];
  constructor(
    public _dialogRef: MatDialogRef<AutoDislikeComponent>,
    private _ActionsService: ActionsService,
    @Inject(MAT_DIALOG_DATA)
    public data: ISubscriptionDetail,
    private _Store: Store
  ) {
    this.GetDislikeCategory();
    this.getCustomerDislikes();
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  currentUserDislikeCategory: IDISLIKE[] = [];
  getCustomerDislikes() {
    if (this.data.dislikeCategory.length) {
      this._Store
        .select(DislikeSelector)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res) => {
          this.currentUserDislikeCategory =
            res.data?.filter((e) =>
              this.data.dislikeCategory
                .split(",")
                .includes(e.dilikeCategoryID.toString())
            ) || [];
        });
      this.getDislikes(this.currentUserDislikeCategory);
    } else {
      this.dislikes.mealsToChange = this.data.subscriptionDetails.filter(
        (e) => e.deliveryStatus == DeliveryStatusEnum.Pending
      );
    }
  }

  getDislikes(dislike: IDISLIKE[]) {
    this._ActionsService
      .AutoDislikeAction({
        SID: this.data.subscriptionHeader.subscriptionsID,
        dislike,
      })
      .subscribe((res) => {
        this.dislikes = res.data;
      });
  }

  GetDislikeCategory() {
    if (!this.DislikeCategory()?.data) {
      this._Store.dispatch(GET_DISLIKE_START());
    }
  }

  currentSelectedRows: IDISLIKE[] = [];
  getSelectedRows(e: IDISLIKE[]) {
    setTimeout(() => {
      this.currentSelectedRows = e;
      if (e.length) {
        this.getDislikes(e);
      }
    }, 10);
  }

  onSubmit() {
    if (this.dislikes.mealsToSave.length) {
      const data: IApplyAutoDislikeAction = {
        mealsToSave: this.dislikes.mealsToSave.map((e) => {
          return {
            id: e.id,
            mealID: e.mealID,
          };
        }),
        sid: this.data.subscriptionHeader.subscriptionsID,
        dislikeCategory: [...this.currentSelectedRows],
      };
      this._ActionsService.ApplyAutoDislike(data).subscribe({
        next: () => {
          this._dialogRef.close(true);
        },
      });
    }
  }
}
