import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  http = inject(HttpClient);

  private apiUrl = environment.apiUrl;

  getProperties(homestatus: string, pageNumber: number, pageSize: number, searchTerm: string |null| undefined){
    let params = new HttpParams;
    if(searchTerm){
      params = params.set('search', searchTerm);
    }
    params = params.set('pageNumber', pageNumber);
    params = params.set('pageSize', pageSize);
    params = params.set('homestatus', homestatus);

    return this.http.get<PropertiesResponse>(`${this.apiUrl}/properties`, {
      params: params
    });
    
  }

  getPropertiesByUser(pageNumber: number, pageSize: number){
    return this.http.get<PropertiesResponse>(`${this.apiUrl}/properties/me`,{
      params: {
        pageNumber: pageNumber,
        pageSize: pageSize
      }
    });
  }

  getProperty(id: number){
    return this.http.get<Properties>(`${this.apiUrl}/properties/${id}`);
  }

}
