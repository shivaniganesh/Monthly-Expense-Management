import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Income } from 'src/app/classes/income';
import { LoginService } from 'src/app/services/login.service';
import { IncomeService } from '../../services/income.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {
  incomeData = new Income();
  income: any = [];
  userData: any = [];
  display = "none";
  displayAdd = "none";
  totalamountinc = 0;
  searchText: any;
  // incomeData: any = {};
  userId = localStorage.getItem("userId");

  incomeToUpdate = {
    incomeId: "",
    incomeAmount: "",
    incomeDescription: "",
  };

  @Input() showMePartially1: boolean | undefined;
  constructor(public router: Router,
    public aroute: ActivatedRoute,
    public restApi: IncomeService,
    public loginService: LoginService) { }

  email: any = localStorage.getItem('credentialEmail');
  data = {
    "email": this.email
  }

  ngOnInit(): void {
    this.loadIncome();
    this.loginService.getUserByEmailId(this.data).subscribe((data: any) => {
      this.userData = data;
      console.log(this.userData);
      this.incomeData.user = this.userData;
      console.log(this.incomeData.user);
      // this.getTotalInc();
    });
  }

  loadIncome() {
    return this.restApi
      .getIncomes()
      .subscribe((data) => (this.income = data));
  }

  register(registerForm: NgForm) {
    this.restApi.createIncome(registerForm.value).subscribe(
      (resp) => {
        console.log(resp);
        registerForm.reset();
        this.loadIncome();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteInc(incid: any) {
    if (window.confirm('Are you sure , you want to delete?')) {
      this.restApi.deleteIncome(incid).subscribe((data) => {
        this.loadIncome();
      }
      );
    }
  }

  edit(inc: any) {
    this.incomeToUpdate = inc;
  }

  updateInc() {
    if (window.confirm('Are you sure , you want to update?')) {
      this.restApi.updateIncome(this.incomeToUpdate).subscribe((data: {}) => {
        this.loadIncome();
      });
    }
  }

  addIncome() {
    this.restApi.createIncome(this.incomeData).subscribe(data => {
      this.loadIncome();
    })
  }

  openModal() {
    this.display = "block";
  }

  onCloseHandled() {
    this.display = "none";
  }

  openModalAdd() {
    this.displayAdd = "block";
  }

  onCloseHandledAdd() {
    this.displayAdd = "none";
    this.ngOnInit();
  }

  //   getTotalInc() {
  //     let totalinc = 0;
  //     for (var i = 0; i < this.income.length; i++) {
  //         console.log(this.income.length);
  //         if (this.income[i].incomeAmount) {
  //             totalinc += this.income[i].incomeAmount;
  //             this.totalamountinc = totalinc;
  //         }
  //     }
  //     return this.totalamountinc;
  // }
}