import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/server/data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart:any[]= [];
  currentUser: any;
  Total: number=0;
  Amount: any[]= [];

  constructor(private data:DataService) { }

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('userid');
    this.currentUser = JSON.parse(this.currentUser);
    this.data.GetWishlist(this.currentUser.Userid).subscribe(data => this.cart = data);
    this.data.GetWishlist(this.currentUser.Userid).subscribe(data =>{
      this.Amount = data;
      for(let item of this.Amount){
        if(this.Amount !==null){
          for(let i=0; i<this.Amount.length; i++)
          this.Total += item.Amount;
        }else {
          alert("No Added Items!");
        }
        
      }
  });
  }
  

  CancelRide(item: any) {
    let i:number = this.cart.indexOf(item);
    this.cart.splice(i,1);
    var list = this.cart;
    this.data.removeItem(this.currentUser.Userid ,item.Id,{list:list});
    location.reload();
  }
  
}
