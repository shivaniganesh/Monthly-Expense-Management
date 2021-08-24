import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IncomeService } from 'src/app/services/income.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {
  income: any=[];
  display = "none";
  totalamount = 0;
  incomeData: any = {};

  incomeToUpdate = {
    
    incomeAmount: "",
    incomeDescription: "",
  };

  @Input() showMePartially: boolean | undefined;
  constructor(public router: Router,
    public aroute: ActivatedRoute,
    public restApi: IncomeService) { }

  ngOnInit(): void {
    this.loadIncome();
    this.getTotalInc();
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
  

  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }

  getTotalInc() {
    let total = 0;
    for (var i = 0; i < this.income.length; i++) {
        console.log(this.income.length);
        if (this.income[i].incomeAmount) {
            total += this.income[i].incomeAmount;
            this.totalamount = total;
        }
    }
    return this.totalamount;
}
}


 