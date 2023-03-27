import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TodoService } from 'src/app/service/todo.service';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.scss']
})
export class TodoInputComponent implements OnInit, OnChanges {

  todoContent!: string
  constructor(private todoService:TodoService) {
  }
  ngOnChanges(): void {
  }

  ngOnInit(): void {

  }
  Onsubmit() {
    if (this.todoContent.trim() == "") {
      return false
    }

    console.log(this.todoContent,"content");

    this.todoService.addTodo(this.todoContent);
    this.todoContent=""
  }
}
