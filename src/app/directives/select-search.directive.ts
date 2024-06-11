/* eslint-disable no-underscore-dangle */
import { FocusMonitor } from "@angular/cdk/a11y";
import {
  Directive,
  ElementRef,
  Host,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { MatOption } from "@angular/material/core";
import { MatSelect } from "@angular/material/select";
import { filter, Subject, takeUntil } from "rxjs";

@Directive({
  selector: "[appSelectSearch]",
  standalone: true,
})
export class SelectSearchDirective implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  @Input() searchList: any[] = [];
  @Input() filterKeys: string[] = [];
  
  @Input() filterFn = (option: MatOption<any>, inputValue: string) => {
    return !option.viewValue?.toLowerCase().includes(inputValue?.toLowerCase());
  };

  get inputElement(): HTMLInputElement {
    return this.hostElRef.nativeElement as HTMLInputElement;
  }

  constructor(
    private hostElRef: ElementRef,
    private focusMonitor: FocusMonitor,
    private select: MatSelect
  ) {}

  @HostListener("input")
  onInput() {
    this.select.options.forEach((option) => {
      const isFiltered = this.filterFn(option, this.inputElement.value);

      option.disabled = isFiltered;
      option._getHostElement().toggleAttribute("hidden", isFiltered);
    });
  }

  @HostListener("keydown.space", ["$event"])
  stopSpaceKeyDownPropagation(event: KeyboardEvent) {
    event.stopPropagation();
  }

  ngOnInit(): void {
    this.select.openedChange
      .pipe(takeUntil(this.destroy$))
      .subscribe((isOpened) => {
        if (isOpened) {
          this.focusMonitor.focusVia(this.inputElement, "keyboard");
        } else {
          this.inputElement.value = "";
          this.inputElement.dispatchEvent(new Event("input"));
        }
      });

    this.select.optionSelectionChanges
      .pipe(
        filter((e) => e.isUserInput),
        takeUntil(this.destroy$)
      )
      .subscribe((e) => {
        this.inputElement.select();
      });
  }

  filterList(searchInput: string) {
    this.searchList.forEach((item) => {
      let isFiltered = false;
      for (const key of this.filterKeys) {
        const value = item[key]?.toLowerCase();
        if (value && !value.includes(searchInput)) {
          isFiltered = true;
          break;
        }
      }
      const option = this.select.options.find(option => option.value === item);
      if (option) {
        option.disabled = isFiltered;
        option._getHostElement().toggleAttribute("hidden", isFiltered);
      }
    });
  }

  resetFilter() {
    this.searchList.forEach((item) => {
      const option = this.select.options.find(option => option.value === item);
      if (option) {
        option.disabled = false;
        option._getHostElement().removeAttribute("hidden");
      }
    });
    this.hostElRef.nativeElement.value = "";
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
