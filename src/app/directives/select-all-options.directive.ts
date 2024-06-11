import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatCheckbox } from "@angular/material/checkbox";
import { MatOption } from "@angular/material/core";
import { MatSelect } from "@angular/material/select";
import { BehaviorSubject, Subject, takeUntil } from "rxjs";

@Directive({
  selector: "[selectAll]",
  standalone: true,
})
export class SelectAllOptionsDirective implements OnInit, OnDestroy {
  allSelected: boolean = false;
  private unsubscribe$ = new Subject<void>();
  @Input() status = new BehaviorSubject<boolean>(false);
  constructor(private select: MatSelect, private host: MatCheckbox) {}
  ngOnInit(): void {
    this.status.pipe(takeUntil(this.unsubscribe$)).subscribe((status) => {
      this.allSelected = status;
      this.host.writeValue(this.allSelected);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  @HostListener("change") onChange() {
    this.allSelected = !this.allSelected;
    if (this.allSelected) {
      this.select.options.forEach((item: MatOption) => item.select());
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());
    }
  }
}
