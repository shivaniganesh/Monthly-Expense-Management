import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-editexpense',
  templateUrl: './editexpense.component.html',
  styleUrls: ['./editexpense.component.css']
})
export class EditexpenseComponent implements OnInit {
  // datePickerConfig:Partial<BsDatepickerConfig> | undefined;

  expenseData:any=[];
  expenseId:any=this.aroute.snapshot.params['expenseId'];
  constructor(public aroute:ActivatedRoute,public restApi: ExpenseService, public router: Router,
    
    ) { }
    

  ngOnInit(): void {
      this.restApi.getExpense(this.expenseId).subscribe(data=>this.expenseData=data);
  }
  editExpense(){
    this.restApi.editExpense(this.expenseData).subscribe((data:{})=>{
        this.router.navigate(['/expenselist']);
    })
  }
}
