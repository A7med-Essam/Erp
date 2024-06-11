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
import { IDISLIKE, IDislikeItem } from "src/app/interfaces/dislike.interface";
import { ActionEnum } from "src/app/enums/action.enum";
import { DislikeService } from "src/app/services/dislike.service";
import { DislikeCategoryDialogComponent } from "../dislike-category-dialog/dislike-dialog.component";
import { Subject, takeUntil } from "rxjs";
import { GET_DISLIKE_ITEM_START } from "src/app/store/dislikeStore/dislike-item.action";
import { DislikeItemsDialogComponent } from "../dislike-items-dialog/dislike-items-dialog.component";
import { DislikeItemSelector } from "src/app/store/dislikeStore/dislike-item.selector";
import { DislikeCategoryComponent } from "../dislikes-category/dislikes-category.component";
import { PolicyEnum } from "src/app/enums/dislike.enum";

@Component({
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
  selector: "app-dislike-items",
  templateUrl: "./dislike-items.component.html",
  styleUrls: ["./dislike-items.component.scss"],
})
export class DislikeItemsComponent implements OnInit, OnDestroy {
  Permissions = this._PermissionService.Permissions;
  actions: IActions[] = [
    {
      action: ActionEnum.delete,
      permission: this.Permissions.AutoDislike.Delete,
      icon: "delete",
      label: "Delete Item",
    },
    {
      action: ActionEnum.update,
      permission: this.Permissions.AutoDislike.Edit,
      icon: "edit",
      label: "Edit Item",
    },
  ];
  columns = [
    {
      columnDef: "id",
      header: "ID",
      cell: (element: IDislikeItem) => `${element?.id}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "categoryID",
      header: "Category ID",
      cell: (element: IDislikeItem) => `${element?.categoryID}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "categoryName",
      header: "Category Name",
      cell: (element: IDislikeItem) => `${element?.categoryName}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "forEashQty",
      header: "For Eash Qty",
      cell: (element: IDislikeItem) => `${element?.forEashQty}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "itemID",
      header: "Item ID",
      cell: (element: IDislikeItem) => `${element?.itemID}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "itemName",
      header: "Item Name",
      cell: (element: IDislikeItem) => `${element?.itemName}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "itemUnitID",
      header: "Item Unit ID",
      cell: (element: IDislikeItem) => `${element?.itemUnitID}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "itemUnitName",
      header: "Item Unit Name",
      cell: (element: IDislikeItem) => `${element?.itemUnitName}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "oppsiteForEashQty",
      header: "Oppsite For Eash Qty",
      cell: (element: IDislikeItem) => `${element?.oppsiteForEashQty}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "oppsiteItemID",
      header: "Oppsite Item ID",
      cell: (element: IDislikeItem) => `${element?.oppsiteItemID}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "oppsiteItemName",
      header: "Oppsite Item Name",
      cell: (element: IDislikeItem) => `${element?.oppsiteItemName}`,
      display: true,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "oppsiteItemUNitID",
      header: "Oppsite Item Unit ID",
      cell: (element: IDislikeItem) => `${element?.oppsiteItemUNitID}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "oppsiteItemUNitName",
      header: "Oppsite Item Unit Name",
      cell: (element: IDislikeItem) => `${element?.oppsiteItemUNitName}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "qty",
      header: "Qty",
      cell: (element: IDislikeItem) => `${element?.qty}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "oppsiteQty",
      header: "Oppsite Qty",
      cell: (element: IDislikeItem) => `${element?.oppsiteQty}`,
      display: false,
      type: ColumnTypeEnum.text,
    },
    {
      columnDef: "replacePolicy",
      header: "Replace Policy",
      cell: (element: IDislikeItem) => `${PolicyEnum[Number(element?.replacePolicy)]}`,
      display: true,
      type: ColumnTypeEnum.badge,
    },
  ];
  TABLE_DATA = toSignal(this._Store.select(DislikeItemSelector));
  private unsubscribe$ = new Subject<void>();

  constructor(
    private _Store: Store,
    public dialog: MatDialog,
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
      this._Store.dispatch(GET_DISLIKE_ITEM_START());
    }
  }

  // ================================ DELETE ITEM DIALOG ==============================
  deleteRow(request: IDislikeItem) {
    if (this.Permissions.AutoDislike.Delete) {
      this._DislikeService.DeleteDislikeItem(request.id).subscribe((res) => {
        this._Store.dispatch(GET_DISLIKE_ITEM_START());
      });
    }
  }
  // ================================ UPDATE ITEM DIALOG ==============================
  updateRow(row: IDislikeItem) {
    if (this.Permissions.AutoDislike.Edit) {
      this._dialog
        .open(DislikeItemsDialogComponent, {
          enterAnimationDuration: "100ms",
          exitAnimationDuration: "100ms",
          height: "550px",
          width: "800px",
          data: row,
          disableClose: true,
        })
        .afterClosed()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res: boolean) => {
          if (res) {
            this._Store.dispatch(GET_DISLIKE_ITEM_START());
          }
        });
    }
  }

  openCreateDialog(): void {
    if (this.Permissions.AutoDislike.Create) {
      this.dialog
        .open(DislikeItemsDialogComponent, {
          enterAnimationDuration: "100ms",
          exitAnimationDuration: "100ms",
          height: "550px",
          width: "800px",
          data: null,
          disableClose: true,
        })
        .afterClosed()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res: boolean) => {
          if (res) {
            this._Store.dispatch(GET_DISLIKE_ITEM_START());
          }
        });
    }
  }
}
