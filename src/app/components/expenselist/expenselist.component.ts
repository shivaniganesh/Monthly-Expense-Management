import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Expense } from 'src/app/classes/expense';
import { ExpenseService } from '../../services/expense.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-expenselist',
  templateUrl: './expenselist.component.html',
  styleUrls: ['./expenselist.component.css']
})
export class ExpenselistComponent implements OnInit {
  // datePickerConfig:Partial<BsDatepickerConfig> | undefined;
  btnClick=true;
  expenseData= new Expense();
  expenses:any=[];
  btnValue="Add Expense";

  constructor(
    public router: Router,
    public aroute: ActivatedRoute,
    public restApi: ExpenseService
  ) { }

  ngOnInit(): void {
    this.loadExpense();
   
    $( "#slide" ).click(function() {
      let btnValue="Add Expense";
      $( "#box" ).slideToggle(2000);
    });
   
  }
  displayHide(){
    
    // this.btnClick==false?this.btnClick=true :this.btnClick=false;
    // this.btnClick==false?this.btnValue="Hide Expense":this.btnValue="Add Expense";
    
    
  }

  loadExpense() {
    return this.restApi.getExpenseFromService().subscribe((data) => (this.expenses = data));
  }
  deleteExpense(id :any) {
    return this.restApi.deleteExpense(id).subscribe((data) => {
      this.loadExpense();
    });
  }
  display = "none";
  @Input() 
  modal: boolean | undefined;
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
  addExpense(){
    this.restApi.createExpense(this.expenseData).subscribe(data=>{
      window.location.reload();
    
    })
  }

  
  
}
