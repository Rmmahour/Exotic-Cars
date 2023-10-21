import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/server/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maserati',
  templateUrl: './maserati.component.html',
  styleUrls: ['./maserati.component.css']
})
export class MaseratiComponent implements OnInit {

  cars: any[]= [];
  currentUser: any = undefined;
  Item: any|{}= {};
  Fromvalue: any;
  Daysvalue: any;
  Date: Date = new Date();
  fromDateMin:any;
  Amount: number = 0;

  constructor(private data:DataService, private router: Router) { }

  ngOnInit(): void {
    let Year=this.Date.getFullYear();
    let Month:any=this.Date.getMonth() +1;
    let date:any=this.Date.getDate();
  if(date<10){
    date = `0${date}`;
  }
  if(Month<10){
    Month = `0${Month}`;
  }
  this.fromDateMin= Year +'-' + Month +'-' + date;
    this.currentUser= localStorage.getItem('userid');
    this.currentUser = JSON.parse(this.currentUser);
    fetch("http://localhost:9000/cars/Maserati")
    .then(response => response.json())
    .then(data =>{
          this.cars=data;
    })
  }

  RideBook(e:any):void {
    fetch(`http://localhost:9000/Car/${e}`)
    .then(response => response.json())
    .then(data => {
      for(var car of data){
        this.Item ={
          Id: car.Id,
          Brand: car.Brand,
          Model: car.Model,
          Image: car.Image,
          Price: car.Price
        };
        // if(this.currentUser == undefined || this.currentUser == ''){
        //   alert('Please Login First........');
        //   this.router.navigate(['/Login']);          }
        // else{
        //   var flag = confirm(`Are you sure you want to Add \n ${this.Item.Model} \n to your Wishlist ??...`);
        //   if(flag= true){
        //     this.data.AddItem(this.currentUser?.Userid, this.Item).subscribe();
        //   }
        //   }
       }
       
    })
  }

  confirmRide(id:any):void {
    fetch(`http://localhost:9000/car/${id}`)
    .then(response => response.json())
    .then(data => {
      for(var car of data) {
        this.Item = {
          Id: car.Id,
          Brand: car.Brand,
          Model: car.Model,
          Image: car.Image,
          Price: car.Price,
          From: this.Fromvalue,
          Days: this.Daysvalue,
          Amount: this.Daysvalue * car.Price
        };
          if(this.currentUser == undefined || this.currentUser == ''){
            alert('Please Login First........');
            this.router.navigate(['/Login']);          
          }else{
            if(this.Item.From===undefined || this.Item.From===''){
              alert("Please Select Date First........");
            }else if(this.Item.Days<=0 || isNaN(this.Item.Days)){
              alert("Invalid Days");
            }else{
                var flag = confirm(`Are you sure you want to Add \n ${this.Item.Model} \n to your Wishlist ??...`);
              if(flag== true){
                this.data.AddItem(this.currentUser?.Userid, this.Item).subscribe();
              }
            }
            }
      }
    })
  }

  days(Id:number){
    fetch(`http://localhost:9000/car/${Id}`)
    .then(response => response.json())
    .then(data => {
      for(var car of data){
        this.Amount = car.Price * this.Daysvalue;
        // console.log(this.Amount);
      }
    })
  }

}


