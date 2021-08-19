import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  user=new User();
  msg="";
  errorMessage="";
  constructor(private loginService:LoginService,private aroute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }
  resetPassword(){
      this.loginService.resetPasswordFromRemote(this.user).subscribe(
        res=>{
          console.log("response received");
          this.msg="Password Updated sucessfully!";
        },
        err=>{
          console.log("Exception Occured");
          this.errorMessage= " Email doesn't exists ,Please check your email carefully!!";
        }
      )

  }
}
