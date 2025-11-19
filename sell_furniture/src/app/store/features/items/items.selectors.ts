import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ItemsState } from './items.reducer';

export const selectItemsState = createFeatureSelector<ItemsState>('items');

export const selectAllItems = createSelector(
  selectItemsState,
  (state) => state.items
);

export const selectItemsLoading = createSelector(
  selectItemsState,
  (state) => state.loading
);

export const selectItemsError = createSelector(
  selectItemsState,
  (state) => state.error
);

export const selectItemsByCategory = (category: string) =>
  createSelector(selectAllItems, (items) =>
    items.filter((item) => item.category === category)
  );

export const selectAvailableItems = createSelector(selectAllItems, (items) =>
  items.filter((item) => item.available)
);
