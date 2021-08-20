import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  active = 1;
  btn=false;
  myStyle={
    
    display:"none",
  }
public loggedIn=false;
  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
    this.loggedIn=this.loginService.isLoggedIn()
  }
  logout(){
    this.loginService.logout();
    window.location.href="";
  }
  dashBoard(){
    window.location.href="/home";
  }
  btnClick(){
    this.btn=true;
  }
  closeModel(){
    this.myStyle.display="none";
  }
  openModel(){
    this.myStyle.display="block";
  }

}
