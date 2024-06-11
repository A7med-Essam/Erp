import { Component, Inject, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatDatepickerModule } from "@angular/material/datepicker";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { SelectSearchDirective } from "src/app/directives/select-search.directive";
import { IDislikeItem } from "src/app/interfaces/dislike.interface";
import { DislikeService } from "src/app/services/dislike.service";
import { PolicyEnum } from "src/app/enums/dislike.enum";
import { DislikeSelector } from "src/app/store/dislikeStore/dislike.selector";
import { toSignal } from "@angular/core/rxjs-interop";
import { Store } from "@ngrx/store";
import { ItemsDialogComponent } from "../../actions/items-dialog/items-dialog.component";
import { Subject, takeUntil } from "rxjs";
import { IMealItem } from "src/app/interfaces/meals.interface";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBar } from "@angular/material/snack-bar";
import { snackBarConfig } from "src/app/models/MatSnackBarConfig";

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSelectModule,
    SelectSearchDirective,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
  ],
  selector: "app-dislike-items-dialog",
  templateUrl: "./dislike-items-dialog.component.html",
  styleUrls: ["./dislike-items-dialog.component.scss"],
})
export class DislikeItemsDialogComponent implements OnDestroy {
  private unsubscribe$ = new Subject<void>();
  dislikeCategories = toSignal(this._Store.select(DislikeSelector));
  public get Policy(): string[] {
    return Object.keys(PolicyEnum).filter((key) => isNaN(+key));
  }
  dialogForm = this._FormBuilder.group({
    id: [this.data?.id],
    categoryID: [this.data?.categoryID, Validators.required],
    itemID: [this.data?.itemID, Validators.required],
    itemName: [this.data?.itemName, Validators.required],
    oppsiteItemID: [this.data?.oppsiteItemID, Validators.required],
    oppsiteItemName: [this.data?.oppsiteItemName, Validators.required],
    itemUnitID: [this.data?.itemUnitID, Validators.required],
    oppsiteItemUNitID: [this.data?.oppsiteItemUNitID, Validators.required],
    itemUnitName: [
      { value: this.data?.itemUnitName, disabled: true },
      Validators.required,
    ],
    oppsiteItemUNitName: [
      { value: this.data?.oppsiteItemUNitName, disabled: true },
      Validators.required,
    ],
    qty: [this.data?.qty, Validators.required],
    oppsiteQty: [this.data?.oppsiteQty, Validators.required],
    forEashQty: [this.data?.forEashQty, Validators.required],
    oppsiteForEashQty: [this.data?.oppsiteForEashQty, Validators.required],
    replacePolicy: [this.data?.replacePolicy.toString(), Validators.required],
  });
  constructor(
    public _dialogRef: MatDialogRef<DislikeItemsDialogComponent>,
    private _FormBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: IDislikeItem,
    private _DislikeService: DislikeService,
    private _Store: Store,
    public _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.listenOnPolicyChange();
    this.dialogForm.patchValue({
      replacePolicy: this.data?.replacePolicy.toString() || "0",
    });
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      if (this.dialogForm.value.itemID == this.dialogForm.value.oppsiteItemID) {
        this.dialogForm.get("oppsiteItemID")?.setErrors({ notEqual: true });
        this._snackBar.open("Items can't be same", "❌", snackBarConfig);
      } else {
        if (!this.dialogForm.value.id) {
          delete this.dialogForm.value.id;
        }
        form.value.replacePolicy = parseInt(form.value.replacePolicy);
        this._DislikeService.AddEditDislikeItem(form.value).subscribe({
          next: (res) => {
            this._dialogRef.close(true);
          },
        });
      }
    }
  }

  openItemDialog(): void {
    this._dialog
      .open(ItemsDialogComponent, {
        enterAnimationDuration: "100ms",
        exitAnimationDuration: "100ms",
        height: "600px",
        width: "1200px",
      })
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: IMealItem) => {
        if (res) {
          this.dialogForm.patchValue({
            itemID: res.id,
            itemName: res.itemEnName,
            itemUnitID: res.unitId,
            itemUnitName: res.unitName,
          });
        }
      });
  }
  openItemDialog2(): void {
    this._dialog
      .open(ItemsDialogComponent, {
        enterAnimationDuration: "100ms",
        exitAnimationDuration: "100ms",
        height: "600px",
        width: "1200px",
      })
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: IMealItem) => {
        if (res) {
          this.dialogForm.patchValue({
            oppsiteItemID: res.id,
            oppsiteItemName: res.itemEnName,
            oppsiteItemUNitID: res.unitId,
            oppsiteItemUNitName: res.unitName,
          });
        }
      });
  }

  listenOnPolicyChange() {
    this.dialogForm.controls["replacePolicy"].valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((Policy) => {
        switch (Number(Policy)) {
          case PolicyEnum["Regular Policy"]:
            this.dialogForm.get("qty")?.disable();
            this.dialogForm.get("oppsiteQty")?.disable();
            this.dialogForm.get("forEashQty")?.disable();
            this.dialogForm.get("oppsiteForEashQty")?.disable();
            break;
          case PolicyEnum["Spisific Qty Policy"]:
            this.dialogForm.get("qty")?.enable();
            this.dialogForm.get("oppsiteQty")?.enable();
            this.dialogForm.get("forEashQty")?.disable();
            this.dialogForm.get("oppsiteForEashQty")?.disable();
            break;
          case PolicyEnum["Equational Policy"]:
            this.dialogForm.get("qty")?.disable();
            this.dialogForm.get("oppsiteQty")?.disable();
            this.dialogForm.get("forEashQty")?.enable();
            this.dialogForm.get("oppsiteForEashQty")?.enable();
            break;
          case PolicyEnum["Manual Policy"]:
            this.dialogForm.get("qty")?.disable();
            this.dialogForm.get("oppsiteQty")?.disable();
            this.dialogForm.get("forEashQty")?.disable();
            this.dialogForm.get("oppsiteForEashQty")?.disable();
            break;
        }
      });
  }
}
