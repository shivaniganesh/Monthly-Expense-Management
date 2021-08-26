import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Expense } from 'src/app/classes/expense';
import { ExpenseserviceService } from 'src/app/services/expenseservice.service';
import { IncomeService } from 'src/app/services/income.service';



@Component({
  selector: 'app-dashhome',
  templateUrl: './dashhome.component.html',
  styleUrls: ['./dashhome.component.css']
})
export class DashhomeComponent implements OnInit {
  @Input() totalamount = 0;
  @Input() totalamountinc = 0;
  @Input() expense: any = [];
  @Input() income: any = [];
  @Input() showDashHome: boolean | undefined;
  transaction = 0;
  public flag: boolean = true;

  constructor(public router: Router,
    public aroute: ActivatedRoute,
    public restApi: ExpenseserviceService,
    public restApi1: IncomeService,
    private httpService: HttpClient) { }
  userId = localStorage.getItem("userId");

  ngOnInit(): void {
    this.loadExpense();
    this.getTotalExp();
    this.loadIncome();
    this.getTotalInc();
    // this.httpService.get('');
    // this.showAlert();
    this.swap();
  }

  showexpsummary() {
    this.loadExpense();
    this.getTotalExp();
  }

  loadExpense() {
    return this.restApi
      .getSelectedExpenseFromService(this.userId)
      .subscribe((data) => (this.expense = data));
  }

  getTotalExp() {
    let total = 0;
    for (var i = 0; i < this.expense.length; i++) {
      console.log(this.expense.length);
      if (this.expense[i].expenseAmount) {
        total += this.expense[i].expenseAmount;
        this.totalamount = total;
      }
    }
    return this.totalamount;
  }

  loadIncome() {
    return this.restApi1
      .getIncomes()
      .subscribe((data) => (this.income = data));
  }

  getTotalInc() {
    let totalinc = 0;
    for (var j = 0; j < this.income.length; j++) {
      console.log(this.income.length);
      if (this.income[j].incomeAmount) {
        totalinc += this.income[j].incomeAmount;
        this.totalamountinc = totalinc;
      }
    }
    return this.totalamountinc;
  }

  swap() {
    if ((this.getTotalInc() - this.getTotalExp()) < 0) {
      this.flag = false;
    }
  }
  // showAlert() {

  //   if(this.getTotalExp() > this.getTotalInc()){
  //     console.log('This will always executed.');
  //     console.log(`${this.getTotalExp()} hello`);
  //     window.confirm('Negative Balance!');
  //   }else{
  //     console.log((this.getTotalInc() - this.getTotalExp()) + 'hellloo');
  //     window.alert('testwindow');
  //   }
  // }

}
