import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user =new User();
  url="http://localhost:8080/sprexp/userProfile";
  constructor(private http:HttpClient) { }
  //calling the server to generate token ...it will return obserable
  
  generateToken(credentials:any){
  return this.http.post(`${this.url}/login`,credentials);
}
  
  //to check user is logged in or not
  isLoggedIn(){
    let token=localStorage.getItem("token");
    if(token==null ||token===''||token===undefined)
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

  //for registration
   registerUserFromRemote(user:User):Observable<any>{
     return this.http.post(`${this.url}/addUserProfile`,user)

  }
  resetPasswordFromRemote(user:User):Observable<any>{
    return this.http.put(`${this.url}/resetPassword`,user)
  }
}
