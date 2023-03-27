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

    if (value==null){
      return
    }

   localStorage.setItem(key,JSON.stringify(value));
    console.log(
      localStorage.getItem(key),'du lieu kiem tra'

  )
  }
  // getValue (key:any):TodoModel[]{
  //  return JSON.parse(localStorage.getItem(key)!);
  // }

  getValue(key:string){
 // let  result=JSON.parse(localStorage.getItem(key)!);
    return JSON.parse(localStorage.getItem(key) || '[]');

  }
}
