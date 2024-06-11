import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DemoFlexyModule } from "../demo-flexy-module";
import { DashboardComponent } from "./dashboard.component";
import { SalesComponent } from "./dashboard-components/sales/sales.component";
import { ActivityComponent } from "./dashboard-components/activity/activity.component";
import { FormsModule } from "@angular/forms";
import { NgApexchartsModule } from "ng-apexcharts";
import { CustomerService } from "../services/customer.service";
import { SubCountComponent } from "./dashboard-components/sub-count/sub-count.component";
import { PaymentComponent } from "./dashboard-components/payment/payment.component";
import { ExpiredComponent } from "./dashboard-components/expired/expired.component";
import { MonthlySalesComponent } from "./dashboard-components/monthly-sales/monthly-sales.component";

@NgModule({
  declarations: [DashboardComponent, SalesComponent, ActivityComponent],
  imports: [
    CommonModule,
    DemoFlexyModule,
    FormsModule,
    NgApexchartsModule,
    SubCountComponent,
    PaymentComponent,
    ExpiredComponent,
    MonthlySalesComponent
  ],
  exports: [DashboardComponent, SalesComponent, ActivityComponent],
  providers: [CustomerService],
})
export class DashboardModule {}
