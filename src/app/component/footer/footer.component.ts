import { Component } from '@angular/core';
import {Filter, FilterModel} from "../../model/filter.model";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  length=2
  fiterButton:FilterModel[]=[
    {
      type: Filter.all,
      label: "all",
      isActive: true
    },
    {
      type: Filter.Active,
      label: "Active",
      isActive: false
    },
    {
      type: Filter.Completed,
      label: "completed",
      isActive: false
    }
  ]

}
