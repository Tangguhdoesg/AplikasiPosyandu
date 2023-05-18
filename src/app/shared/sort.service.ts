import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortService {

  constructor() { }


  sort(item: any[], sort: string, by: number) {
    let sortedArray = item.sort((n1, n2) => {
      if (n1[sort] > n2[sort]) {
          return 1*by;
      }
      if (n1[sort] < n2[sort]) {
          return -1*by;
      }
  
      return 0;
    });
    return sortedArray;
  }

}
