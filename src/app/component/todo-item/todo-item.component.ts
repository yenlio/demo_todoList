import { Component } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {
  isHover:boolean=false
  isEditing: boolean=false
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
}
