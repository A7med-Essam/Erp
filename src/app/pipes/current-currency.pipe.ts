import { Pipe, PipeTransform } from "@angular/core";
import { CurrencyEnum } from "../enums/currency.enum";
import { AppService } from "../services/app.service";

@Pipe({
  name: "currentCurrency",
  standalone: true,
  pure: true,
})
export class CurrentCurrencyPipe implements PipeTransform {
  constructor(private _AppService: AppService) {}
  transform(value: any): string {
    const currency = this._AppService.CURRENCY.value;

    switch (currency) {
      case CurrencyEnum.eg:
        return value + " EGP";
      case CurrencyEnum.ae:
        return value + " AED";
      case CurrencyEnum.ksa:
        return value + " SAR";
      case CurrencyEnum.usd:
        return value + " USD";
      default:
        return value + " (Unknown Currency)";
    }
  }
}
