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
  modalOpen = false;
  modalImage: any = null;
  zoomLevel = 1;
  Math = Math;
  isDragging = false;
  dragStartX = 0;
  dragStartY = 0;
  translateX = 0;
  translateY = 0;

  ngOnInit() {
    // Display the first picture as the default big one
    if (this.pictures.length > 0) {
      this.selectedPicture = this.pictures[0];
    }
  }

  showPicture(picture: any) {
    this.selectedPicture = picture;
  }

  openModal(picture: any) {
    this.modalImage = picture;
    this.modalOpen = true;
    this.zoomLevel = 1;
    this.translateX = 0;
    this.translateY = 0;
  }

  closeModal() {
    this.modalOpen = false;
    this.modalImage = null;
    this.zoomLevel = 1;
    this.translateX = 0;
    this.translateY = 0;
    this.isDragging = false;
  }

  zoomIn() {
    this.zoomLevel = Math.min(this.zoomLevel + 0.2, 5);
  }

  zoomOut() {
    this.zoomLevel = Math.max(this.zoomLevel - 0.2, 0.3);
  }

  resetZoom() {
    this.zoomLevel = 1;
    this.translateX = 0;
    this.translateY = 0;
  }

  onWheel(event: WheelEvent) {
    event.preventDefault();
    if (event.deltaY < 0) {
      this.zoomIn();
    } else {
      this.zoomOut();
    }
  }

  onMouseDown(event: MouseEvent) {
    if (this.zoomLevel > 1) {
      this.isDragging = true;
      this.dragStartX = event.clientX - this.translateX;
      this.dragStartY = event.clientY - this.translateY;
      event.preventDefault();
    }
  }

  onMouseMove(event: MouseEvent) {
    if (this.isDragging && this.zoomLevel > 1) {
      this.translateX = event.clientX - this.dragStartX;
      this.translateY = event.clientY - this.dragStartY;
    }
  }

  onMouseUp() {
    this.isDragging = false;
  }

  onMouseLeave() {
    this.isDragging = false;
  }
}
