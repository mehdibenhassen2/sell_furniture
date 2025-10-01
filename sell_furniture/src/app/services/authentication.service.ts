import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  // signal pour gérer l'affichage du modal
  showModal = signal<boolean>(false);

  // signal pour l'état de connexion
  isAuthenticated = signal<boolean>(this.hasToken());

  private apiUrl = 'http://localhost:5000/auth';

  constructor(private http: HttpClient) {}

  // login et sauvegarde du token
  login(username: string, password: string): Observable<any> {
    return this.http.post<{ token: string }>(
      `${this.apiUrl}/login`,
      { username, password },
      { withCredentials: true }
    ).pipe(
      tap((res) => {
        if (res.token) {
          this.setToken(res.token);
        }
      })
    );
  }

  // logout et suppression du token
  logout(): Observable<any> {
    this.clearToken();
    return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true });
  }

  // vérifie la présence du token
  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  // gestion du modal
  openModal() {
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }

  // ---------------------------
  // Helpers pour le token
  // ---------------------------

  private setToken(token: string): void {
    localStorage.setItem('token', token);
    this.isAuthenticated.set(true);
  }

  private clearToken(): void {
    localStorage.removeItem('token');
    this.isAuthenticated.set(false);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}
