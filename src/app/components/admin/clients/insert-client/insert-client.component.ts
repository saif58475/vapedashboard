import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ClientsService } from './../../../../shared/API-Service/services/clients.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-insert-client',
  templateUrl: './insert-client.component.html',
  styleUrls: ['./insert-client.component.css']
})
export class InsertClientComponent implements OnInit {
ClientForm:FormGroup;
button:boolean = false;
update:boolean = false;
recordtoupdate:any;

Gender:object [] = [
  { id:1, value: 'ذكر'},
  { id:2, value: 'انثى'}
];
  constructor( private _ClientsService:ClientsService
             , private _Router:Router
             , private _FormBuilder:FormBuilder ) { }

  ngOnInit(): void {
    this._ClientsService.Data.subscribe((res) => {
      if( res != null){
        this.initiate(res);
        this.recordtoupdate = res;
        debugger
        this.update = true;
      }else{
        this.initiate();
      }
    })
  }

  initiate(data?:any){
    this.ClientForm = this._FormBuilder.group({
      clientName: [data?.clientName || '', Validators.required],
      password: [data?.password || '', Validators.required],
      phone: [data?.phone || '', Validators.required],
      gender: [data?.gender || '', Validators.required],
      location: [data?.location || '', Validators.required],
      email: [data?.email || '', Validators.required],
      role_id: [1, Validators.required]
    });
  }
  get fc(){
    return this.ClientForm.controls;
  }

  onSubmit(){
    this.button = true;
    if( this.ClientForm.status == "VALID" && this.update == false){
      this._ClientsService.addClient(this.ClientForm.value).subscribe((res) => {
        Swal.fire({
         icon: "success",
         title: "تم تسجيل العميل بنجاح",
         showConfirmButton: false,
         timer: 1500,
       }); 
       this.ClientForm.reset();
       this._Router.navigate(['content/admin/ViewClient']);
       },(err) => {
        this.button = false;
             Swal.fire({
               icon: 'error',
               title: 'خطأ',
               text: err.error.message,
             });
             this.button = false;
       })
    }else if (this.ClientForm.status == "VALID" && this.update == true){
      this._ClientsService.updateClient(this.ClientForm.value, this.recordtoupdate.client_id).subscribe((res) => {
        Swal.fire({
          icon: "success",
          title: "تم تعديل العميل بنجاح",
          showConfirmButton: false,
          timer: 1500,
        }); 
        this.ClientForm.reset();
        this._Router.navigate(['content/admin/ViewClient']);
        })
      }
    else{
      this.button = false;
             Swal.fire({
               icon: 'error',
               title: 'خطأ',
               text: 'تأكد من ملئ جميع الخانات',
             });
             this.button = false;
    }
   
}

ngOnDestroy(){
  this._ClientsService.Data.next(null);
}
}
