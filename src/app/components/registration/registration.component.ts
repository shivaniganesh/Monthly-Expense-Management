import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/classes/user';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  msg="";
  user=new User();
  checked=true;

  constructor(private loginService:LoginService,private aroute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  //new user Registration
  onSubmit(){
        if(this.checked){
          this.loginService.registerUserFromRemote(this.user).subscribe(
            res=>{
              console.log("Response received");
              this.msg="Registration Sucessful!!";
              this.router.navigate(['/login']);
              
            },
            error=>{
              console.log("Exception Occured");
              console.error();
              this.msg=error.status+ ` user with ${this.user.email} is already exist`;
              
              ;
              
            }
          )
        }else{
          window.alert("Please Accept the terms and conditions to proceed forward");
        }
  }

}
