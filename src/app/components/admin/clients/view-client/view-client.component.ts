import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { ClientsService } from './../../../../shared/API-Service/services/clients.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-client',
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.css']
})
export class ViewClientComponent implements OnInit {
Clients:any [];
page: number = 1;
count :number = 0 ;
tableSize: number = 20;
  constructor( private _Router:Router
             , private _ClientsService:ClientsService) { }

  ngOnInit(): void {
    this.GetClients();
  }
  onTableDataChange(event:any){
    this.page = event;
    this.GetClients();
      }
  GetClients(){
    this._ClientsService.ListClients().subscribe((res) => {
     this.Clients = res.data;
    })
  }

  update(data:object){
   this._ClientsService.Data.next(data);
   this._Router.navigate(['content/admin/InsertClient']);
  }

  delete(id:number){
    Swal.fire({
      title: 'هل تريد مسح العميل ؟',
      text: "لن يكون لك صلاحية إعادته مره اخرى",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'الغاء',
      confirmButtonText: 'امسح العنصر !'
    }).then((result) => {
      if (result.isConfirmed) {
        this._ClientsService.deleteClient(id).subscribe((res) => {
          Swal.fire({
            icon: "success",
            title: "تم المسح بنجاح",
            showConfirmButton: false,
            timer: 1500,
          });
       this.GetClients();
        },(err) => {
          Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text:err.error.message    
          })
       this.GetClients();
        },() => {
          console.log("completed");
        })
      }
    }) 
  }
}
