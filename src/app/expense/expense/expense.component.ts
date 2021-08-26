import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Expense } from 'src/app/classes/expense';
import { ExpenseserviceService } from 'src/app/services/expenseservice.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css'],
})

export class ExpenseComponent implements OnInit {
  expense: any = [];
  displayAdd = "none";
  display = "none";
  totalamount = 0;
  searchText: any;
  expenseData: any = {};
  minDate: any;
  ser = {
    category: ""
  }
  email: any = localStorage.getItem('credentialEmail');
  data = {
    "email": this.email
  }
  userData: any = [];
  userId = localStorage.getItem("userId");

  expenseToUpdate = {
    expenseId: "",
    category: "",
    createdDate: "",
    expenseAmount: "",
    expenseDescription: "",
    user: {}
  };

  @Input() showMePartially: boolean | undefined;
  constructor(public router: Router,
    public aroute: ActivatedRoute,
    public restApi: ExpenseserviceService,
    public loginService: LoginService,) { }

  ngOnInit(): void {
    this.loadExpense();
    // this.getTotalExp();
    this.loginService.getUserByEmailId(this.data).subscribe((data: any) => {
      this.userData = data;
      //console.log(this.userData.userId);
      this.expenseData.user = this.userData;
      console.log(this.expenseData.user + 'jjjjjjj');
      //this.userId=this.userData.userId;
      //  console.log("for user id :"+this.userId);
    });
  }

  addExpense() {
    this.restApi.createExpense(this.expenseData).subscribe(data => {
      console.log(this.expenseData);
      this.loadExpense();
    })
  }

  loadExpense() {
    return this.restApi
      .getSelectedExpenseFromService(this.userId)
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

  openModalAdd() {
    this.displayAdd = "block";
  }

  onCloseHandled() {
    this.display = "none";
    this.ngOnInit();
  }

  onCloseHandledAdd() {
    this.displayAdd = "none";
    this.ngOnInit();
  }

  getDate() {
    var date: any = new Date();
    var toDate: any = date.getDate();
    if (toDate < 10) {
      toDate = '0' + toDate;
    }
    var toMonth: any = date.getMonth() + 1;
    if (toMonth < 10) {
      toMonth = '0' + toMonth;
    }
    var year: any = date.getFullYear();
    this.minDate = year + "-" + toMonth + "-" + "01";

  }

  //   getTotalExp() {
  //     let total = 0;
  //     for (var i = 0; i < this.expense.length; i++) {
  //         console.log(this.expense.length);
  //         if (this.expense[i].expenseAmount) {
  //             total += this.expense[i].expenseAmount;
  //             this.totalamount = total;
  //         }
  //     }
  //     return this.totalamount;
  // }
}
