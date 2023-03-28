import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TodoModel} from "../../model/todo.model";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit{
  @Input() data: any;
  @Output() changeStatus= new EventEmitter<TodoModel>();
  @Output() editTodo= new EventEmitter<TodoModel>();
  @Output() deleteItem= new EventEmitter<TodoModel>();
  ngOnInit(): void {
    console.log(this.data,'item')
  }
  isHover:boolean=false
  isEditing: boolean=false
  constructor() {
    this.isHover = false;
  }
  mouseover(){
    this.isHover=true
    // console.log(this.isHover," is hover")
    // console.log(" da hover")

  }
  changeEditing(){
    this.isEditing=true
    console.log(this.isEditing,"this.is editing")
  }

  overout(){
    this.isHover=false
    // console.log(this.isHover," hover false")
  }
  changeActive(){
    this.changeStatus.emit({...this.data, isCompleted : !this.data.isCompleted});
  }
  submitEdit(){
    this.editTodo.emit(this.data)
    this.isEditing=false

  }
  remove(){
    this.deleteItem.emit(this.data)
  }


}
