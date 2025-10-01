import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SaleService } from '../../../services/sale.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  searchText: string = '';
  @Output() searchEvent = new EventEmitter<string>();
  constructor(private saleService: SaleService) {}

  onSearch(searchValue: string) {
    this.searchEvent.emit(this.searchText);

    this.saleService.searchItems(searchValue).subscribe({
      next: (response) => {
        console.log('Search logged successfully', response);
        this.saleService.displayedItems.set(response);
      },
      error: (error) => {
        console.error('Error logging search', error);
      },
    });
  }
}
