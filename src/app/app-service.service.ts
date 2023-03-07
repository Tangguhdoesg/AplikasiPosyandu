import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { map, Observable } from 'rxjs';
import { balita, balitaAddEditRequestBody, userPosyandu, userPosyanduRequestBody } from './models';
import { environment } from 'environment';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  constructor(private httpClient: HttpClient) { }

  getAllUser(): Observable<userPosyandu[]> {
    return this.httpClient.get<userPosyandu[]>(`${environment.urlGateway}/user/all`)
      .pipe(
        map(data => {
          return data;
        })
      );
  }

  addUser(request: userPosyanduRequestBody) {
    return this.httpClient.post<userPosyandu[]>(`${environment.urlGateway}/user`, request)
      .pipe(
        map(data => {
          return data;
        })
      );
  }

  editUser(request: userPosyanduRequestBody, id: number) {
    return this.httpClient.put<userPosyandu[]>(`${environment.urlGateway}/user/${id}`, request)
      .pipe(
        map(data => {
          return data;
        })
      );
  }

  deleteUser(id: number) {
    return this.httpClient.delete(`${environment.urlGateway}/user/${id}`)
      .pipe(
        map(data => {
          return data;
        })
      );
  }
  
  getAllToddler(): Observable<balita[]> {
    return this.httpClient.get<balita[]>(`${environment.urlGateway}/balita/all`)
      .pipe(
        map(data => {
          return data;
        })
      );
  }

  getAllUserToddler(userId: number): Observable<balita[]> {
    return this.httpClient.get<balita[]>(`${environment.urlGateway}/balita/user/${userId}`)
      .pipe(
        map(data => {
          return data;
        })
      );
  }

  getToddler(id: number): Observable<balita> {
    return this.httpClient.get<balita>(`${environment.urlGateway}/balita/${id}`)
      .pipe(
        map(data => {
          return data;
        })
      );
  }

  addToddler(request: balitaAddEditRequestBody) {
    return this.httpClient.post<balita>(`${environment.urlGateway}/balita`, request)
      .pipe(
        map(data => {
          return data;
        })
      );
  }

  editToddler(request: balitaAddEditRequestBody, id: number) {
    return this.httpClient.put<balita>(`${environment.urlGateway}/balita/${id}`, request)
      .pipe(
        map(data => {
          return data;
        })
      );
  }

  deleteToddler(id: number) {
    return this.httpClient.delete(`${environment.urlGateway}/balita/${id}`)
      .pipe(
        map(data => {
          return data;
        })
      );
  }

}
