import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/server/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private data: DataService ,private router: Router) { }
  currentUser: any =undefined;

  ngOnInit(): void {
    setInterval(() =>{
      this.currentUser = localStorage.getItem('userid');
      this.currentUser = JSON.parse(this.currentUser); 
    },100)
  }

  LogoutClick(){
    this.currentUser = localStorage.removeItem('userid');
    alert("Logout clicked");
    this.router.navigate(['/Login']);
  }

}
