import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "percentage",
  standalone:true
})
export class PercentagePipe implements PipeTransform {
  transform(value: number): string {
    const percentage = (value * 100).toFixed(0);
    return percentage + '%';
  }
}
