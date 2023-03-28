import {Component, OnInit} from '@angular/core';
import {TodoService} from "../../service/todo.service";
import {Observable} from "rxjs";
import {TodoModel} from "../../model/todo.model";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit{
  constructor(private service :TodoService) {
  }
  todos$!:Observable<any>;
  items : any=[13]

  ngOnInit(): void {
    this.todos$=this.service.todos$
    console.log(this.todos$,'list arr')
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
