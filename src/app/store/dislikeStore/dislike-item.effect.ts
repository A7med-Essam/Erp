import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, of, catchError } from "rxjs";
import * as fromActions from "./dislike-item.action";
import { DislikeService } from "src/app/services/dislike.service";

@Injectable()
export class DislikeItemEffect {
  constructor(
    private actions$: Actions,
    private _DislikeService: DislikeService
  ) {}

  Effect = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.GET_DISLIKE_ITEM_START),
      exhaustMap((action) =>
        this._DislikeService.GetDislikeItem().pipe(
          map((res) =>
            fromActions.GET_DISLIKE_ITEM_SUCCESS({ data: res })
          ),
          catchError((error: HttpErrorResponse) =>
            of(fromActions.GET_DISLIKE_ITEM_FAILED({ error: error }))
          )
        )
      )
    )
  );
}
