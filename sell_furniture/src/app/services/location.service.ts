import { Injectable } from '@angular/core';
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
}

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private apiUrl = 'https://sell-furniture-node.onrender.com/api/locations'; // ✅ backend URL
  private apiUrlItems = 'https://sell-furniture-node.onrender.com/api/items'; // ✅ backend URL
  private apiUrlVisitors = 'https://sell-furniture-node.onrender.com/api/visit'; // ✅ backend URL

  constructor(private http: HttpClient) {}

  // Get all locations
  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.apiUrl);
  }
  // Get all items
  getItems(): Observable<items[]> {
    return this.http.get<items[]>(this.apiUrlItems);
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
}
