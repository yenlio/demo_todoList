import {Component, OnInit} from '@angular/core';
import {TodoService} from "../../service/todo.service";
import {Observable, pipe} from "rxjs";
import {TodoModel} from "../../model/todo.model";
import {DataService} from "../../service/data.service";
import { Subscription } from 'rxjs';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import {map} from "rxjs";
import {logMessages} from "@angular-devkit/build-angular/src/builders/browser-esbuild/esbuild";
import {saveAs} from "file-saver";
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
    // this.dataApi$=this.data.getData();
    // console.log(this.dataApi$," data")

    // su dung voi subcribe
   this.dataSubscription=this.data.getData().subscribe(
     (item)=>{
       this.dataAPI=item
       console.log(this.dataAPI," dataAPI")
     }
   )
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

  exportExcel(){
    const title = 'Car Sell Report';
    const header = ["id", "iduser", "title"]

    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('ProductData');



    worksheet.columns = [
      { header: 'Id', key: 'id', width: 10 , style: { font: { name: 'Arial Black', size:10} }},
      { header: 'userId', key: 'userId', width: 32 },
      { header: 'title', key: 'title', width: 10 },
    ];
    worksheet.getCell('B2').value = 5;
    // Điền dữ liệu vào bảng tính
    this.dataAPI.forEach((row:any) => {
      worksheet.addRow(row);
    });
    worksheet.addRow([]);
    // Tự động chỉnh lại chiều rộng của các cột
    worksheet.columns.forEach((column:any) => {
      column.width = column.header.length < 15 ? 15 : column.header.length;
    });
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, "lio");
    });


  }


}
