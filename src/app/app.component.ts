import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TodoService } from './service/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
 hasTodo$!: Observable<boolean>;
  constructor(private todoService :TodoService){
  }
  ngOnInit(): void {
    this.todoService.fetchFromLocal();
    this.hasTodo$=this.todoService.leng$.pipe(
      map(length=> length >0)
    )
    

  }
}
