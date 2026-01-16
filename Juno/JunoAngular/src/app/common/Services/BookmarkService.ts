import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  toggleBookmark(Propertyid: number){
    return this.http.post(`${this.apiUrl}/properties/${Propertyid}/toggle-bookmark`, {});
  }

  getUserBookmarks(pageNumber: number, pageSize: number){
    return this.http.get<PropertiesResponse>(`${this.apiUrl}/properties/bookmarks`, {
      params: {
        pageNumber: pageNumber,
        pageSize: pageSize
      }
    });
  }

}
