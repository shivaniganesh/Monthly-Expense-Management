import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Expense } from 'src/app/classes/expense';
import { ExpenseserviceService } from 'src/app/services/expenseservice.service';

@Component({
  selector: 'app-dashhome',
  templateUrl: './dashhome.component.html',
  styleUrls: ['./dashhome.component.css']
})
export class DashhomeComponent implements OnInit {
  @Input() totalamount=0;
  @Input() expense: any=[];
  @Input() showDashHome: boolean | undefined;

//   public data: Object[] = [    
//     { x: 'JPN', text: 'Japan', y: 5156 },
//     { x: 'DEU', text: 'Germany', y: 3754  },
//     { x: 'FRA', text: 'France', y: 2809 },
//     { x: 'GBR', text: 'UK', y: 2721  },
//     { x: 'BRA', text: 'Brazil', y: 2472  },
//     { x: 'RUS', text: 'Russia', y: 2231 },
//     { x: 'ITA', text: 'Italy', y: 2131  },
//     { x: 'IND', text: 'India', y: 1857  },   
// ];

  
  constructor(public router: Router,
    public aroute: ActivatedRoute,
    public restApi: ExpenseserviceService) { }
  

  ngOnInit(): void {
    this.loadExpense();
    this.getTotalExp();
    
  }

  showexpsummary() {
    this.loadExpense();
    this.getTotalExp();
  }
  loadExpense() {
    return this.restApi
      .getExpenses()
      .subscribe((data) => (this.expense = data));
  }
  getTotalExp() {
    let total = 0;
    for (var i = 0; i < this.expense.length; i++) {
        console.log(this.expense.length);
        if (this.expense[i].expenseAmount) {
            total += this.expense[i].expenseAmount;
            this.totalamount = total;
        }
    }
    return this.totalamount;
}
  
  
}
