import { Component, OnInit } from '@angular/core';
import { ILocationResponse, IQuery} from '../shared/location-response.interface';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

queryData:IQuery={
query:"",
checkIn:"",
checkOut:"",
}

  constructor() { }

  ngOnInit(): void {
  }

  





}
