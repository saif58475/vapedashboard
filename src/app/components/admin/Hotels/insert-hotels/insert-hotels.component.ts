import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HotelsService} from './../../../../shared/API-Service/services/hotels.service';
import { Router } from '@angular/router';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-insert-hotels',
  templateUrl: './insert-hotels.component.html',
  styleUrls: ['./insert-hotels.component.css']
})
export class InsertHotelsComponent implements OnInit {
HotelForm:FormGroup;
HotelFormData:FormData;
imgbase:string = "https://vap.softwaresbuilders.com/public/";
update:boolean = false;
button:boolean = false;
images:string [] = [];
Image:File []=[];
recordtoupdate:any;
  constructor(private _FormBuilder:FormBuilder
             ,private _HotelsService:HotelsService
             ,private _Router:Router) { }

  ngOnInit(): void {
    this.check();
  }
 check(){
    this._HotelsService.updatehotel.subscribe((res) => {
       if( res != null ){
        this.recordtoupdate = res;
        res.hotelImage.forEach(element => {
          this.images.push(this.imgbase + element);
        });        
        this.initiate(this.recordtoupdate);
        this.update = true;
      }else{
        this.initiate();
      }
    })
  }
  initiate(data?:any){
    this.HotelForm = this._FormBuilder.group({
      hotelName: [data?.hotelName || '', Validators.required],
      roomType: [data?.roomType || '', Validators.required],
      sleeps: [data?.sleeps || '', Validators.required],
      price: [data?.price || '', Validators.required],
      description: [data?.description || '', Validators.required],
      vip:[ data?.vip || '', Validators.required],
      offer:[ data?.offer || '', Validators.required]
    });
  }
  get fc(){
    return this.HotelForm.controls;
  }
   // imgFile
   getLogoUrl(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.Image.push(event.target.files[0]);
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.images.push(reader.result as string);
      };
    }
  }
  appenddata(){
    this.HotelFormData = new FormData();
    this.HotelFormData.append("hotelName", this.HotelForm.value.hotelName);
    this.HotelFormData.append("roomType", this.HotelForm.value.roomType);
    this.HotelFormData.append("sleeps", this.HotelForm.value.sleeps);
    this.HotelFormData.append("price", this.HotelForm.value.price);
    this.HotelFormData.append("vip", this.HotelForm.value.vip);
    this.HotelFormData.append("offer", this.HotelForm.value.offer);
    this.HotelFormData.append("description", this.HotelForm.value.description);
    this.Image.forEach(element => {
      this.HotelFormData.append("hotelImages[]", element);      
    });
  }

  onSubmit(){
    this.button = true;
    if( this.HotelForm.status == "VALID" && this.update == false){
      if( this.HotelForm.value.price > this.HotelForm.value.offer){
        this.appenddata();
        this._HotelsService.CreateHotel(this.HotelFormData).subscribe((res) => {
          Swal.fire({
           icon: "success",
           title: "تم تسجيل الفندق بنجاح",
           showConfirmButton: false,
           timer: 1500,
         }); 
         this.HotelForm.reset();
         this._Router.navigate(['content/admin/ViewHotel']);
         },(err) => {
          this.button = false;
               Swal.fire({
                 icon: 'error',
                 title: 'خطأ',
                 text: err.error.message,
               });
               this.button = false;
         })
      }else{
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: 'لا يمكن ان يكون سعر العرض اكثر من السعر الفعلي',
        });
        this.button = false;
      }
      
    }else if(this.HotelForm.status == "VALID" && this.update == true){
       this.appenddata()
       this._HotelsService.UpdateHotel(this.HotelFormData , this.recordtoupdate.hotel_id).subscribe((res) => {
        Swal.fire({
         icon: "success",
         title: "تم التعديل الفندق بنجاح",
         showConfirmButton: false,
         timer: 1500,
       }); 
       this.HotelForm.reset();
       this._Router.navigate(['content/admin/ViewHotel']);
       },(err) => {
        this.button = false;
             Swal.fire({
               icon: 'error',
               title: 'خطأ',
               text: err.error.message,
             });
             this.button = false;
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
  this._HotelsService.updatehotel.next(null);
}
}
