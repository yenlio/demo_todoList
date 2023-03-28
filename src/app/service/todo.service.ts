import { Injectable } from '@angular/core';
import {BehaviorSubject, findIndex, Observable} from 'rxjs';
import { Filter } from '../model/filter.model';
import { TodoModel } from '../model/todo.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private static readonly todoStorageKey = 'todos'; //key để tương tác với local storage
  private todoArr: TodoModel[]=[]; // tổng tất cả todo
  private filterTodo!: TodoModel[]; // du lieu hien thi tren frontend khi lọc active/done...
  private lengSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0); // theo dõi leng của todo
  private displayObject: BehaviorSubject<TodoModel[]> = new BehaviorSubject<
    TodoModel[]
  >([]); // theo dõi filtertodo
  private currentFiter: Filter = Filter.all; // filter hiện tại. Và khởi tạo là all

  todos$: Observable<TodoModel[]> = this.displayObject.asObservable(); // thằng này để cho các comp khác chọc vào để xem
  leng$: Observable<number> = this.lengSubject.asObservable();
  constructor(private storage: LocalStorageService) {}
  fetchFromLocal() {
    this.todoArr = this.storage.getValue(TodoService.todoStorageKey); //lay het gia trị todo tư local
    console.log(typeof(this.todoArr," todo arr"))
    // console.log(this.todoArr," arr")
    this.filterTodo=[...this.todoArr] //shallow clone
    console.log(this.filterTodo,'filter')
    // this.filterTodo=this.todoArr
    // this.filterTodo = [...this.todoArr.map((todo) => ({ ...todo }))]; // clone deep cua lodash
    this.updateTodoData();
  }
  updateToLocal() {
    console.log(this.todoArr,'kiem tra truoc khi them')
    this.storage.setObject(TodoService.todoStorageKey, this.todoArr);
    this.filterTodos(this.currentFiter, false);
    this.updateTodoData();
  }

  private filterTodos(filter: Filter, isFiltering: boolean = true) {
    this.currentFiter = filter;
    switch (filter) {
      case Filter.Active:
        this.filterTodo = this.todoArr.filter((item) => !item.isCompleted);
        break;
      case Filter.Completed:
        this.filterTodo = this.todoArr.filter((item) => item.isCompleted);
        break;
      case Filter.all:
        this.filterTodo = [...this.todoArr];
        break;
    }
  }

  private updateTodoData() {
    this.displayObject.next(this.filterTodo); // ban du lieu moi cho thang subject
    this.lengSubject.next(this.todoArr.length); // cap nhat du lieu leng moi vao subject
  }

  public addTodo(content:string){
    const date= new Date(Date.now()).getTime();
    const newTodo=new TodoModel(date,content);
    console.log(this.todoArr,' du lieu')
    this.todoArr.unshift(newTodo);
    console.log(this.todoArr,'todo ar add')
    this.updateToLocal();

  }
  changeTodoservice(id:number , isCompleted:boolean){
    const index= this.todoArr.findIndex(t=> t.id===id);
    this.todoArr[index].isCompleted=isCompleted
    this.todoArr.splice(index,1,this.todoArr[index])
    this.updateToLocal();
  }
  editTodo(id:number, content:string){
    const index= this.todoArr.findIndex(t=>t.id==id)
    const todo= this.todoArr[index]
    todo.content=content;
    this.todoArr.splice(index,1,todo)
    this.updateToLocal()
  }
  deleteItem(id:number){
    const  index= this.todoArr.findIndex(t=>t.id===id)
    this.todoArr.splice(index,1);
    this.updateToLocal();



  }
}
