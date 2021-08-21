import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IncomeserviceService } from '../services/incomeservice.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {
  display = "none";
     

  income: any=[];

  @Input() showMePartially: boolean | undefined;
  
  
  constructor(public router: Router,
    public aroute: ActivatedRoute,
    public restApi: IncomeserviceService) {}


  ngOnInit(): void {
    this.loadIncome();
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
  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }

}
