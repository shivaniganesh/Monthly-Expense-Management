import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url="http://localhost:8080/sprexp";
  constructor(private http:HttpClient) { }
  //calling the server to generate token ...it will return obserable
generateToken(credentials:any){
  return this.http.post(`${this.url}/token`,credentials);
}


  //to assign token when user login
  loginUser(token:any){
    localStorage.setItem("token",token);
    return true;
  }

  
  //to check user is logged in or not
  isLoggedIn(){
    let token=localStorage.getItem("token");
    if(token==null ||token===''||token==undefined)
    {
      return false;
    }else{
      return true;
    }
  }
  logout(){
    localStorage.removeItem("token");
    return true;
  }
  getToken(){
    return localStorage.getItem('token');
  }
}
