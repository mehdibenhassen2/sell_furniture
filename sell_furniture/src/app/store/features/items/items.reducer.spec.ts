import { itemsReducer, initialState } from './items.reducer';
import { ItemsActions } from './items.actions';
import { ItemsModels } from './items.models';

describe('itemsReducer', () => {
  it('should return the initial state', () => {
    const action = { type: 'Unknown' };
    const state = itemsReducer(undefined, action);

    expect(state).toBe(initialState);
  });

  it('should set loading to true on loadItems', () => {
    const action = ItemsActions.loadItems();
    const state = itemsReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should load items on loadItemsSuccess', () => {
    const items: ItemsModels[] = [
      {
        id: 1,
        title: 'Test Item',
        pictures: [],
        description: 'Test description',
        available: true,
      },
    ];
    const action = ItemsActions.loadItemsSuccess({ items });
    const state = itemsReducer(initialState, action);

    expect(state.items).toEqual(items);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
  });

  it('should set error on loadItemsFailure', () => {
    const error = 'Test error';
    const action = ItemsActions.loadItemsFailure({ error });
    const state = itemsReducer(initialState, action);

    expect(state.error).toBe(error);
    expect(state.loading).toBe(false);
  });
});
