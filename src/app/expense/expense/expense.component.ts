import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseserviceService } from 'src/app/services/expenseservice.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css'],
  
})
export class ExpenseComponent implements OnInit {
  expense: any=[];
  display = "none";
  @Input() showMePartially: boolean | undefined;
  constructor(public router: Router,
    public aroute: ActivatedRoute,
    public restApi: ExpenseserviceService) { }

  ngOnInit(): void {
    this.loadExpense();
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
  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }

}
