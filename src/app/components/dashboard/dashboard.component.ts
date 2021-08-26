import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { productSales, productSalesMulti } from 'src/app/data/products'
import { ExpenseService } from 'src/app/services/expense.service';
import { LoginService } from '../../services/login.service';
import { IncomeService } from '../../services/income.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userId:any;
  incomes:any=[];
  expenses:any=[];
  productSales: any[] | undefined
  productSalesMulti: any[] | undefined
  expenseData:any=[];
  incomeData:any=[];

  view: any[] = [700, 370];
  userData:any=[];
  constructor( 
    public router: Router,
    public aroute: ActivatedRoute,
    public expenseService: ExpenseService, public loginService:LoginService,
    public incomeService:IncomeService
  ) { Object.assign(this, { productSales, productSalesMulti }); }

  email:any=localStorage.getItem('credentialEmail');
  data= {
   "email": this.email
         }
  ngOnInit(): void {


      this.loginService.getUserByEmailId(this.data).subscribe((data: any)=>{this.userData=data;
        console.log( "from dashboard"+this.userData);
        this.userId=this.userData.userId;
        localStorage.setItem('userId',this.userData.userId);
        this.loadIncome(this.userId);
      });
    }

  // options
  legendTitle: string = 'Products';
  legendTitleMulti: string = 'Months';
  legendPosition: string = 'below'; // ['right', 'below']
  legend: boolean = true;

  xAxis: boolean = true;
  yAxis: boolean = true;

  yAxisLabel: string = 'Sales';
  xAxisLabel: string = 'Products';
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;

  maxXAxisTickLength: number = 30;
  maxYAxisTickLength: number = 30;
  trimXAxisTicks: boolean = false;
  trimYAxisTicks: boolean = false;
  rotateXAxisTicks: boolean = false;
  timeline: boolean = true;
  isDoughnut: boolean = true;
  showLabels:boolean=true;

  xAxisTicks: any[] = ['Genre 1', 'Genre 2', 'Genre 3', 'Genre 4', 'Genre 5', 'Genre 6', 'Genre 7']
  yAxisTicks: any[] = [100, 1000, 2000, 5000, 7000, 10000]

  animations: boolean = true; // animations on load

  showGridLines: boolean = true; // grid lines

  showDataLabel: boolean = true; // numbers on bars

  gradient: boolean = false;
  colorScheme = {
    domain: ['#704FC4', '#4B852C', '#B67A3D', '#5B6FC8', '#25706F']
  };
  schemeType: string = 'ordinal'; // 'ordinal' or 'linear'

  activeEntries: any[] = ['book']
  barPadding: number = 5
  tooltipDisabled: boolean = false;

  yScaleMax: number = 9000;

  roundEdges: boolean = false;



  onSelect(event: any) {
    console.log(event);
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  formatString(input: string): string {
    return input.toUpperCase()
  }

  formatNumber(input: number): number {
    return input
  }



  loadIncome(userId) {

    return this.incomeService.getSelectedIncomeFromService(userId).subscribe((data) => {
      // (this.incomes = data)
      for(const i of data){
        this.incomes.push(i);
      }
      this.incomes=[...this.incomes];
      
      console.log('From  income dashboard '+JSON.stringify(this.incomes));
    
    });
  }
  loadExpense(userId) {

    return this.expenseService.getSelectedExpenseFromService(userId).subscribe((data) => {
      // (this.incomes = data)
      if(data==null|| data == [])
      console.log("Data is empty");
      else
     {
      for(const i of data){
        this.expenses.push(i);
        
      }
      this.expenses=[...this.expenses];
      console.log(this.expenses);
     }
    
    });
  }

}
