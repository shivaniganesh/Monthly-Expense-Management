import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Income } from '../classes/income';
import { IIncome } from '../IIncome';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  [x: string]: any;
  
  private resturl: string = 'http://localhost:8080/sprexp/income';
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getSelectedIncomeFromService(id: any):Observable<Income[]>{
    return this.http.get<Income[]>(this.url+'/selectedincomes/'+id).pipe(retry(1), catchError(this.handleError));
    
  }
  getIncomes(): Observable<IIncome[]> {
    return this.http
      .get<IIncome[]>(this.resturl + '/allIncomes')
      .pipe(retry(1), catchError(this.handleError));
  }
  createIncome(income: any): Observable<IIncome>{
    return this.http.post<IIncome>(this.resturl+'/addIncome',JSON.stringify(income), this.httpOptions)
    .pipe(retry(1), catchError(this.handleError));
  }
  updateIncome(income: any): Observable<IIncome> {
    return this.http
      .put<IIncome>(
        this.resturl + '/updateIncome',
        JSON.stringify(income),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  deleteIncome(incomeId: any): Observable<IIncome> {
    return this.http
      .delete<IIncome>(this.resturl + '/deleteIncome/' + incomeId, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(err: any) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = err.error.message;
    } else {
      errorMessage = `Error code : ${err.status} \n Error Message : ${err.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}