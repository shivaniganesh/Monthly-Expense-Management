import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Expense } from 'src/app/classes/expense';
import { Income } from 'src/app/classes/income';
import { ExpenseService } from 'src/app/services/expense.service';
import { IncomeService } from 'src/app/services/income.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  email: any = localStorage.getItem('credentialEmail');
  data = {
    "email": this.email
  }
  userData: any = [];
  expenseData = new Expense();
  incomeData= new Income();
  fname:any;
  lname:any;
  
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  showIncome: boolean = false;
  showExpense: boolean = false;
  showDhome: boolean = true;
  ngOnInit(): void {
    this.loginService.getUserByEmailId(this.data).subscribe((data: any) => {
      this.userData = data;
      //console.log(this.userData.userId);
      this.expenseData.user = this.userData;
      this.incomeData.user=this.userData;
      this.fname=this.userData.fname;
      this.lname=this.userData.lname;
      //console.log(this.userName);
      localStorage.setItem("userId",this.userData.userId);
    
    });
  }y

  showDashHomePg() {
    
    window.location.reload();
    this.showExpense = false;
    this.showExpense = false;
    this.showDhome = true;
  }
  showExpenseTable() {
    
    this.showDhome = false;
    //this.router.navigate(['expenselist']);
    this.showExpense=true;
    this.showIncome=false;
    
    
  }
  showIncomeTable() {
    this.showDhome = false;
     this.showIncome = true;
     this.showExpense=false;
    
    //this.router.navigate(['/income']);
    
  }
  constructor(private observer: BreakpointObserver,public router: Router,
    public expenseService: ExpenseService,
    public incomeService: IncomeService, public loginService: LoginService,
    
    ) {}

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res:any) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }
}


