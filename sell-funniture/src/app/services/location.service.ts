import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Location {
  id?: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrl = 'https://sell-furniture-node.onrender.com/api/locations'; // ✅ backend URL

  constructor(private http: HttpClient) {}

  // Get all locations
  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.apiUrl);
  }

  // Add new location
  addLocation(location: Location): Observable<Location> {
    return this.http.post<Location>(this.apiUrl, location);
  }
}
