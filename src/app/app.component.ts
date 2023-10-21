import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/server/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  constructor(private data: DataService) {}

  jQuery: any;

  title = 'Exotic';
  Brands:any[] =[];

    public Cars: any[] = [];
    public MaseratiCount: number = 0;
    public FerrariCount: number = 0;
    public BuggattiCount: number = 0;
    public LamborghiniCount: number = 0;
    public AllCount: number = 0;
  
    currentUser:any=undefined;
  
    ngOnInit(): void {
      this.currentUser = localStorage.getItem('userid')
      this.currentUser = JSON.parse(this.currentUser);
      fetch('http://localhost:9000/cars')
      .then(response => response.json())
      .then(data=>{
        this.Cars = data;
        this.AllCount = data.length;
        this.MaseratiCount = data.filter((Car:any) => Car.Brand == 'Maserati').length;
        this.FerrariCount = data.filter((Car:any) => Car.Brand == 'Ferrari').length;
        this.BuggattiCount = data.filter((Car:any) => Car.Brand == 'Buggatti').length;
        this.LamborghiniCount = data.filter((Car:any) => Car.Brand == 'Lamborghini').length;
      })
  
    }
  
  }
