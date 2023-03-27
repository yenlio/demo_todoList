import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly todoKey='todos'
  private todoArr=[]

  constructor() {


  }


}
