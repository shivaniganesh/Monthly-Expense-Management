import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { User } from '../../classes/user';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  msg="";
  userData=new User();
  user=new User();
  display = "none";

  // userData:any=[];
  
  email:any=localStorage.getItem('credentialEmail');
   data= {
    "email": this.email
          }

          
  
  
  constructor(public aroute:ActivatedRoute,public restApi: LoginService, public router: Router) { }
    

  ngOnInit(): void {
      
       this.restApi.getUserByEmailId(this.data).subscribe((data: any)=>this.userData=data);
  }
  

  userProfile(){
    this.restApi.editUser(this.userData).subscribe(
      res=>{
        console.log("Response received");
        this.msg="Update Sucessful!!";
        this.router.navigate(['/dashboard']);
        console.log(this.userData);
        
      },
      error=>{
        console.log("Exception Occured");
        console.error();
        this.msg=error.status+ " " +error.message;
        
        ;
        
      }
    )
}
updateUser() {
  if (window.confirm('Are you sure , you want to update?')) {
    this.restApi.editUser(this.user).subscribe((data: {}) => {
      this.ngOnInit();
    });

  }
}
openModal() {
  this.display = "block";
}
onCloseHandled() {
  this.display = "none";
  this.ngOnInit();
}
deleteProfile(userId: any) {
  return this.restApi.deleteProfile(userId).subscribe((data) => {
    window.confirm("Do you want to Delete this account?")
    localStorage.removeItem('token');
    window.location.reload();
  });
}
}


