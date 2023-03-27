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
  ngOnInit(): void {
    console.log(this.data,'item')
  }
  isHover:boolean=false
  isEditing: boolean=true
  constructor() {
    this.isHover = false;
  }
  over(){
    this.isHover=true
    console.log(this.isHover," is hover")
    // console.log(" da hover")

  }
  overout(){
    this.isHover=false
  }
  changeActive(){
    this.changeStatus.emit({...this.data, isCompleted : !this.data.isCompleted});
  }


}
