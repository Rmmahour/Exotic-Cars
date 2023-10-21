import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from 'src/server/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Users: any[]= [];
  Userid:any;
  Password:any;

  @Output() public LoggedIn:EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private data: DataService, private router: Router) { }

  ngOnInit(): void {
    this.data.GetUsers().subscribe(data => this.Users = data);
  }

  onsubmit(){
    let Userid= (<HTMLInputElement>document.getElementById('Userid')).value;
    let Password= (<HTMLInputElement>document.getElementById('Password')).value;
    this.data.login({email:Userid,password:Password}).subscribe((res:any)=>{
      if(res.status==200){
        localStorage.setItem('userid',JSON.stringify(res.result));
          alert(res.message);
          this.router.navigateByUrl('/All');
      }else{
        alert(res.message);
      }
    },(err)=>{
      alert(err.error.message);
    })
  };

  LoggedInClicked(){

  }
}
