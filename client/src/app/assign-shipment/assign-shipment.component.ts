import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
// import { AuthService } from '../../../services/auth.service';
// import { HttpService } from '../../../services/http.service';
import { AuthService } from '../../services/auth.service';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-assign-shipment',
  templateUrl: './assign-shipment.component.html',
  styleUrls: ['./assign-shipment.component.scss']
})
export class AssignShipmentComponent implements OnInit {

  showError: boolean = false;
  errorMessage: any;
  cargList: any[] = [];
  assignModel: any = {};
  driverList: any[] = [];
  showMessage: any;
  responseMessage: any;
  showMessageBox: boolean = false;
  searchQuery!: string;
  selectedStatus!: string;

  constructor(public router: Router, public httpService: HttpService, private formBuilder: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.getCargo();
    this.getDrivers();
    this.assignModel.driverId = null;
  }
  
getCargo() {
      this.cargList=[];
      this.httpService.getCargo().subscribe((data: any) => {
        this.cargList=data;
        console.log(this.cargList);
      }, error => {
        this.showError = true;
        this.errorMessage = "An error occurred while logging in. Please try again later.";
        console.error('Login error:', error);
      });;
    }


  getDrivers() {
    this.driverList = [];
    this.httpService.getDrivers().subscribe((data: any) => {
      this.driverList = data;
      console.log(this.driverList);
    }, error => {
      this.showError = true;
      this.errorMessage = "An error occurred while fetching driver data. Please try again later.";
      console.error('Driver fetch error:', error);
    });
  }

  assignDriver() {
    if (this.assignModel.driverId != null) {
      this.showMessage = false;
      this.responseMessage = '';
      this.httpService.assignDriver(this.assignModel.driverId, this.assignModel.cargoId).subscribe((data: any) => {
        this.showMessage = true;
        this.responseMessage = data.message;
        const cargo = this.cargList.find((c: { id: any; }) => c.id === this.assignModel.cargoId);
        if (cargo) {
          cargo.assigned = true;
          cargo.showDriverDropdown = false;
        }
      }, error => {
        this.showError = true;
        this.errorMessage = "An error occurred while assigning the driver. Please try again later.";
        console.error('Driver assignment error:', error);
      });
    }
  }
}