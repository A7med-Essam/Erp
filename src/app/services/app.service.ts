import { Injectable, signal } from "@angular/core";
import { OnlineStatusService, OnlineStatusType } from "ngx-online-status";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AppService {
  CURRENCY = new BehaviorSubject<string>("");
  COUNTRY = new BehaviorSubject<string>("");
  constructor(private onlineStatusService: OnlineStatusService) {
    this.onlineStatusService.status.subscribe((status: OnlineStatusType) => {
      this.handleDisconnect(Boolean(!status));
    });
  }
  private handleDisconnect(status: boolean) {
    this.lockWifi$.next(status);
  }

  public lockWifi$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  downloadBase64File(base64String: string) {
    var a = document.createElement("a");
    a.href = base64String;
    a.download = this.generateRandomChars(8);
    a.click();
  }

  generateRandomChars(length: number) {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars.charAt(randomIndex);
    }
    return result;
  }
}
