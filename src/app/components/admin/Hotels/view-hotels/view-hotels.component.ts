import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotelsService } from './../../../../shared/API-Service/services/hotels.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-hotels',
  templateUrl: './view-hotels.component.html',
  styleUrls: ['./view-hotels.component.css']
})
export class ViewHotelsComponent implements OnInit {
hotels:any [];
title='pagination';
  page: number = 1;
    count :number = 0 ;
    tableSize: number = 20;
  constructor(private _Router:Router
             ,private _HotelsService:HotelsService
             ) { }

  ngOnInit(): void {
    this.gethotels();
  }

gethotels(){
  this._HotelsService.ListHotel().subscribe((res) => {
    this.hotels = res.data;
  })
}
  onTableDataChange(event:any){
    this.page = event;
    this.gethotels();
      }

   updatehotel(data){
    this._HotelsService.updatehotel.next(data);
    this._Router.navigate(['/content/admin/InsertHotel']);
   }   
   delete(id){
    Swal.fire({
      title: 'هل تريد مسح الفندق ؟',
      text: "لن يكون لك صلاحية إعادته مره اخرى",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'الغاء',
      confirmButtonText: 'امسح العنصر !'
    }).then((result) => {
      if (result.isConfirmed) {
        this._HotelsService.DeleteHotel(id).subscribe((res) => {
          Swal.fire({
            icon: "success",
            title: "تم المسح بنجاح",
            showConfirmButton: false,
            timer: 1500,
          });
       this.gethotels();
        },(err) => {
          Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text:err.error.message    
          })
       this.gethotels();
        },() => {
          console.log("completed");
        })
      }
    }) 
   }
}
