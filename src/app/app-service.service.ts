import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { map, Observable } from 'rxjs';
import { balita, balitaAddEditRequestBody, checkup, checkupAddEditRequestBody, downloadExcelRequestBody, healthInfoGraph, imunisasi, imunisasiAddEditRequestBody, kegiatan, kegiatanAddEditRequestBody, loginRequestBody, sendExcelRequestBody, userPosyandu, userPosyanduRequestBody } from './models';
import { environment } from 'environment';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  constructor(private httpClient: HttpClient) { }

  login(request: loginRequestBody): Observable<userPosyandu> {
    return this.httpClient.post<userPosyandu>(`${environment.urlGateway}/user/login`, request)
      .pipe(
        map(data => {
          return data;
        })
      );
  }

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

  editUser(request: userPosyanduRequestBody, id: any) {
    return this.httpClient.put<userPosyandu>(`${environment.urlGateway}/user/${id}`, request)
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

  getAllUserToddler(userId: any): Observable<balita[]> {
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

  getAllCheckup(): Observable<checkup[]> {
    return this.httpClient.get<checkup[]>(`${environment.urlGateway}/checkup/all`)
      .pipe(
        map(data => {
          return data;
        })
      );
  }

  getAllUserCheckup(id: any): Observable<checkup[]> {
    return this.httpClient.get<checkup[]>(`${environment.urlGateway}/checkup/user/${id}`)
      .pipe(
        map(data => {
          return data;
        })
      );
  }

  addCheckup(request: checkupAddEditRequestBody) {
    return this.httpClient.post<checkup>(`${environment.urlGateway}/checkup`, request)
      .pipe(
        map(data => {
          return data;
        })
      );
  }

  editCheckup(request: checkupAddEditRequestBody, id: number) {
    return this.httpClient.put<checkup>(`${environment.urlGateway}/checkup/${id}`, request)
      .pipe(
        map(data => {
          return data;
        })
      );
  }

  deleteCheckup(id: number) {
    return this.httpClient.delete(`${environment.urlGateway}/checkup/${id}`)
      .pipe(
        map(data => {
          return data;
        })
      );
  }

  
  getAllImunisasi(): Observable<imunisasi[]> {
    return this.httpClient.get<imunisasi[]>(`${environment.urlGateway}/imunisasi/all`)
      .pipe(
        map(data => {
          return data;
        })
      );
  }

  getAllUserImunisasi(id: any): Observable<imunisasi[]> {
    return this.httpClient.get<imunisasi[]>(`${environment.urlGateway}/imunisasi/balita/${id}`)
      .pipe(
        map(data => {
          return data;
        })
      );
  }

  addImunisasi(request: imunisasiAddEditRequestBody) {
    return this.httpClient.post<imunisasi>(`${environment.urlGateway}/imunisasi`, request)
      .pipe(
        map(data => {
          return data;
        })
      );
  }

  editImunisasi(request: imunisasiAddEditRequestBody, id: number) {
    return this.httpClient.put<imunisasi>(`${environment.urlGateway}/imunisasi/${id}`, request)
      .pipe(
        map(data => {
          return data;
        })
      );
  }

  deleteImunisasi(id: number) {
    return this.httpClient.delete(`${environment.urlGateway}/imunisasi/${id}`)
      .pipe(
        map(data => {
          return data;
        })
      );
  }
  
  getAllActivity(): Observable<kegiatan[]> {
    return this.httpClient.get<kegiatan[]>(`${environment.urlGateway}/kegiatan/all`)
      .pipe(
        map(data => {
          return data;
        })
      );
  }

  // getActivity(id: number): Observable<kegiatan> {
  //   return this.httpClient.get<kegiatan>(`${environment.urlGateway}/kegiatan/balita/${id}`)
  //     .pipe(
  //       map(data => {
  //         return data;
  //       })
  //     );
  // }

  addActivity(request: FormData) {
    return this.httpClient.post<kegiatan>(`${environment.urlGateway}/kegiatan`, request)
      .pipe(
        map(data => {
          return data;
        })
      );
  }

  editActivity(request: FormData, id: number) {
    return this.httpClient.put<kegiatan>(`${environment.urlGateway}/kegiatan/${id}`, request)
      .pipe(
        map(data => {
          return data;
        })
      );
  }

  deleteActivity(id: number) {
    return this.httpClient.delete(`${environment.urlGateway}/kegiatan/${id}`)
      .pipe(
        map(data => {
          return data;
        })
      );
  }

  getAllUserGraph(id: any): Observable<healthInfoGraph[]> {
    return this.httpClient.get<healthInfoGraph[]>(`${environment.urlGateway}/checkup/graph/balita/${id}`)
      .pipe(
        map(data => {
          return data;
        })
      );
  }

  getExcelCheckup(request: downloadExcelRequestBody) {
    return this.httpClient.post(`${environment.urlGateway}/report/excelCheckup`, request,
    {observe:'response', responseType:'blob'})
      // .pipe(
      //   map(data => {
      //     return data;
      //   })
      // );
  }

  getExcelImunisasi(request: downloadExcelRequestBody) {
    return this.httpClient.post(`${environment.urlGateway}/report/excelImunisasi`, request,
      {observe:'response', responseType:'blob'})
//       .pipe(
//         map(data => {
//           return data;
//         })
//       );
  }

  sendReport(request: sendExcelRequestBody): Observable<any> {
    return this.httpClient.post<any>(`${environment.urlGateway}/report/send`, request)
      .pipe(
        map(data => {
          return data;
        })
      );
  }

}
