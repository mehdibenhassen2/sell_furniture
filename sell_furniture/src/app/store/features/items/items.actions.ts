import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ItemsModels } from './items.models';

export const ItemsActions = createActionGroup({
  source: 'Items',
  events: {
    'Load Items': emptyProps(),
    'Load Items Success': props<{ items: ItemsModels[] }>(),
    'Load Items Failure': props<{ error: string }>(),
  },
});
