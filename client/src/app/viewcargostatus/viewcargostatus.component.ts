import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-viewcargostatus',
  templateUrl: './viewcargostatus.component.html',
  styleUrls: ['./viewcargostatus.component.scss']
})
export class ViewcargostatusComponent {

   cargo:any ={};  
   showError: any;  
   errorMessage: any;  
   cargoIdMd: any;  
   searchMade: any;  
   cargoDetails:any={};
   
   constructor(private httpService: HttpService) {  }  
   
   ngOnInit(): void {    }
    // this.getAllCargo();  }  

    // getAllCargo() {    
    //   this.cargo = this.httpService.getCargo();  
    // }  
      
     search()
       {
         this.showError = false;
         debugger;
         if(this.cargoIdMd!=null)
         {
           this.cargo={};
           this.httpService.getOrderStatus(this.cargoIdMd).subscribe((data: any) => {
             this.cargo=data;
             console.log(this.cargo);
           });
         
         
       }
}
}
  //todo: complete missing code..


