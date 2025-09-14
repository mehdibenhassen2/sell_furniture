import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Location {
  id?: number;
  name: string;
}
export interface items {
  id: number;
  title: string;
  pictures: [];
  description: string;
  available: boolean;
  instructions?: string;
  url?: string;
  price?: number;
  retail?: number;
  condition?: string;
  category?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SaleService {
  private apiUrl = 'https://sell-furniture-node.onrender.com/api/locations';
  private apiUrlItems = 'https://sell-furniture-node.onrender.com/api/items';
  private apiUrlVisitors = 'https://sell-furniture-node.onrender.com/api/visit';
  private apiUrlSearch = 'https://sell-furniture-node.onrender.com/api/search';
  private apiUrlcount =
    'https://sell-furniture-node.onrender.com/api/totalNumber';

  constructor(private http: HttpClient) {}
  displayedItems = signal<any[]>([]);
  // Get all locations
  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.apiUrl);
  }
  // Get all items
  getItems(): Observable<items[]> {
    return this.http.get<items[]>(this.apiUrlItems);
  }
  getCountItems(): Observable<any> {
    return this.http.get<any>(this.apiUrlcount);
  }

  // Add new location
  addLocation(location: Location): Observable<Location> {
    return this.http.post<Location>(this.apiUrl, location);
  }
  // Add new visitor
  trackVisitor(): Observable<any> {
    // POST an empty object; backend fills timestamp, IP, and userAgent
    return this.http.post<any>(`${this.apiUrlVisitors}`, {});
  }
  // ✅ Search
  // GET: fetch filtered items
  searchItems(query: string): Observable<items[]> {
    return this.http.get<items[]>(
      `${this.apiUrlSearch}?q=${encodeURIComponent(query)}`
    );
  }
}
