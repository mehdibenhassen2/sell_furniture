import { Component, OnInit, signal } from '@angular/core';
import { LocationService, items } from '../../services/location.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PicturesContainerComponent } from './pictures-container/pictures-container.component';
import { DescriptionFormatPipe } from '../../pipes/description-format.pipe';
import { SearchBarComponent } from './search-bar/search-bar.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    PicturesContainerComponent,
    SearchBarComponent,
    DescriptionFormatPipe,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
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

  constructor(private locationService: LocationService) {}

  ngOnInit() {
    this.countItems();
    this.loadItems();
    this.selectAllCategories();
  }

  loadItems() {
    this.loading = true;
    this.locationService.getItems().subscribe({
      next: (data) => {
        this.locationService.displayedItems.set(data);
        this.applyFilters();
        this.loading = false;
      },
      error: () => {
        this.locationService.displayedItems.set([]);
        this.applyFilters();
        this.loading = false;
      },
    });
  }

  searchItems(query: string) {
    this.loading = true;
    this.locationService.searchItems(query).subscribe({
      next: (response) => {
        this.locationService.displayedItems.set(response);
        this.applyFilters();
        this.loading = false;
      },
      error: (err) => {
        console.error('Search error', err);
        this.loading = false;
      },
    });
  }
  countItems() {
    this.locationService.getcountItems().subscribe({
      next: (response) => {
        this.numberItems = response.totalNumber;
      },
      error: (err) => {
        console.error('Search error', err);
      },
    });
  }
  applyFilters() {
    const allItems = this.locationService.displayedItems();

    if (this.selectedCategories.length === 0) {
      this.filteredItems.set([...allItems]);
    } else {
      const filtered = allItems.filter((item) =>
        this.selectedCategories.includes(item.category)
      );
      this.filteredItems.set(filtered);
    }
  }

  onCategoryChange(event: any) {
    const category = event.target.value;
    const checked = event.target.checked;

    if (checked) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories = this.selectedCategories.filter(
        (c) => c !== category
      );
    }
    this.applyFilters();
  }

  selectAllCategories() {
    this.selectedCategories = [...this.categories];
    this.applyFilters();
  }

  addLocation() {
    if (!this.newLocation.trim()) return;

    this.locationService.addLocation({ name: this.newLocation }).subscribe({
      next: (loc) => {
        this.locations.push(loc);
        this.newLocation = '';
      },
      error: (err) => console.error('Add location error', err),
    });
  }
}
