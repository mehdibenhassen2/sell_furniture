import { Component, OnInit } from '@angular/core';
import { SaleService } from './services/sale.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SigninModalComponent } from './components/signin-modal/signin-modal.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { ItemsActions } from './store/features/items/items.actions';
import {
  selectAvailableItems,
  selectItemsLoading,
} from './store/features/items/items.selectors';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    CommonModule,
    SigninModalComponent,
    TopBarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  locations: any[] = [];
  newLocation = '';
  title = 'sell_furniture';
  currentTime = new Date().toLocaleString();

  // Store selectors - only show available items
  items$ = this.store.select(selectAvailableItems);
  loading$ = this.store.select(selectItemsLoading);

  constructor(private saleService: SaleService, private store: Store) {
    console.log('AppComponent constructor called');
  }

  ngOnInit() {
    console.log('AppComponent ngOnInit called');

    // Dispatch action to load items from store
    this.store.dispatch(ItemsActions.loadItems());

    // Load locations
    this.loadLocations();

    // Track visitor
    this.trackVisitor();
  }

  loadLocations() {
    this.saleService.getLocations().subscribe({
      next: (data) => {
        this.locations = data;
      },
      error: (error) => {
        console.error('Error loading locations:', error);
        this.locations = []; // Set empty array on error
      },
    });
  }

  addLocation() {
    if (this.newLocation.trim()) {
      this.saleService.addLocation({ name: this.newLocation }).subscribe({
        next: (loc) => {
          this.locations.push(loc);
          this.newLocation = '';
        },
        error: (error) => {
          console.error('Error adding location:', error);
          // Optionally show a user-friendly error message
        },
      });
    }
  }
  trackVisitor() {
    this.saleService.trackVisitor().subscribe({
      next: () => console.log('Visitor logged ✅'),
      error: (err) => console.error('Error logging visitor ❌', err),
    });
  }

  testClick() {
    alert('Angular is working! Button click detected!');
    console.log('Button clicked! Angular is working!');
  }
}
