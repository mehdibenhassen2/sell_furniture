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
  styleUrls: ['./app.component.scss'] // ✅ fixed plural
})
export class AppComponent implements OnInit {
  locations: any[] = [];
  items: any[] = [];
  newLocation = '';
  title = 'sell-furniture';

  constructor(private locationService: LocationService) {
    this.loadLocations();
    this.loadItems();
  }

  ngOnInit() {
    this.loadLocations();
    this.loadItems();
  }

  loadLocations() {
    this.locationService.getLocations().subscribe(data => {
      this.locations = data;
    });
  }

  loadItems() {
    this.locationService.getItems().subscribe(data => {
      this.items = data;
    });
  }

  addLocation() {
    if (this.newLocation.trim()) {
      this.locationService.addLocation({ name: this.newLocation })
        .subscribe(loc => {
          this.locations.push(loc);
          this.newLocation = '';
        });
    }
  }
}
