import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  storage:Storage

  constructor() {
    this.storage=window.localStorage
  }
  setObject(key:string,value:any):void{
    if (!value){
      return
    }

    // getValue<T extends object>(key: string) {
    //   const obj = JSON.parse(this.storage[key] || null);
    //   return <T>obj || null;
    // }
  }

}
