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

  search(seachVlaue:string){
    console.log(seachVlaue);
    this.locationService.logSearch(seachVlaue);
  }
}
