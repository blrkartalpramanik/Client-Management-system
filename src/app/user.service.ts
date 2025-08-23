import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  userLogin(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password });
  }

  gtAll(url: any, token: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.get(`${this.baseUrl}${url}`, { headers });
  }

  registerClient(url: any, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}${url}`, data);
  }

  find(endpoint: string, token: any, params?: any) {
  let httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${token}`
    }),
    params: params 
  };
  return this.http.get(this.baseUrl + endpoint, httpOptions);
}

  getById(endpoint: string, token: any, params?: any) {
  let httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${token}`
    }),
    params: params 
  };
  return this.http.get(this.baseUrl + endpoint, httpOptions);
}



  post(url: any, data: any, token: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.baseUrl}${url}`, data, { headers });
  }

  put(url: any, data: any, token: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.put(`${this.baseUrl}${url}`, data, { headers });
  }


delete(url: string, id: any, token: string) {
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

  return this.http.delete(`${this.baseUrl}${url}/${id}`, { headers });
}


}
