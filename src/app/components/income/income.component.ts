import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Income } from 'src/app/classes/income';
import { IncomeService } from '../../services/income.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {
  incomeData= new Income();
  incomes:any=[];
  btnValue="Add Income";
  constructor( 
    public router: Router,
    public aroute: ActivatedRoute,
    public restApi: IncomeService
  ) { }

  ngOnInit(): void {
    this.loadIncome();
    $( "#slide1" ).click(function() {
      let btnValue="Add Income";
      $( "#box1" ).slideToggle(1000);
    });
  }
  
  loadIncome() {
    return this.restApi.getIncomeFromService().subscribe((data) => (this.incomes = data));
  }
  deleteIncome(id :any) {
    return this.restApi.deleteIncome(id).subscribe((data) => {
      this.loadIncome();
    });
  }

 
  addIncome(){
    this.restApi.createIncome(this.incomeData).subscribe(data=>{
      window.location.reload();
    
    })
  }


}
