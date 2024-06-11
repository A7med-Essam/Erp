import { Directive, EventEmitter, HostListener, Output } from "@angular/core";
import { MatOption } from "@angular/material/core";
import { MatSelect } from "@angular/material/select";

@Directive({
  selector: "[checkSelect]",
  standalone: true,
})
export class CheckSelectDirective {
  constructor(private select: MatSelect) {}
  @Output() statusChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  @HostListener("click") onClick() {
    let newStatus = true;
    this.select.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.statusChanged.emit(newStatus);
  }
}
