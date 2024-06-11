import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AppService } from "./services/app.service";
import { CurrencyEnum } from "./enums/currency.enum";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "Low Calories";
  public displayLockWifi$: BehaviorSubject<boolean>;
  constructor(private _AppService: AppService) {
    this.displayLockWifi$ = this._AppService.lockWifi$;
    const country = window.location.href.split("dashboard.")[1].split(".")[0];
    switch (country) {
      case "eg":
        this._AppService.CURRENCY.next(CurrencyEnum.eg);
        this._AppService.COUNTRY.next("eg");
        break;
      case "ae":
      case "chef":
        this._AppService.CURRENCY.next(CurrencyEnum.ae);
        this._AppService.COUNTRY.next("ae");
        break;
      case "ksa":
        this._AppService.CURRENCY.next(CurrencyEnum.ksa);
        this._AppService.COUNTRY.next("ksa");
        break;
      default:
        this._AppService.CURRENCY.next(CurrencyEnum.usd);
        this._AppService.COUNTRY.next("test");
        break;
    }
  }
}
