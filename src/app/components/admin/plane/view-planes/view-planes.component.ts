import { Component, OnInit } from '@angular/core';
import { PlanesService } from './../../../../shared/API-Service/services/planes.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-view-planes',
  templateUrl: './view-planes.component.html',
  styleUrls: ['./view-planes.component.css']
})
export class ViewPlanesComponent implements OnInit {
planes:any [];
title='pagination';
  page: number = 1;
    count :number = 0 ;
    tableSize: number = 20;
  constructor(private _PlanesService:PlanesService
             ,private _Router:Router) { }

  ngOnInit(): void {
    this.getplanes();
  }

  getplanes(){
  this._PlanesService.ListPlane().subscribe((res) => {
    this.planes = res.data;
  })
  }
  onTableDataChange(event:any){
    this.page = event;
    this.getplanes();
      }

    update(data){
        this._PlanesService.updateplane.next(data);
        this._Router.navigate(['/content/admin/InsertPlane']);
        }
        delete(id:number){
          Swal.fire({
            title: 'هل تريد مسح الكافية ؟',
            text: "لن يكون لك صلاحية إعادته مره اخرى",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'الغاء',
            confirmButtonText: 'امسح العنصر !'
          }).then((result) => {
            if (result.isConfirmed) {
              this._PlanesService.DeletePlane(id).subscribe((res) => {
                Swal.fire({
                  icon: "success",
                  title: "تم المسح بنجاح",
                  showConfirmButton: false,
                  timer: 1500,
                });
             this.getplanes();
              },(err) => {
                Swal.fire({
                  icon: 'error',
                  title: 'خطأ',
                  text:err.error.message    
                })
             this.getplanes();
              },() => {
                console.log("completed");
              })
            }
          }) 
        }
}
