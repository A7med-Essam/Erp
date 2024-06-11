import { Component, ElementRef, Inject, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { ActionsService } from "src/app/services/actions.service";
import { FormBuilder } from "@angular/forms";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from "@angular/material/dialog";
import { ISubscriptionDetail } from "src/app/interfaces/subscription.interface";
import { IPlanDetails } from "src/app/interfaces/action.interface";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { TableComponent } from "src/app/pages/table/table.component";
import { ColumnTypeEnum } from "src/app/enums/columns.enum";

@Component({
  selector: "app-plan-exporter",
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    TableComponent,
  ],
  templateUrl: "./plan-exporter.component.html",
  styleUrls: ["./plan-exporter.component.scss"],
})
export class PlanExporterComponent {
  constructor(
    private _ActionsService: ActionsService,
    public _dialogRef: MatDialogRef<PlanExporterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ISubscriptionDetail
  ) {
    this.getData();
  }

  plan: any;
  maxMeals: number = 0;
  getData() {
    this._ActionsService
      .ExportPlan(this.data.subscriptionHeader.subscriptionsID)
      .subscribe((res) => {
        this.plan = this.transformData(res.data);
        this.maxMeals = this.getDayWithHighestMeals(
          this.plan.details
        ).indexOfMaxMeals;
        console.log(this.plan);
      });
  }

  @ViewChild("download_container") download_container!: ElementRef;
  isLoading: boolean = false;

  export() {
    this.isLoading = true;
    setTimeout(() => {
      let HTML_Width = this.download_container.nativeElement.clientWidth;
      let HTML_Height = this.download_container.nativeElement.clientHeight;
      html2canvas(this.download_container.nativeElement).then((canvas) => {
        let imgData = canvas.toDataURL("image/jpeg");
        let pdf = new jsPDF("p", "pt", [HTML_Width * 1.05, HTML_Height * 1.05]);
        pdf.addImage(imgData, "JPG", 50, 50, HTML_Width, HTML_Height);
        const fileName = "FILE";
        pdf.save(fileName);
        this.isLoading = false;
      });
    }, 1);
  }

  transformData(data: any) {
    const detailsMap: any = {};

    data.details.forEach((detail: any) => {
      const key = `${detail.deliveryDay}-${detail.dayName}`;
      if (!detailsMap[key]) {
        detailsMap[key] = {
          deliveryDay: detail.deliveryDay,
          dayName: detail.dayName,
          meals: [],
          total: {
            calories: 0,
            protein: 0,
            fats: 0,
            carb: 0,
          },
        };
      }

      const nutrations = detail.mealsNutrations;
      detailsMap[key].meals.push({
        mealType: detail.mealType,
        mealName: detail.meal,
        nutrations,
      });

      detailsMap[key].total.calories += Math.round(nutrations.calories);
      detailsMap[key].total.protein += Math.round(nutrations.protein);
      detailsMap[key].total.fats += Math.round(nutrations.fats);
      detailsMap[key].total.carb += Math.round(nutrations.carb);
    });

    const detailsArray = Object.values(detailsMap);

    const weeks: any = [];
    let weeklyTotal = { calories: 0, protein: 0, fats: 0, carb: 0, week: "", averageCalories: 0 };
    let weekNumber = 1;

    detailsArray.forEach((detail: any, index) => {
      weeklyTotal.calories += Math.round(detail.total.calories);
      weeklyTotal.protein += Math.round(detail.total.protein);
      weeklyTotal.fats += Math.round(detail.total.fats);
      weeklyTotal.carb += Math.round(detail.total.carb);

      if ((index + 1) % 7 === 0 || index + 1 === detailsArray.length) {
        weeklyTotal.week = `Week ${weekNumber}`;
        const daysInWeek = (index + 1) % 7 === 0 ? 7 : (index + 1) % 7;
        weeklyTotal.averageCalories = Math.round(weeklyTotal.calories / daysInWeek);
        weeks.push({ ...weeklyTotal });
        weeklyTotal = { calories: 0, protein: 0, fats: 0, carb: 0, week: "", averageCalories: 0 };
        weekNumber++;
      }
    });

    return {
      ...data,
      weeks: weeks,
      details: detailsArray,
    };
  }

  getDayWithHighestMeals(mealPlans: any) {
    let maxMeals = 0;
    let dayWithMaxMeals = "";
    let indexOfMaxMeals = -1;

    mealPlans.forEach((plan: any, index: any) => {
      const numberOfMeals = plan.meals.length;

      if (numberOfMeals > maxMeals) {
        maxMeals = numberOfMeals;
        dayWithMaxMeals = plan.dayName;
        indexOfMaxMeals = index;
      }
    });

    return {
      dayWithMaxMeals,
      maxMeals,
      indexOfMaxMeals,
    };
  }

  columns = [
    {
      columnDef: "sid",
      header: "SID",
      cell: (element: IPlanDetails) => `${element?.sid}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "name",
      header: "Name",
      cell: (element: IPlanDetails) => `${element?.name}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "adress",
      header: "Address",
      cell: (element: IPlanDetails) => `${element?.adress}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "email",
      header: "Email",
      cell: (element: IPlanDetails) => `${element?.email}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "phone",
      header: "Phone",
      cell: (element: IPlanDetails) => `${element?.phone}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "plan",
      header: "Plan",
      cell: (element: IPlanDetails) => `${element?.plan}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "status",
      header: "Status",
      cell: (element: IPlanDetails) => `${element?.status}`,
      display: true,
      type: ColumnTypeEnum.toggle,
    },
    {
      columnDef: "remaingDays",
      header: "Remaing Days",
      cell: (element: IPlanDetails) => `${element?.remaingDays}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "deliveryBranch",
      header: "Delivery Branch",
      cell: (element: IPlanDetails) => `${element?.deliveryBranch}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "startDate",
      header: "Start Date",
      cell: (element: IPlanDetails) => `${element?.startDate}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "lastDeliveryDate",
      header: "Last Delivery Date",
      cell: (element: IPlanDetails) => `${element?.lastDeliveryDate}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
  ];
  nutritionColumns = [
    {
      columnDef: "calories",
      header: "Calories",
      cell: (element: any) => `${element?.calories}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "protein",
      header: "Protein",
      cell: (element: any) => `${element?.protein}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "fats",
      header: "Fats",
      cell: (element: any) => `${element?.fats}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "carb",
      header: "Carb",
      cell: (element: any) => `${element?.carb}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
  ];
  weekColumns = [
    {
      columnDef: "week",
      header: "Weeks",
      cell: (element: any) => `${element?.week}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    ...this.nutritionColumns,
    {
      columnDef: "avarageCalories",
      header: "Average Calories Per Day",
      cell: (element: any) => `${element?.averageCalories}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
  ];
  dayColumns = [
    {
      columnDef: "deliveryDay",
      header: "Delivery Day",
      cell: (element: any) => `${element?.deliveryDay}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "dayName",
      header: "Day Name",
      cell: (element: any) => `${element?.dayName}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "calories",
      header: "Calories",
      cell: (element: any) => `${element?.total?.calories}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "protein",
      header: "Protein",
      cell: (element: any) => `${element?.total?.protein}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "fats",
      header: "Fats",
      cell: (element: any) => `${element?.total?.fats}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "carb",
      header: "Carb",
      cell: (element: any) => `${element?.total?.carb}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
  ];
  mealColumns = [
    {
      columnDef: "calories",
      header: "Calories",
      cell: (element: any) => `${element?.nutrations?.calories}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "protein",
      header: "Protein",
      cell: (element: any) => `${element?.nutrations?.protein}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "fats",
      header: "Fats",
      cell: (element: any) => `${element?.nutrations?.fats}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "carb",
      header: "Carb",
      cell: (element: any) => `${element?.nutrations?.carb}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
  ];
}
