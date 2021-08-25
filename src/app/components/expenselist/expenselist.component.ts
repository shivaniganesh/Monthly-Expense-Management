import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Expense } from 'src/app/classes/expense';
import { ExpenseService } from '../../services/expense.service';
import * as $ from 'jquery';
import { LoginService } from 'src/app/services/login.service';

declare const date:any;
@Component({
  selector: 'app-expenselist',
  templateUrl: './expenselist.component.html',
  styleUrls: ['./expenselist.component.css']
})
export class ExpenselistComponent implements OnInit {
  datePickerConfig:Partial<BsDatepickerConfig> | undefined;
  btnClick=true;
  expenseData= new Expense();
  expenses:any=[];
  userData:any=[];
  btnValue="Add Expense";
  userId=localStorage.getItem("userId");

  constructor(
    public router: Router,
    public aroute: ActivatedRoute,
    public restApi: ExpenseService, public loginService:LoginService
  ) { this.datePickerConfig=Object.assign({},{containerClass:"theme-dark-blue"},{ dateInputFormat: 'YYYY-MM-DD'}) }

  email:any=localStorage.getItem('credentialEmail');
  data= {
   "email": this.email
         }
  ngOnInit(): void {


      this.loginService.getUserByEmailId(this.data).subscribe((data: any)=>{this.userData=data;
        //console.log(this.userData.userId);
        this.expenseData.user=this.userData;
       // console.log(this.expenseData.user);
       //this.userId=this.userData.userId;
      //  console.log("for user id :"+this.userId);

      });
    
    
   
    $( "#slide" ).click(function() {
      let btnValue="Add Expense";
      $( "#box" ).slideToggle(1000);
      
    });
    this.loadExpense();
  }
  // displayHide(){
    
  //    this.btnClick==false?this.btnClick=true :this.btnClick=false;
  //    this.btnClick==false?this.btnValue="Hide Expense":this.btnValue="Add Expense";
    
    
  // }

  loadExpense() {
    return this.restApi.getSelectedExpenseFromService(this.userId).subscribe((data) =>{ (this.expenses = data)
    
    
    } );
  }
  deleteExpense(id :any) {
    return this.restApi.deleteExpense(id).subscribe((data) => {
      this.loadExpense();
    });
  }
  


  addExpense(){
    this.restApi.createExpense(this.expenseData).subscribe(data=>{
      console.log(this.expenseData);
      this.loadExpense();
      
    
    })
  }

  
  
}
