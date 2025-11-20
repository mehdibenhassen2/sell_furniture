import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { isDevMode } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore } from '@ngrx/router-store';
import { itemsReducer } from './app/store/features/items/items.reducer';
import { ItemsEffects } from './app/store/features/items/items.effects';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideClientHydration(),
    provideStore({ items: itemsReducer }),
    provideEffects([ItemsEffects]),
    // Only enable devtools in development mode
    ...(isDevMode() ? [provideStoreDevtools({ maxAge: 25 })] : []),
    provideRouterStore(),
  ],
}).catch((err) => console.error(err));
