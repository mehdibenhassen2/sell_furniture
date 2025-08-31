import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LocationService } from '../../services/location.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  locations: any[] = [];
  items: any[] = [];
  newLocation = '';
  title = 'sell-furniture';
constructor(private locationService: LocationService){}
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
