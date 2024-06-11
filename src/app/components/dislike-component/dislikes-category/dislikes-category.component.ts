import { Component, OnDestroy, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialog } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { Store } from "@ngrx/store";
import { FeatherModule } from "angular-feather";
import { TableComponent, IActions } from "src/app/pages/table/table.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { FormsModule } from "@angular/forms";
import { ColumnTypeEnum } from "src/app/enums/columns.enum";
import { PermissionService } from "src/app/services/permission.service";
import { GET_DISLIKE_START } from "src/app/store/dislikeStore/dislike.action";
import { DislikeSelector } from "src/app/store/dislikeStore/dislike.selector";
import { IDISLIKE } from "src/app/interfaces/dislike.interface";
import { ActionEnum } from "src/app/enums/action.enum";
import { DislikeService } from "src/app/services/dislike.service";
import { DislikeCategoryDialogComponent } from "../dislike-category-dialog/dislike-dialog.component";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: "app-dislike-category",
  standalone: true,
  imports: [
    MatTableModule,
    TableComponent,
    MatCardModule,
    FeatherModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    FormsModule,
  ],
  templateUrl: "./dislikes-category.component.html",
  styleUrls: ["./dislikes-category.component.scss"],
})
export class DislikeCategoryComponent implements OnInit, OnDestroy {
  Permissions = this._PermissionService.Permissions;
  actions: IActions[] = [
    {
      action: ActionEnum.delete,
      permission: this.Permissions.AutoDislike.Delete,
      icon: "delete",
      label: "Delete Category",
    },
    {
      action: ActionEnum.update,
      permission: this.Permissions.AutoDislike.Edit,
      icon: "edit",
      label: "Edit Category",
    },
  ];
  columns = [
    {
      columnDef: "dilikeCategoryID",
      header: "ID",
      cell: (element: IDISLIKE) => `${element?.dilikeCategoryID}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "dilikeCategoryName",
      header: "Dislike Category Name",
      cell: (element: IDISLIKE) => `${element?.dilikeCategoryName}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
  ];
  TABLE_DATA = toSignal(this._Store.select(DislikeSelector));
  private unsubscribe$ = new Subject<void>();

  constructor(
    private _Store: Store,
    private _PermissionService: PermissionService,
    public _dialog: MatDialog,
    private _DislikeService: DislikeService
  ) {}

  ngOnInit(): void {
    this.GetData();
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  GetData() {
    if (!this.TABLE_DATA()?.data) {
      this._Store.dispatch(GET_DISLIKE_START());
    }
  }

  // ================================ DELETE ITEM DIALOG ==============================
  deleteRow(request: IDISLIKE) {
    if (this.Permissions.AutoDislike.Delete) {
      this._DislikeService
        .DeleteCategory(request.dilikeCategoryID)
        .subscribe((res) => {
          this._Store.dispatch(GET_DISLIKE_START());
        });
    }
  }
  // ================================ UPDATE ITEM DIALOG ==============================
  updateRow(row: IDISLIKE) {
    if (this.Permissions.AutoDislike.Edit) {
      this._dialog
        .open(DislikeCategoryDialogComponent, {
          enterAnimationDuration: "100ms",
          exitAnimationDuration: "100ms",
          height: "250px",
          width: "800px",
          data: row,
          disableClose: true,
        })
        .afterClosed()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res: boolean) => {
          if (res) {
            this._Store.dispatch(GET_DISLIKE_START());
          }
        });
    }
  }

  openCreateDialog(): void {
    if (this.Permissions.AutoDislike.Create) {
      this._dialog
        .open(DislikeCategoryDialogComponent, {
          enterAnimationDuration: "100ms",
          exitAnimationDuration: "100ms",
          height: "250px",
          width: "800px",
          data: null,
          disableClose: true,
        })
        .afterClosed()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res: boolean) => {
          if (res) {
            this._Store.dispatch(GET_DISLIKE_START());
          }
        });
    }
  }
}
