import { Component, OnInit, signal, computed, effect } from '@angular/core';
import { SaleService, items } from '../../services/sale.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PicturesContainerComponent } from './pictures-container/pictures-container.component';
import { DescriptionFormatPipe } from '../../pipes/description-format.pipe';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { Store } from '@ngrx/store';
import { ItemsActions } from '../../store/features/items/items.actions';
import {
  selectAllItems,
  selectItemsLoading,
} from '../../store/features/items/items.selectors';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    PicturesContainerComponent,
    SearchBarComponent,
    DescriptionFormatPipe,
    SpinnerComponent,
  ],
  templateUrl: './items-list.component.html',
  styleUrl: './items-list.component.scss',
})
export class ItemsListComponent implements OnInit {
  locations: any[] = [];
  newLocation = '';
  title = 'sale_furniture';
  categories = [
    'Bed',
    'Dresser',
    'Bookshelves & Wardrobe',
    'Technology',
    'Decoration',
    'Table & Chair',
    'Toys',
    'Other',
  ];
  selectedCategories = signal<string[]>([]);
  numberItems: number = 0;

  // Convert store observables to signals
  allItems = toSignal(this.store.select(selectAllItems), { initialValue: [] });
  loading = toSignal(this.store.select(selectItemsLoading), {
    initialValue: true,
  });

  // Computed filtered items based on selected categories
  filteredItems = computed(() => {
    const items = this.allItems();
    const selected = this.selectedCategories();

    if (selected.length === 0) {
      return [];
    }

    return items.filter((item) => selected.includes(item.category || ''));
  });

  constructor(private saleService: SaleService, private store: Store) {
    // Effect to update service displayedItems when allItems changes
    effect(() => {
      const items = this.allItems();
      this.saleService.displayedItems.set(items);
      console.log('Items updated in service:', items.length);
    });
  }

  ngOnInit() {
    console.log('ItemsListComponent initialized');

    // Dispatch action to load items from store
    this.store.dispatch(ItemsActions.loadItems());

    this.countItems();
    this.selectAllCategories();
  }

  searchItems(query: string) {
    this.saleService.searchItems(query).subscribe({
      next: (response) => {
        this.saleService.displayedItems.set(response);
      },
      error: (err) => {
        console.error('Search error', err);
      },
    });
  }

  trackByCategory(_index: number, category: string) {
    return category;
  }

  countItems() {
    this.saleService.getCountItems().subscribe({
      next: (response) => {
        this.numberItems = response.totalNumber;
      },
      error: (err) => {
        console.error('Search error', err);
      },
    });
  }

  areAllSelected(): boolean {
    return this.selectedCategories().length === this.categories.length;
  }

  onCategoryChange(event: any) {
    const category = event.target.value;
    const checked = event.target.checked;
    const current = this.selectedCategories();

    if (checked) {
      this.selectedCategories.set([...current, category]);
    } else {
      this.selectedCategories.set(current.filter((c) => c !== category));
    }
  }

  toggleAllCategories() {
    if (this.areAllSelected()) {
      this.selectedCategories.set([]); // deselect all
    } else {
      this.selectedCategories.set([...this.categories]); // select all
    }
  }

  selectAllCategories() {
    this.selectedCategories.set([...this.categories]);
  }

  addLocation() {
    if (!this.newLocation.trim()) return;

    this.saleService.addLocation({ name: this.newLocation }).subscribe({
      next: (loc) => {
        this.locations.push(loc);
        this.newLocation = '';
      },
      error: (err) => console.error('Add location error', err),
    });
  }
}
