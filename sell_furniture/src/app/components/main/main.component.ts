import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LocationService } from '../../services/location.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PicturesContainerComponent } from './pictures-container/pictures-container.component';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, PicturesContainerComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  locations: any[] = [];
  items: any[] = [];
  newLocation = '';
  title = 'sell_furniture';
  constructor(private locationService: LocationService) {}
  ngOnInit() {
    console.log('MainComponent ngOnInit called');
this.loadLocations();
 this.loadItems();
  }

  loadLocations() {
    this.locationService.getLocations().subscribe({
      next: (data) => {
        this.locations = data;
      },
      error: (error) => {
        console.error('Error loading locations in MainComponent:', error);
        this.locations = [];
      }
    });
  }

  loadItems() {
    this.locationService.getItems().subscribe({
      next: (data) => {
        this.items = data;
      },
      error: (error) => {
        console.error('Error loading items in MainComponent:', error);
        this.items = [];
      }
    });
  }

  addLocation() {
    if (this.newLocation.trim()) {
      this.locationService
        .addLocation({ name: this.newLocation })
        .subscribe((loc) => {
          this.locations.push(loc);
          this.newLocation = '';
        });
    }
  }
}
