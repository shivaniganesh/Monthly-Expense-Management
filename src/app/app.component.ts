import { Component } from '@angular/core';
import * as $ from 'jquery';
declare const myFun:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'monthlyexp';


  //way to implement jQuery and external js in angular
//  btnClick(){
//   //  $("box1").slideToggle(2000);
//    myFun();
   
//  }

 ngOnInit(): void {
  // $( "button" ).click(function() {
  //   $( "p" ).toggle();
  // });

  // $( "#btn" ).click(function(){
  //   $("#box").slideToggle();
  // });

 }

}
