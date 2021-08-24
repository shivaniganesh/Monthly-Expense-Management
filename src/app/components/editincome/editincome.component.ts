import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IncomeService } from '../../services/income.service';


@Component({
  selector: 'app-editincome',
  templateUrl: './editincome.component.html',
  styleUrls: ['./editincome.component.css']
})
export class EditincomeComponent implements OnInit {
  incomeData:any=[];
  incomeId:any=this.aroute.snapshot.params['incomeId'];
  constructor(public aroute:ActivatedRoute,public restApi: IncomeService, public router: Router,
    
    ) { }

    ngOnInit(): void {
      this.restApi.getIncome(this.incomeId).subscribe(data=>this.incomeData=data);
  }
  editIncome(){
    this.restApi.editIncome(this.incomeData).subscribe((data:{})=>{
        this.router.navigate(['/income']);
    })
  }
}