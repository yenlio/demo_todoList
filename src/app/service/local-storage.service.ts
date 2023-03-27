import { Injectable } from '@angular/core';
import { TodoModel } from '../model/todo.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {


  storage:Storage

  constructor() {
    this.storage=window.localStorage
  }
  setObject(key:string,value:any):void{
    console.log(key,value,"local");

    if (value!==null){
      return
    }
this.storage[key]=JSON.stringify(value)

  }
  // getValue (key:any):TodoModel[]{
  //  return JSON.parse(localStorage.getItem(key)!);
  // }

  getValue<T>(key:string):T{
    const obj= JSON.parse(this.storage[key] || null);
    return <T>obj;
  }
}
