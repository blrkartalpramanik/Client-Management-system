import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  private baseUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}

  userLogin(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password });
  }


  registerClient( url:any,data:any): Observable<any> {
    return this.http.post(`${this.baseUrl}${url}`,data);
  }

}
