import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LocationService } from './services/location.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  implements OnInit {
  locations: any[] = [];
    newLocation = '';
  title = 'sell-funniture';
  ngOnInit() {
    this.loadLocations();
  }
constructor(private locationService: LocationService) {}
  loadLocations() {
    this.locationService.getLocations().subscribe(data => {
      this.locations = data;
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
