import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { VacationService } from './../../../../shared/API-Service/services/vacation.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-vacation',
  templateUrl: './view-vacation.component.html',
  styleUrls: ['./view-vacation.component.css']
})
export class ViewVacationComponent implements OnInit {
vacations:any [];
title='pagination';
  page: number = 1;
    count :number = 0 ;
    tableSize: number = 20;
  constructor(private _VacationService:VacationService
             ,private _Router:Router) { }

  ngOnInit(): void {
    this.getVacations();
  }

  getVacations(){
    this._VacationService.ListVacation().subscribe((res) => {
      this.vacations = res.data;
    })
  }
  onTableDataChange(event:any){
    this.page = event;
    this.getVacations();
      }
  update(data){
  this._VacationService.updatevacation.next(data);
  this._Router.navigate(['/content/admin/InsertVacation']);
  }
  delete(id){
    Swal.fire({
      title: 'هل تريد مسح الفسحة ؟',
      text: "لن يكون لك صلاحية إعادته مره اخرى",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'الغاء',
      confirmButtonText: 'امسح العنصر !'
    }).then((result) => {
      if (result.isConfirmed) {
        this._VacationService.DeleteVacation(id).subscribe((res) => {
          Swal.fire({
            icon: "success",
            title: "تم المسح بنجاح",
            showConfirmButton: false,
            timer: 1500,
          });
       this.getVacations();
        },(err) => {
          Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text:err.error.message    
          })
       this.getVacations();
        },() => {
          console.log("completed");
        })
      }
    }) 
   }
}
