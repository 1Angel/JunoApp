import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  http = inject(HttpClient);

  private apiUrl = environment.apiUrl;

  getProperties(homestatus: string, pageNumber: number | undefined, pageSize: number){
    return this.http.get<PropertiesResponse>(`${this.apiUrl}/properties`, {
      params: {
        homestatus: homestatus,
        pageNumber: pageNumber!,
        pageSize: pageSize
    }});
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
