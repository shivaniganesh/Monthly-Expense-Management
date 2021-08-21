import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { IIncome } from '../IIncome';

@Injectable({
  providedIn: 'root'
})
export class IncomeserviceService {
  private resturl: string = 'http://localhost:8080/sprexp/income';
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

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
        this.resturl + '/updateincome',
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



