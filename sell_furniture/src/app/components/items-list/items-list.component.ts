import { Component, OnInit, signal } from '@angular/core';
import { SaleService, items } from '../../services/sale.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PicturesContainerComponent } from './pictures-container/pictures-container.component';
import { DescriptionFormatPipe } from '../../pipes/description-format.pipe';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SpinnerComponent } from './spinner/spinner.component';

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
  selectedCategories: string[] = [];
  numberItems: number = 0;
  filteredItems = signal<items[]>([]);
  loading: boolean = true;

  constructor(private saleService: SaleService) {}

  ngOnInit() {
    this.countItems();
    this.loadItems();
    this.selectAllCategories();
  }

  loadItems() {
    this.loading = true;
    this.saleService.getItems().subscribe({
      next: (data) => {
        this.saleService.displayedItems.set(data);
        this.applyFilters();
        this.loading = false;
      },
      error: () => {
        this.saleService.displayedItems.set([]);
        this.applyFilters();
        this.loading = false;
      },
    });
  }

  searchItems(query: string) {
    this.loading = true;
    this.saleService.searchItems(query).subscribe({
      next: (response) => {
        this.saleService.displayedItems.set(response);
        this.applyFilters();
        this.loading = false;
      },
      error: (err) => {
        console.error('Search error', err);
        this.loading = false;
      },
    });
  }
  trackByCategory(index: number, category: string) {
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
  applyFilters() {
    const allItems = this.saleService.displayedItems();

    if (this.selectedCategories.length === 0) {
      // No categories selected → show nothing
      this.filteredItems.set([]);
    } else {
      const filtered = allItems.filter((item) =>
        this.selectedCategories.includes(item.category)
      );
      this.filteredItems.set(filtered);
    }
  }

  areAllSelected(): boolean {
    return this.selectedCategories.length === this.categories.length;
  }

  onCategoryChange(event: any) {
    const category = event.target.value;
    const checked = event.target.checked;

    if (checked) {
      this.selectedCategories = [...this.selectedCategories, category];
    } else {
      this.selectedCategories = this.selectedCategories.filter(
        (c) => c !== category
      );
    }
    this.applyFilters();
  }

  toggleAllCategories() {
    if (this.areAllSelected()) {
      this.selectedCategories = []; // deselect all
    } else {
      this.selectedCategories = [...this.categories]; // select all
    }
    this.applyFilters();
  }

  selectAllCategories() {
    this.selectedCategories = [...this.categories];
    this.applyFilters();
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
