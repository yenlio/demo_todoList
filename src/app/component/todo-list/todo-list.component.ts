import {Component, OnInit} from '@angular/core';
import {TodoService} from "../../service/todo.service";
import {Observable, pipe} from "rxjs";
import {TodoModel} from "../../model/todo.model";
import {DataService} from "../../service/data.service";
import { Subscription } from 'rxjs';
import {map} from "rxjs";
import {logMessages} from "@angular-devkit/build-angular/src/builders/browser-esbuild/esbuild";
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit{
  constructor(private service :TodoService, private data: DataService) {
  }
  todos$!:Observable<any>;
  dataApi$!:Observable<any>
  dataAPI:any
  items : any=[13]

  dataSubscription!: Subscription;


  ngOnInit(): void {
    this.todos$=this.service.todos$

    // su dung async pipe
    this.dataApi$=this.data.getData();




    // su dung voi subcribe
   // this.dataSubscription=this.data.getData().subscribe(
   //   (item)=>{
   //     this.dataAPI=item
   //     console.log(this.dataAPI," dataAPI")
   //   }
   // )
  }
  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }
  onChangetodo(event:TodoModel){
    this.service.changeTodoservice(event.id, event.isCompleted)
  }
  inEditTodo(item :TodoModel){
    this.service.editTodo(item.id, item.content)
  }
  delete(e:any){
    console.log(e, "event")
    this.service.deleteItem(e.id)
  }


}
