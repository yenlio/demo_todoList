import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { fromEvent, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  getData(): Observable<any> {
    return this.http.get<any>(`https://jsonplaceholder.typicode.com/todos`)
  }
}
