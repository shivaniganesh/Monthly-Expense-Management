import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-emicalculator',
  templateUrl: './emicalculator.component.html',
  styleUrls: ['./emicalculator.component.css']
})
export class EmicalculatorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    document.getElementById('calc').addEventListener('click',()=>{
           
     // var p=Number(document.getElementById('Amount').value);
      var p=Number($('#Amount').val());
      //var t=Number(document.getElementById('year').value)*12;
      var t=Number($('#year').val())*12;
      //var r=Number(document.getElementById('rate').value)/1200;
      var r=Number($('#year').val())/1200;
      let a=Math.pow((1+r), t);
      let b=(Math.pow((1+r), t)-1)
      let emi=p*r*a/b;
       emi=Math.round(emi);
      document.getElementById('result').innerText=""+ emi +" per month." ;
      document.getElementById('span').style.display="block";
  

  });
  $('#calc').dblclick(()=>{
      $('#span').toggle();
  });
  }

}
