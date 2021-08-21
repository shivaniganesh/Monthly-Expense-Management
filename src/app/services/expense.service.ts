import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Expense } from '../classes/expense';


@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private url="http://localhost:8080/sprexp/expense";

  constructor(private http:HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  
  getExpenseFromService():Observable<Expense[]>{
    return this.http.get<Expense[]>(this.url+'/allexpenses').pipe(retry(1), catchError(this.handleError));
    
  }
  addExpenseFromRemote(expense:Expense):Observable<any>{
    return this.http.post(`${this.url}/addUserProfile`,expense)

 }
 getExpense(expId:Expense):Observable<any>{
  return this.http.get<Expense>(this.url+'/getExpense/'+expId).pipe(retry(1), catchError(this.handleError));
  
}
createExpense(exp:any):Observable<any>{
  return this.http.post<Expense>(this.url+'/addexpense',exp).pipe(retry(1), catchError(this.handleError));

}
editExpense(exp:Expense):Observable<any>{
  return this.http.put<Expense>(this.url+'/updateexpense',JSON.stringify(exp),this.httpOptions).pipe(retry(1), catchError(this.handleError));

}
deleteExpense(expenseId:any):Observable<any>{
  return this.http.delete<Expense>(this.url+'/deleteExpense/'+expenseId).pipe(retry(1), catchError(this.handleError));

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


