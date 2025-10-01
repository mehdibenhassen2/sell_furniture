import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-signin-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signin-modal.component.html',
  styleUrls: ['./signin-modal.component.scss']
})
export class SigninModalComponent {
  username = '';
  password = '';

  constructor(public authenticationService: AuthenticationService) {}

  close() {
    this.authenticationService.closeModal();
  }

  submit() {
    this.authenticationService.login(this.username, this.password).subscribe({
      next: (res) => {
        console.log('Login réussi', res);
        this.authenticationService.closeModal();
      },
      error: (err) => {
        console.error('Erreur login', err);
        alert('Identifiants invalides');
      }
    });
  }
}
