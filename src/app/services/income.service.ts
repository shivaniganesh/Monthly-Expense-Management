import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Income } from '../classes/income';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  private url="http://localhost:8080/sprexp/income";

  constructor(private http:HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  
  getIncomeFromService():Observable<Income[]>{
    return this.http.get<Income[]>(this.url+'/allIncomes').pipe(retry(1), catchError(this.handleError));
    
  }
  getSelectedIncomeFromService(id):Observable<Income[]>{
    return this.http.get<Income[]>(this.url+'/selectedincomes/'+id).pipe(retry(1), catchError(this.handleError));
    
  }
  addIncomeFromRemote(income:Income):Observable<any>{
    return this.http.post(`${this.url}/addIncome`,income)

 }
 getIncome(incomeId:Income):Observable<any>{
  return this.http.get<Income>(this.url+'/getIncome/'+incomeId).pipe(retry(1), catchError(this.handleError));
  
}
createIncome(inc:any):Observable<any>{
  return this.http.post<Income>(this.url+'/addIncome',inc).pipe(retry(1), catchError(this.handleError));

}
editIncome(inc:Income):Observable<any>{
  return this.http.put<Income>(this.url+'/updateIncome',JSON.stringify(inc),this.httpOptions).pipe(retry(1), catchError(this.handleError));

}
deleteIncome(incomeId:any):Observable<any>{
  return this.http.delete<Income>(this.url+'/deleteIncome/'+incomeId).pipe(retry(1), catchError(this.handleError));

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
