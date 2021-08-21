import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,throwError } from 'rxjs';

import { catchError, retry } from 'rxjs/operators';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user =new User();
  url="http://localhost:8080/sprexp/userProfile";
  constructor(private http:HttpClient) { }
  //calling the server to generate token ...it will return obserable


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  
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
  getUserByEmailId(email:User):Observable<any>{
    return this.http.get<User>(this.url+'/getUser/'+email).pipe(retry(1), catchError(this.handleError));
  }
  editUser(user:User):Observable<User>{
    return this.http.put<User>(this.url+'/updateUserProfile',user).pipe(retry(1), catchError(this.handleError));
  
  }
  deleteProfile(userId:any):Observable<any>{
    return this.http.delete<User>(this.url+'/deleteUserProfile/'+userId).pipe(retry(1), catchError(this.handleError));
  
  }
  

  handleError(err:any)
  { let errorMessage="";
  if(err.error instanceof ErrorEvent){
    errorMessage=err.error.message;

  }else {
    errorMessage=`Error code : ${err.status} \n Error Message :${err.message}`;
  }
  window.alert(errorMessage)
  return throwError(errorMessage);
  

  }
  
}
