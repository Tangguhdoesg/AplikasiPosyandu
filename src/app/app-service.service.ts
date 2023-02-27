import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { map } from 'rxjs';
import { userPosyandu } from './models';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  constructor(private httpClient: HttpClient) { }

  getAllUser() {
    return this.httpClient.get<userPosyandu[]>(`http://localhost:8083/user/all`)
      .pipe(
        map(data => {
          return data;
        })
      );
  }
  
}
