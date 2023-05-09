import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { CarsService } from './../../../../shared/API-Service/services/cars.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-cars',
  templateUrl: './view-cars.component.html',
  styleUrls: ['./view-cars.component.css']
})
export class ViewCarsComponent implements OnInit {
cars:any [];
title='pagination';
  page: number = 1;
    count :number = 0 ;
    tableSize: number = 20;
  constructor(private _CarsService:CarsService
             ,private _Router:Router) { }

  ngOnInit(): void {
    this.getCars(); 
  }

  getCars(){
    this._CarsService.ListCar().subscribe((res) => {
      this.cars = res.data;
    })
  }
 
  onTableDataChange(event:any){
    this.page = event;
    this.getCars();
      }
  update(data){
  this._CarsService.updatecar.next(data);
  this._Router.navigate(['/content/admin/InsertCar']);
  }
  delete(id){
    Swal.fire({
      title: 'هل تريد مسح السيارة ؟',
      text: "لن يكون لك صلاحية إعادته مره اخرى",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'الغاء',
      confirmButtonText: 'امسح العنصر !'
    }).then((result) => {
      if (result.isConfirmed) {
        this._CarsService.DeleteCar(id).subscribe((res) => {
          Swal.fire({
            icon: "success",
            title: "تم المسح بنجاح",
            showConfirmButton: false,
            timer: 1500,
          });
       this.getCars();
        },(err) => {
          Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text:err.error.message    
          })
       this.getCars();
        },() => {
          console.log("completed");
        })
      }
    }) 
   }
}
