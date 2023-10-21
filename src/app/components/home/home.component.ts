import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/server/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cars: any[] = [];
  brands: any[] = [];

  constructor(private data:DataService) { }

  ngOnInit(): void {
    this.data.GetAllCars().subscribe(data=> this.cars =data );
    this.data.GetBrands().subscribe(data=> this.brands =data );
   }

  //  brandClick(data:any):void {
  //   alert(data);  
  //  }

}

