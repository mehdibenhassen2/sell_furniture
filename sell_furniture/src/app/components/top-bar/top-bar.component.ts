import { Component, HostListener } from '@angular/core';
import { SaleService } from '../../services/sale.service';
import { AuthenticationService } from '../../services/authentication.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
  mobileMenuOpen = false;

  constructor(public saleService: SaleService, public authenticationService: AuthenticationService) {}

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  displayModalSign() {
    this.mobileMenuOpen = false;
    this.authenticationService.showModal.set(true);
  }
  signOut() {
    this.mobileMenuOpen = false;
    this.authenticationService.logout().subscribe({
      next: () => {
        this.authenticationService.showModal.set(false);
      },
      error: (err) => {
        console.error('Logout failed', err);
        this.authenticationService.showModal.set(false); // still close modal
      }
    });
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    // Skip clicks inside hamburger
    if (target.closest('.hamburger')) return;

    if (
      this.mobileMenuOpen &&
      !target.closest('.nav-links') &&
      window.innerWidth <= 768
    ) {
      this.mobileMenuOpen = false;
    }
  }
}
