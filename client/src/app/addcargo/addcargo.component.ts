import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-addcargo',
  templateUrl: './addcargo.component.html',
  styleUrls: ['./addcargo.component.scss']
})
export class AddcargoComponent implements OnInit{
  itemForm!:FormGroup;
  formModel:any={status:null};
  showError:boolean=false;
  errorMessage:any;
  cargList:any[]=[];
  assignModel:any={};
  driverList:any[]=[];
  showMessgae:any;
  responseMessage:any;

  constructor(private router:Router,private httpService:HttpService,private fb:FormBuilder,private authService:AuthService){
    this.itemForm=this.fb.group({
      content:['',Validators.required],
      size:['',Validators.required],
      status:['',Validators.required]
    })
  }
  
  ngOnInit(): void {
    this.getCargo();
  }

  getCargo() {
      this.httpService.getCargo().subscribe(
        (data: any) => {
          this.cargList = data;
        },
        (error: any) => {
          this.showError = true;
          this.errorMessage = error.message;
        }
      );
    }

  getDrivers() {
      this.httpService.getDrivers().subscribe(
        (data: any) => {
          this.driverList = data;
        },
        (error: any) => {
          this.showError = true;
          this.errorMessage = error.message;
        }
      );
    }

  
onSubmit() {
    if (this.itemForm.valid) {
      this.httpService.addCargo(this.itemForm.value).subscribe(
        (response: any) => {
          this.responseMessage = 'Cargo added successfully!';
          this.router.navigate(['/cargo-list']);
        },
        (error: any) => {
          this.showError = true;
          this.errorMessage = error.message;
        }
      );
    } else {
      this.showError = true;
      this.errorMessage = 'Please fill all required fields.';
    }
  
}
}
