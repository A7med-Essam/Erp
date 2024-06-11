import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { Store } from "@ngrx/store";
import { FeatherModule } from "angular-feather";
import { IActions, TableComponent } from "src/app/pages/table/table.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { FormsModule } from "@angular/forms";
import { ColumnTypeEnum } from "src/app/enums/columns.enum";
import { IFullPlan } from "src/app/interfaces/allPlan.interface";
import { AllPlanSelector } from "src/app/store/allPlanStore/all-plan.selector";
import { GET_ALL_PLAN_START } from "src/app/store/allPlanStore/all-plan.action";
import { ActionEnum } from "src/app/enums/action.enum";
import { PermissionService } from "src/app/services/permission.service";
import { Route, Router, RouterModule } from "@angular/router";
import { PlanService } from "src/app/services/plan.service";

@Component({
  standalone: true,
  imports: [
    MatTableModule,
    TableComponent,
    MatCardModule,
    FeatherModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    FormsModule,
    RouterModule,
  ],
  selector: "app-plan",
  templateUrl: "./plan.component.html",
  styleUrls: ["./plan.component.scss"],
})
export class PlanComponent implements OnInit {
  columns = [
    {
      columnDef: "id",
      header: "ID",
      cell: (element: IFullPlan) => `${element?.id}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "planId",
      header: "Plan ID",
      cell: (element: IFullPlan) => `${element?.planId}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "daysCount",
      header: "Days Count",
      cell: (element: IFullPlan) => `${element?.daysCount}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "startDate",
      header: "Start Date",
      cell: (element: IFullPlan) => `${element?.startDate}`,
      display: true,
      type: ColumnTypeEnum.date,
    },
    {
      columnDef: "categoryID",
      header: "Category ID",
      cell: (element: IFullPlan) => `${element?.categoryID}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "startDay",
      header: "Start Day",
      cell: (element: IFullPlan) => `${element?.startDay}`,
      display: true,
      type: ColumnTypeEnum.date,
    },
    {
      columnDef: "isActive",
      header: "Is Active",
      cell: (element: IFullPlan) => `${element?.isActive}`,
      display: true,
      type: ColumnTypeEnum.toggle,
    },
    {
      columnDef: "planName",
      header: "Plan Name",
      cell: (element: IFullPlan) => `${element?.planName}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "defaultSticker",
      header: "Sticker",
      cell: (element: IFullPlan) => `${element?.defaultSticker}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "planExprission",
      header: "Plan Exprission",
      cell: (element: IFullPlan) => `${element?.planExprission}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
  ];
  Permissions = this._PermissionService.Permissions;
  actions: IActions[] = [
    {
      action: ActionEnum.update,
      icon: "edit",
      label: "Edit Plan",
      permission: this.Permissions.Plan.Edit,
    },
    {
      action: ActionEnum.delete,
      icon: "delete",
      label: "Delete Plan",
      permission: this.Permissions.Plan.Delete,
    },
  ];

  TABLE_DATA = toSignal(this._Store.select(AllPlanSelector));

  constructor(
    private _Store: Store,
    private _PermissionService: PermissionService,
    private _PlanService: PlanService,
    private _Router: Router
  ) {}

  ngOnInit(): void {
    this.GetData();
  }

  GetData() {
    if (!this.TABLE_DATA()?.data) {
      this._Store.dispatch(GET_ALL_PLAN_START());
    }
  }

  deleteRow(row: IFullPlan) {
    this._PlanService.deletePlan(row.id).subscribe({
      next: (res) => {
        this._Store.dispatch(GET_ALL_PLAN_START());
      },
    });
  }

  updateRow(row: IFullPlan) {
    this._PlanService.plan.next(row);
    this._Router.navigate([`/plans/create`]);
  }
}
