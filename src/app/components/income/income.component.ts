import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Income } from 'src/app/classes/income';
import { IncomeService } from '../../services/income.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {
  incomeData= new Income();
  incomes:any=[];
  userData:any=[];
  btnValue="Add Income";
  userId=localStorage.getItem("userId");
  constructor( 
    public router: Router,
    public aroute: ActivatedRoute,
    public restApi: IncomeService,
    public loginService:LoginService
  ) { }
  email:any=localStorage.getItem('credentialEmail');
  data= {
   "email": this.email
         }

  ngOnInit(): void {

    this.loginService.getUserByEmailId(this.data).subscribe((data: any)=>{this.userData=data;
      console.log(this.userData);
      this.incomeData.user=this.userData;
      console.log(this.incomeData.user);

    });

    
    this.loadIncome();
    $( "#slide1" ).click(function() {
      let btnValue="Add Income";
      $( "#box1" ).slideToggle(1000);
    });
  }
  
  loadIncome() {
    return this.restApi.getSelectedIncomeFromService(this.userId).subscribe((data) => (this.incomes = data));
  }
  deleteIncome(id :any) {
    return this.restApi.deleteIncome(id).subscribe((data) => {
      this.loadIncome();
    });
  }

 
  addIncome(){
    this.restApi.createIncome(this.incomeData).subscribe(data=>{
      this.loadIncome();
    
    })
  }


}
