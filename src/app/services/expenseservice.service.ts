import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { IExpense } from '../IExpense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseserviceService {
  [x: string]: any;
  private resturl: string = 'http://localhost:8080/sprexp/expense';
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getExpenses(): Observable<IExpense[]> {
    return this.http
      .get<IExpense[]>(this.resturl + '/allexpenses')
      .pipe(retry(1), catchError(this.handleError));
  }
  createExpense(expense: any): Observable<IExpense>{
    return this.http.post<IExpense>(this.resturl+'/addexpense',JSON.stringify(expense), this.httpOptions)
    .pipe(retry(1), catchError(this.handleError));
  }
  updateExpense(expense: any): Observable<IExpense> {
    return this.http
      .put<IExpense>(
        this.resturl + '/updateexpense',
        JSON.stringify(expense),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  deleteExpense(expenseId: any): Observable<IExpense> {
    return this.http
      .delete<IExpense>(this.resturl + '/deleteExpense/' + expenseId, this.httpOptions)
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