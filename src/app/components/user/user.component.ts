import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/server/data.service';
import {  FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  cars:any[]= [];
  Items:any={};
  User:any[]= [];
  currentUser: any= undefined;

  PasswordMatch:boolean=false;
  isFirst: boolean=false;
  isLast: boolean=false;
  isEmail: boolean=false;
  isDate_Of_Birth: boolean=false;
  isGender: boolean=false;
  isUserid: boolean=false;
  isMobile: boolean=false;
  isPassword: boolean=false;
  isStreet: boolean=false;
  isCity: boolean=false;
  isState: boolean=false;
  isPincode: boolean=false;
  isCountry: boolean=false;

  constructor(private data:DataService, private router:Router) { };

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('userid');
    this.currentUser = JSON.parse(this.currentUser);
    this.data.GetUser(this.currentUser.Userid).subscribe(data => this.User = data);
  }

  FirstName= new FormControl('', [Validators.required, Validators.minLength(3)]);
  LastName= new FormControl('', [Validators.required, Validators.minLength(3)]);
  Mobile= new FormControl('', [Validators.required, Validators.pattern(/\+91\d{10}/), Validators.maxLength(13)]);
  Email= new FormControl('', [Validators.required, Validators.pattern(/[a-zA-Z0-9]{1,}@gmail.com/)]);
  Password= new FormControl('', [Validators.required, Validators.pattern(/(?=.*\W)\w{1,}/)]);
  cnfrmPassword= new FormControl('', [Validators.required, Validators.pattern(/(?=.*\W)\w{1,}/)]);
  Street= new FormControl('', [Validators.required, Validators.minLength(3)]);
  Pincode= new FormControl('', [Validators.required, Validators.pattern(/\d{6}/), Validators.maxLength(6), Validators.minLength(6)]);
  City= new FormControl('', [Validators.required, Validators.minLength(3)]);
  State= new FormControl('', [Validators.required, Validators.minLength(3)]);

  firstNameEdit(){
    this.isFirst=== false ? this.isFirst=true: this.isFirst=false;
  }
  FirstNameSave():void {
    var FirstName=this.FirstName.value;
    this.data.updateFirstname(this.currentUser.Userid , {FirstName:FirstName});
    console.log(this.FirstName.value);
    this.isFirst=== false ? this.isFirst=true: this.isFirst=false;
    location.reload();
  }


  lastNameEdit(){
    this.isLast=== false ? this.isLast=true: this.isLast=false;
  }
  LastNameSave():void {
    var LastName = this.LastName.value;
    this.data.updateLastname(this.currentUser.Userid,{LastName:LastName});
    this.isLast=== false ? this.isLast=true: this.isLast=false;
    location.reload();
  }


  mobileEdit(){
    this.isMobile=== false ? this.isMobile=true: this.isMobile=false;
  }
  MobileSave():void {
    var Mobile= this.Mobile.value;
    this.data.updateMobile(this.currentUser.Userid,{Mobile:Mobile});
    this.isMobile=== false ? this.isMobile=true: this.isMobile=false;
    location.reload();
  }


  emailEdit(){
    this.isEmail=== false ? this.isEmail=true: this.isEmail=false;
  }
  EmailSave():void {
    var Email = this.Email.value;
    this.data.updateEmail(this.currentUser.Userid,{Email:Email});
    this.isEmail=== false ? this.isEmail=true: this.isEmail=false;
    location.reload();
  }

  passwordEdit(){
    this.isPassword=== false ? this.isPassword=true: this.isPassword=false;
  }
  PasswordSave():void {
    var Password = this.Password.value;
    this.data.updatePassword(this.currentUser.Userid,{Password:Password});
    this.isPassword=== false ? this.isPassword=true: this.isPassword=false;
    location.reload();
  }

  streetEdit(){
    this.isStreet=== false ? this.isStreet=true: this.isStreet=false;
  }
  StreetSave():void {
    var Street= this.Street.value;
    this.data.updateStreet(this.currentUser.Userid,{Street:Street});
    this.isStreet=== false ? this.isStreet=true: this.isStreet=false;
    location.reload();
  }

  pincodeEdit(){
    this.isPincode=== false ? this.isPincode=true: this.isPincode=false;
  }
  PinSave():void {
    var Pincode = parseInt(this.Pincode.value);
    this.data.updatePin(this.currentUser.Userid,{Pincode:Pincode});
    this.isPincode=== false ? this.isPincode=true: this.isPincode=false;
    location.reload();
  }

  cityEdit(){
    this.isCity=== false ? this.isCity=true: this.isCity=false;
  }
  CitySave():void {
    var City= this.City.value;
    this.data.updateCity(this.currentUser.Userid,{City:City});
    this.isCity=== false ? this.isCity=true: this.isCity=false;
    location.reload();
  }

  stateEdit(){
    this.isState=== false ? this.isState=true: this.isState=false;
  }
  StateSave():void {
    var State= this.State.value;
    this.data.updateState(this.currentUser.Userid,{State:State});
    this.isState=== false ? this.isState=true: this.isState=false;
    location.reload();
  }

  Passwordkey(){
    var Password = this.Password.value;
    var cnfrmPassword =  this.cnfrmPassword.value;
    if(Password !== cnfrmPassword){
      this.PasswordMatch = true;
    }else if(Password == cnfrmPassword){
      this.PasswordMatch = false;
    }
  }

  trackChange(index: number){
    return index;
  }


}
