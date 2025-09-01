import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LocationService } from './services/location.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, MainComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'], // ✅ fixed plural
})
export class AppComponent implements OnInit {
  locations: any[] = [];
  items: any[] = [];
  newLocation = '';
  title = 'sell_furniture';
  currentTime = new Date().toLocaleString();

  constructor(private locationService: LocationService) {
    // Temporarily disable service calls to test if app loads
    // this.loadLocations();
    // this.loadItems();
  }

  ngOnInit() {
    // Temporarily disable service calls to test if app loads
    // this.loadLocations();
    // this.loadItems();
  }

  loadLocations() {
    this.locationService.getLocations().subscribe({
      next: (data) => {
        this.locations = data;
      },
      error: (error) => {
        console.error('Error loading locations:', error);
        this.locations = []; // Set empty array on error
      }
    });
  }

  loadItems() {
    this.locationService.getItems().subscribe({
      next: (data) => {
        this.items = data;
      },
      error: (error) => {
        console.error('Error loading items:', error);
        this.items = []; // Set empty array on error
      }
    });
  }

  addLocation() {
    if (this.newLocation.trim()) {
      this.locationService
        .addLocation({ name: this.newLocation })
        .subscribe({
          next: (loc) => {
            this.locations.push(loc);
            this.newLocation = '';
          },
          error: (error) => {
            console.error('Error adding location:', error);
            // Optionally show a user-friendly error message
          }
        });
    }
  }
}
