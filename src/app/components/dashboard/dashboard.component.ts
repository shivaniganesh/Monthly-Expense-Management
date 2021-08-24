import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  showVar: boolean = false;
  showDhome: boolean = true;
  showVar1: boolean = false;
  ngOnInit(): void {
  }

  showDashHomePg() {
    
    window.location.reload();
    this.showVar = false;
    this.showDhome = true;
    this.showVar1 = false;
  }
  showExpenseTable() {
    this.showDhome = false;
    this.showVar = true;
    this.showVar1 = false;
    
  }

  showIncomeTable() {
    this.showDhome = false;
    this.showVar = false;
    this.showVar1 = true;
    
  }
  constructor(private observer: BreakpointObserver,public router: Router) {}

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res:any) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }
}


