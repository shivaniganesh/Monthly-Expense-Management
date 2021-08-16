import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddincomeComponent } from './addincome/addincome.component';
import { EditincomeComponent } from './editincome/editincome.component';
import { AddexpenseComponent } from './addexpense/addexpense.component';
import { EditexpenseComponent } from './editexpense/editexpense.component';
import { AdduserComponent } from './adduser/adduser.component';
import { EdituserComponent } from './edituser/edituser.component';
import { DeleteuserComponent } from './deleteuser/deleteuser.component';

@NgModule({
  declarations: [
    AppComponent,
    AddincomeComponent,
    EditincomeComponent,
    AddexpenseComponent,
    EditexpenseComponent,
    AdduserComponent,
    EdituserComponent,
    DeleteuserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
