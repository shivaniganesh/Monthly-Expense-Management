import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Expense } from 'src/app/classes/expense';
import { ExpenseserviceService } from 'src/app/services/expenseservice.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css'],
  
})
export class ExpenseComponent implements OnInit {
  expense: any=[];
  display = "none";
  totalamount = 0;
  expenseData: any = {};

  expenseToUpdate = {
    category: "",
    createdDate: "",
    expenseAmount: "",
    expenseDescription: "",
  };

  @Input() showMePartially: boolean | undefined;
  constructor(public router: Router,
    public aroute: ActivatedRoute,
    public restApi: ExpenseserviceService) { }

  ngOnInit(): void {
    this.loadExpense();
    this.getTotalExp();
  }
  loadExpense() {
    return this.restApi
      .getExpenses()
      .subscribe((data) => (this.expense = data));
  }
  register(registerForm: NgForm) {
    this.restApi.createExpense(registerForm.value).subscribe(
      (resp) => {
        console.log(resp);
        registerForm.reset();
        this.loadExpense();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteExp(expid: any) {
    if (window.confirm('Are you sure , you want to delete?')) {
    this.restApi.deleteExpense(expid).subscribe((data) => {
      this.loadExpense();
    }
    );
  }
}
  edit(exp: any) {
    this.expenseToUpdate = exp;
  }
  updateExp() {
    if (window.confirm('Are you sure , you want to update?')) {
      this.restApi.updateExpense(this.expenseToUpdate).subscribe((data: {}) => {
        this.loadExpense();
      });

    }
  }
  

  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
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
}
