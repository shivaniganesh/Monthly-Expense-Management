import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Expense } from 'src/app/classes/expense';
import { Income } from 'src/app/classes/income';

import { IncomeService } from 'src/app/services/income.service';
import { LoginService } from 'src/app/services/login.service';
import { ExpenseService } from '../../services/expense.service';



@Component({
  selector: 'app-dashhome',
  templateUrl: './dashhome.component.html',
  styleUrls: ['./dashhome.component.css']
})
export class DashhomeComponent implements OnInit {
  userId = localStorage.getItem("userId");
  email: any = localStorage.getItem('credentialEmail');
  data = {
    "email": this.email
  }
  campareIncome:boolean;
  userName:any;
  userData: any = [];
  expenseData = new Expense();
  incomeData= new Income();
  @Input() totalamount = 0;
  @Input() totalamountinc = 0;
  @Input() expense: any = [];
  @Input() income: any = [];
  @Input() showDashHome: boolean | undefined;
  @Input() showIncome: boolean | undefined;
  @Input() showPassword: boolean | undefined;
  transaction = 0;




  constructor(public router: Router,
    public aroute: ActivatedRoute,
    public restApi: ExpenseService,
    public incomeService: IncomeService, public loginService: LoginService,
    private httpService: HttpClient) { }


  ngOnInit(): void {
    this.loginService.getUserByEmailId(this.data).subscribe((data: any) => {
      this.userData = data;
      //console.log(this.userData.userId);
      this.expenseData.user = this.userData;
      this.incomeData.user=this.userData;
      this.userName=this.userData.fname;
    
    });

      this.loadExpense();
      this.getTotalExp();
      this.loadIncome();
      this.getTotalInc();


      if(this.getTotalInc()<this.getTotalExp())
      {
        this.campareIncome=false;

      }
      else{
        this.campareIncome=true;
      }
      
      
      


    }

  
  showexpsummary() {
      this.loadExpense();
      this.getTotalExp();
    }
  loadExpense() {
      return this.restApi.getSelectedExpenseFromService(this.userId).subscribe((data) => {
        (this.expense = data)


      });
    }
  getTotalExp() {
      let total = 0;
      for(var i = 0; i< this.expense.length; i++) {
      console.log(this.expense.length);
      if (this.expense[i].expenseAmount) {
        total += this.expense[i].expenseAmount;
        this.totalamount = total;
      }
    }
    return this.totalamount;
  }

  loadIncome() {
    return this.incomeService.getSelectedIncomeFromService(this.userId).subscribe((data) => (this.income = data));
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

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    
  }





  






}
