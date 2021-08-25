import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Expense } from 'src/app/classes/expense';
import { ExpenseserviceService } from 'src/app/services/expenseservice.service';
import { IncomeService } from 'src/app/services/income.service';
import { Label } from 'ng2-charts';
import { ChartOptions,ChartType,ChartDataSets } from 'chart.js';
@Component({
  selector: 'app-dashhome',
  templateUrl: './dashhome.component.html',
  styleUrls: ['./dashhome.component.css']
})
export class DashhomeComponent implements OnInit {
  @Input() totalamount=0;
  @Input() expense: any=[];
  @Input() income: any=[];
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
barChartOptions: ChartOptions = {
  responsive: true,
};
barChartLabels: Label[] = ['Apple', 'Banana', 'Kiwifruit', 'Blueberry', 'Orange', 'Grapes'];
barChartType: ChartType = 'bar';
barChartLegend = true;
barChartPlugins = [];

barChartData: ChartDataSets[] = [
  { data: [45, 37, 60, 70, 46, 33], label: 'Best Fruits' }
];

  
  constructor(public router: Router,
    public aroute: ActivatedRoute,
    public restApi: ExpenseserviceService,public restApi1:IncomeService) { }
  

  ngOnInit(): void {
    this.loadExpense();
    this.getTotalExp();
    this.loadIncome();
    this.getTotalInc();
    
  }

  showexpsummary() {
    this.loadExpense();
    this.getTotalExp();
    this.loadIncome();
    this.getTotalInc();
  }
  loadExpense() {
    return this.restApi
      .getExpenses()
      .subscribe((data) => (this.expense = data));
  }
  loadIncome() {
    return this.restApi1
      .getIncomes()
      .subscribe((data) => (this.income = data));
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

getTotalInc() {
  let total = 0;
  for (var i = 0; i < this.income.length; i++) {
      console.log(this.income.length);
      if (this.income[i].incomeAmount) {
          total += this.income[i].incomeAmount;
          this.totalamount = total;
      }
  }
  return this.totalamount;
}
  
  
}
