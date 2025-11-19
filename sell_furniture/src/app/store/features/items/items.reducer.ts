import { createReducer, on } from '@ngrx/store';
import { ItemsActions } from './items.actions';
import { ItemsModels } from './items.models';

export interface ItemsState {
  items: ItemsModels[];
  loading: boolean;
  error: string | null;
}

export const initialState: ItemsState = {
  items: [],
  loading: false,
  error: null,
};

export const itemsReducer = createReducer(
  initialState,
  on(ItemsActions.loadItems, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ItemsActions.loadItemsSuccess, (state, { items }) => ({
    ...state,
    items,
    loading: false,
    error: null,
  })),
  on(ItemsActions.loadItemsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
