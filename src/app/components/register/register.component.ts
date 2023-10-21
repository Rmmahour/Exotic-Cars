import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { DataService } from 'src/server/data.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  Users: any[] = [];
  UserAvail: boolean = false;
  submitted: boolean=false;
  // Password: string ='';
  // cnfrmPassword: string ='';
  PasswordMatch: boolean = false;

  constructor(private data:DataService, private router: Router) { }

  frmRegister= new FormGroup({
    FirstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    LastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    Email: new FormControl('',[ Validators.required, Validators.pattern(/[a-zA-Z0-9]{1,}@gmail.com/)]),
    Date_Of_Birth: new FormControl('', [Validators.required]),
    Gender: new FormControl('', [Validators.required]),
    Userid: new FormControl('', [Validators.required]),
    Mobile: new FormControl('', [Validators.required, Validators.pattern(/\+91\d{10}/), Validators.maxLength(13)]),
    Password: new FormControl('', [Validators.required, Validators.pattern(/(?=.*\W)\w{1,}/)]),
    cnfrmPassword: new FormControl('', [Validators.required, Validators.pattern(/(?=.*\W)\w{1,}/)]),
    Street: new FormControl(''),
    City:  new FormControl(''),
    State: new FormControl(''),
    Pincode:  new FormControl(''),
    Country:  new FormControl('',[ Validators.required]),
  });

  get f(){
    return this.frmRegister.controls
  }

  Passwordkey(){
    var Password = this.frmRegister.value.Password;
    var cnfrmPassword =  this.frmRegister.value.cnfrmPassword;
    if(Password !== cnfrmPassword){
      this.PasswordMatch = true;
    }else if(Password == cnfrmPassword){
      this.PasswordMatch = false;
    }
  }


  ngOnInit(): void {
    this.data.GetUsers().subscribe(data => this.Users = data);
  }

  Verifyid(e:any){
    var User = e.target.value.toLowerCase();
      for(var user of this.Users){
        if(user.Userid.toLowerCase() === User){
          this.UserAvail = true;
          break;
        }else{
          this.UserAvail = false;
        }
      }
    
  }

  onsubmit(data:any){
    this.submitted = true;
    if(this.frmRegister.invalid){
      alert("Please fillup mandatory fields");
      this.submitted = true;
    }else{
      this.submitted = false;
      this.data.RegisterUser(data).subscribe();
      this.router.navigate(['/Login']);
    }
  }

}
