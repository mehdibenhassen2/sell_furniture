import { Routes } from '@angular/router';
import { ItemsListComponent } from './components/items-list/items-list.component';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { AddNewComponent } from './components/add-new/add-new.component';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'itemsList', pathMatch: 'full' },
  {
    path: 'itemsList',
    loadComponent: () =>
      import('./components/items-list/items-list.component').then(m => m.ItemsListComponent),
  },
  {
    path: 'delivery',
    loadComponent: () =>
      import('./components/delivery/delivery.component').then(m => m.DeliveryComponent),
  },
  {
    path: 'addNew',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./components/add-new/add-new.component').then(m => m.AddNewComponent),
  },
  { path: '**', redirectTo: 'itemsList' },
];
