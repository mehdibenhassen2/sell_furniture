import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  // signal pour gérer l'affichage du modal
  showModal = signal<boolean>(false);

  // signal pour l'état de connexion
  isAuthenticated = signal<boolean>(this.hasToken());

  private apiUrl = 'https://sell-furniture-node.onrender.com/auth';


  constructor(private http: HttpClient) {}

  // ✅ Inscription
  register(email: string, password: string, name?: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { email, password, name });
  }

  // ✅ Connexion
  login(email: string, password: string): Observable<any> {
    return this.http.post<{ token: string }>(
      `${this.apiUrl}/login`,
      { email, password },
      { withCredentials: true }
    ).pipe(
      tap((res) => {
        if (res.token) {
          this.setToken(res.token);
        }
      })
    );
  }

  // ✅ Déconnexion
  logout(): Observable<any> {
    this.clearToken();
    return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true });
  }

  // ✅ Vérifier si connecté
  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  // ✅ Récupérer infos utilisateur courant
  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}/me`, { headers });
  }

  // Gestion du modal
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
