import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocationService } from '../../../services/location.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  searchText: string="";
  constructor(private locationService: LocationService) {}

  search(searchValue: string) {
    console.log(searchValue);
    // Add .subscribe() to actually execute the HTTP request
    this.locationService.logSearch(searchValue).subscribe({
      next: (response) => {
        console.log('Search logged successfully', response);
      },
      error: (error) => {
        console.error('Error logging search', error);
      }
    });
  }
}
