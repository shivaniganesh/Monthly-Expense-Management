import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RegistrationComponent } from './components/registration/registration.component';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ResetComponent } from './components/reset/reset.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {MatListModule} from '@angular/material/list';
import { BeinspiredComponent } from './components/beinspired/beinspired.component';
import { ExpenseService } from './services/expense.service';
import { IncomeService } from './services/income.service';
import { LoginService } from './services/login.service';
import { ExpenselistComponent } from './components/expenselist/expenselist.component';
import { EditexpenseComponent } from './components/editexpense/editexpense.component';
import {MatSelectModule} from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { UserprofileComponent } from './components/userprofile/userprofile.component';

import { AccumulationChartModule } from '@syncfusion/ej2-angular-charts';
import { PieSeriesService} from '@syncfusion/ej2-angular-charts';


 



import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { ExpenseComponent } from './expense/expense/expense.component';
import { ExpenseserviceService } from './services/expenseservice.service';
import { DashhomeComponent } from './components/dashhome/dashhome.component';
import { ChartsModule, WavesModule } from 'angular-bootstrap-md';
import { LoadingspinnerComponent } from './components/loadingspinner/loadingspinner.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    RegistrationComponent,
    ResetComponent,
    AboutusComponent,
    
    BeinspiredComponent,
         ExpenselistComponent,
         EditexpenseComponent,
         UserprofileComponent,
    ExpenseComponent,
    AboutusComponent,
    DashhomeComponent,
    LoadingspinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatMenuModule,
    MatTableModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,MatListModule,
    MatSelectModule,
    MatChipsModule,
    MatDatepickerModule,
    MatSidenavModule,
    MatDividerModule,
    ChartsModule,
    WavesModule,
    AccumulationChartModule

  ],
  providers: [ExpenseService,ExpenseserviceService,IncomeService,LoginService,PieSeriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
