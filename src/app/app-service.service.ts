import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { map, Observable } from 'rxjs';
import { userPosyandu, userPosyanduRequestBody } from './models';
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

  deleteUser(id: string) {
    return this.httpClient.delete(`${environment.urlGateway}/user/${id}`)
      .pipe(
        map(data => {
          return data;
        })
      );
  }
  
}
