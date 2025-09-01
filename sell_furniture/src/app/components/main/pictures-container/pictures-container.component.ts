import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pictures-container',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './pictures-container.component.html',
  styleUrl: './pictures-container.component.scss'
})

export class PicturesContainerComponent {
@Input() pictures: any[] = []
selectedPicture: any;

  ngOnInit() {
    // Display the first picture as the default big one
    if (this.pictures.length > 0) {
      this.selectedPicture = this.pictures[0];
    }
  }

  showPicture(picture: any) {
    this.selectedPicture = picture;
  }
}
