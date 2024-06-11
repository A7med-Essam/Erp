import { Component, Inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { FeatherModule } from "angular-feather";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { InvoiceService } from "src/app/services/invoice.service";
import { InvoiceLog } from "src/app/interfaces/log.interface";
import { InvoiceDetails } from "src/app/interfaces/invoice.interface";

@Component({
  selector: "app-invoice-details",
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, FeatherModule],
  templateUrl: "./invoice-details.component.html",
  styleUrls: ["./invoice-details.component.scss"],
})
export class InvoiceDetailsComponent {
  constructor(
    private _DialogRef: MatDialogRef<InvoiceDetailsComponent>,
    private _InvoiceService: InvoiceService,
    @Inject(MAT_DIALOG_DATA) private data: InvoiceLog
  ) {
    this.getData();
  }

  closeModal() {
    this._DialogRef.close();
  }

  invoice: InvoiceDetails | undefined;
  getData() {
    this._InvoiceService
      .GetInvoiceDetails(this.data.invoiceNumber)
      .subscribe((res) => {
        this.invoice = res.data;
      });
  }
}
