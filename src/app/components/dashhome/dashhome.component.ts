import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Expense } from 'src/app/classes/expense';
import { ExpenseserviceService } from 'src/app/services/expenseservice.service';
import { IncomeService } from 'src/app/services/income.service';



@Component({
  selector: 'app-dashhome',
  templateUrl: './dashhome.component.html',
  styleUrls: ['./dashhome.component.css']
})
export class DashhomeComponent implements OnInit {
  @Input() totalamount=0;
  @Input() totalamountinc=0;
  @Input() expense: any=[];
  @Input() income: any=[];
  @Input() showDashHome: boolean | undefined;
  transaction = 0;

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
    public restApi: ExpenseserviceService,
    public restApi1: IncomeService,
    private httpService: HttpClient) { }
  

  ngOnInit(): void {
    this.loadExpense();
    this.getTotalExp();
    this.loadIncome();
    this.getTotalInc();
    // this.httpService.get('');
    // this.showAlert();
    
    
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

  loadIncome() {
    return this.restApi1
      .getIncomes()
      .subscribe((data) => (this.income = data));
  }
  getTotalInc() {
    let totalinc = 0;
    for (var j = 0; j < this.income.length; j++) {
        console.log(this.income.length);
        if (this.income[j].incomeAmount) {
            totalinc += this.income[j].incomeAmount;
            this.totalamountinc = totalinc;
        }
    }
    return this.totalamountinc;
}

// showAlert() {
  
//   if(this.getTotalExp() === this.getTotalInc()){
//     console.log('This will always executed.');
//     console.log(`${this.getTotalExp()} hello`);
//     window.confirm('Negative Balance!');
//   }else{
//     console.log((this.getTotalInc() - this.getTotalExp()) + 'hellloo');
//     window.alert('testwindow');
//   }
// }



  // Pie
  public pieChartLabels:string[] = ['Chrome', 'Safari', 'Firefox','Internet Explorer','Other'];
  public pieChartData:number[] = [40, 20, 20 , 10, 10];
  public pieChartType:any = 'doughnut';
  
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
  public options: any = {
    responsive: true,
    showAllTooltips:true,
    legend: {
      display: true,
      labels: {
        fontColor: 'black'
      },
      position:'bottom'
    },
    pieceLabel: {
      render: function (args: any) {
        const label = args.label,
              value = args.value;
        return label + ' = ' + value;
      }
    }
  }




  
  
}
