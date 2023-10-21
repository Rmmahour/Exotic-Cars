import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class DataService {
    constructor(private http: HttpClient){}

    url:string = "http://localhost:9000"

    GetUsers():Observable<any[]>{
        return this.http.get<any[]>(this.url + "/users");
    }

    GetUser(Userid:any):Observable<any[]>{
        return this.http.get<any[]>(this.url + `/users/${Userid}`);
    }

    RegisterUser(data:any):Observable<any>{
        return this.http.post<any>(this.url + "/register", data);
    }

    AddItem(id:any, data:any):Observable<any>{
        return this.http.put<any>(this.url + `/wishlist/${id}`,data);
    }

    GetAllCars():Observable<any[]>{
        return this.http.get<any[]>(this.url + "/cars");
    }

    GetBrands():Observable<any[]>{
        return this.http.get<any[]>(this.url + "/brands");
    }

    GetWishlist(id:string):Observable<any[]>{
        return this.http.get<any[]>(this.url + `/wishlist/${id}`);
    }

    login(data:any){
        return this.http.post(this.url + '/login',data);
    }

    update(id:string, data:any){
        this.http.put(this.url + '/update',data).subscribe();
    }

    updateFirstname(id:string, data:any){
        this.http.put(this.url + `/user/firstname/${id}`,data).subscribe();
    }

    updateLastname(id:string, data:any){
        this.http.put(this.url + `/user/lastname/${id}`,data).subscribe();
    }

    updateEmail(id:string, data:any){
        this.http.put(this.url + `/user/email/${id}`,data).subscribe();
    }

    updateMobile(id:string, data:any){
        this.http.put(this.url + `/user/mobile/${id}`,data).subscribe();
    }

    updatePassword(id:string, data:any){
        this.http.put(this.url + `/user/password/${id}`,data).subscribe();
    }

    updateStreet(id:string, data:any){
        this.http.put(this.url + `/user/street/${id}`,data).subscribe();
    }

    updatePin(id:string, data:any){
        this.http.put(this.url + `/user/pin/${id}`,data).subscribe();
    }

    updateCity(id:string, data:any){
        this.http.put(this.url + `/user/city/${id}`,data).subscribe();
    }

    updateState(id:string, data:any){
        this.http.put(this.url + `/user/state/${id}`,data).subscribe();
    }


    removeItem(userId:string,id:any,data:any){
       return this.http.put(this.url + `/wishlist/${userId}/${id}`,data).subscribe();
    }

}