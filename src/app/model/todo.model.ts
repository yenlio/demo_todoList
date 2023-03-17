export class TodoModel{
  constructor(
    public  id:number,
    public content:string,
    public isCompleted: boolean=false
  ) {
  }
}
