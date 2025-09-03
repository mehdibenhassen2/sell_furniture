import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LocationService } from '../../services/location.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PicturesContainerComponent } from './pictures-container/pictures-container.component';
import { DescriptionFormatPipe } from '../../pipes/description-format.pipe';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    PicturesContainerComponent,
    DescriptionFormatPipe
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  locations: any[] = [];
  items: any[] = [];
  newLocation = '';
  title = 'sell_furniture';
  categories = ['Bed', 'Dresser', 'Technology', 'Decoration', 'Chair', 'Toys','Other'];
  selectedCategories: string[] = [];
  filteredItems: any[] = [];

  constructor(private locationService: LocationService) {}

  ngOnInit() {
    this.loadLocations();
    this.loadItems();
    this.selectAllCategories(); // Fixed typo in method name
  }

  loadLocations() {
    this.locationService.getLocations().subscribe({
      next: (data) => {
        this.locations = data;
      },
      error: (error) => {
        console.error('Error loading locations:', error);
        this.locations = [];
      }
    });
  }

  loadItems() {
    this.locationService.getItems().subscribe({
      next: (data) => {
        this.items = data;
        this.applyFilters(); // Apply filters after items load
      },
      error: (error) => {
        console.error('Error loading items:', error);
        this.items = [];
        this.applyFilters();
      }
    });
  }

  addLocation() {
    if (this.newLocation.trim()) {
      this.locationService.addLocation({ name: this.newLocation }).subscribe({
        next: (loc) => {
          this.locations.push(loc);
          this.newLocation = '';
        },
        error: (error) => {
          console.error('Error adding location:', error);
        }
      });
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

  applyFilters() {
    if (this.selectedCategories.length === 0) {
      this.filteredItems = [...this.items]; // Use spread operator to create new reference
    } else {
      this.filteredItems = this.items.filter((item) =>
        this.selectedCategories.includes(item.category)
      );
    }
  }

  selectAllCategories() { // Fixed method name typo
    this.selectedCategories = [...this.categories];
    this.applyFilters();
  }
}