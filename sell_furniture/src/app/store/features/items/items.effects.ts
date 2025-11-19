import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { SaleService } from '../../../services/sale.service';
import { ItemsActions } from './items.actions';

@Injectable()
export class ItemsEffects {
  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemsActions.loadItems),
      switchMap(() => {
        console.log('🔄 Loading items from API...');
        return this.saleService.getItems().pipe(
          map((items) => {
            console.log('✅ Items loaded successfully:', items.length, 'items');
            return ItemsActions.loadItemsSuccess({ items });
          }),
          catchError((error) => {
            console.error('❌ Error loading items:', error);
            return of(ItemsActions.loadItemsFailure({ error: error.message }));
          })
        );
      })
    )
  );

  constructor(private actions$: Actions, private saleService: SaleService) {
    console.log('ItemsEffects initialized');
  }
}
