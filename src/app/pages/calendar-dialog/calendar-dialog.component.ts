import { Component, Inject, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { ISubscriptionTableDetails } from "src/app/components/subscription-component/subscription-details/subscription-details.component";

@Component({
  selector: "app-calendar-dialog",
  standalone: true,
  imports: [CommonModule, MatDatepickerModule],
  templateUrl: "./calendar-dialog.component.html",
  styleUrls: ["./calendar-dialog.component.scss"],
})
export class CalendarDialogComponent {
  allowedDates: Date[] = [];

  constructor(
    public dialogRef: MatDialogRef<CalendarDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: ISubscriptionTableDetails[]
  ) {
    this.allowedDates = this.data.map((p) => new Date(p.deliveryDate));
  }

  filterDates = (date: Date | null): boolean => {
    const day = (date || new Date()).getDate();
    const month = (date || new Date()).getMonth();
    const year = (date || new Date()).getFullYear();
    const currentDate = new Date(year, month, day);
    return this.allowedDates.some((allowedDate) =>
      this.isSameDate(allowedDate, currentDate)
    );
  };
  isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }
  onDateSelected(selectedDate: Date | null): void {
    this.dialogRef.close(selectedDate);
  }
}
