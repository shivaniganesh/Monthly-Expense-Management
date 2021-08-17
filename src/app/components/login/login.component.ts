import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials={
    email:'',
    password:'',
  }
  message="";
  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
  }
  onSubmit(){
    console.log("form submitted sucessfully");
    if((this.credentials.email!='' && this.credentials.password!='') && (this.credentials.email!=null && this.credentials.password)){
      console.log('we have to pass form data to server');
      this.loginService.generateToken(this.credentials).subscribe(
        (response:any)=>{
          //if token generate sucessfully then login
          console.log(response.token);
          this.loginService.loginUser(response.token);
          window.location.href="/dashborad";
        },
        error=>{console.error();
        }
        
      );
    }else{
      console.log("Empty value entry")
      this.message="Please fill the data before login"
      
    }
  }

}
