import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { CarsService } from './../../../../shared/API-Service/services/cars.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-insert-cars',
  templateUrl: './insert-cars.component.html',
  styleUrls: ['./insert-cars.component.css']
})
export class InsertCarsComponent implements OnInit {
  CarForm:FormGroup;
  CarFromData:FormData;
  imgbase:string = "https://vap.softwaresbuilders.com/public/";
  Image:File []=[];
  images:string []=[];
  update:boolean = false;
  button:boolean = false;
  recordtoupdate:any;
  flags:Object [] = [
    { name:'متاحة', value : 1},
    { name:'غير متاحة', value : 0}
  ]; 
  constructor(private _CarsService:CarsService
             ,private _Router:Router
             ,private _FormBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.check();
  }
  check(){
    this._CarsService.updatecar.subscribe((res) => {
      if( res != null){
        this.recordtoupdate = res;
        res.carImage.forEach(element => {
          this.images.push(this.imgbase + element);
        });
     this.initiate(res);
     this.update = true;
      }else{
    this.initiate();
      }
    })
  }
  initiate(data?:any){
    this.CarForm = this._FormBuilder.group({
      nameEn: [data?.nameEn || '', Validators.required],
      nameAr: [data?.nameAr || '', Validators.required],
      description: [data?.description || '', Validators.required],
      price: [data?.price || '', Validators.required],
      flag: [data?.flag || '', Validators.required],
      vip:[ data?.vip || '', Validators.required],
      offer:[ data?.offer || '', Validators.required]
    });
  }
 
  get fc(){
    return this.CarForm.controls;
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
  this.CarFromData = new FormData();
  this.CarFromData.append("nameEn", this.CarForm.value.nameEn);
  this.CarFromData.append("nameAr", this.CarForm.value.nameAr);
  this.CarFromData.append("description", this.CarForm.value.description);
  this.CarFromData.append("price", this.CarForm.value.price);
  this.CarFromData.append("flag", this.CarForm.value.flag);
  this.CarFromData.append("vip", this.CarForm.value.vip);
  this.CarFromData.append("offer", this.CarForm.value.offer);
  this.Image.forEach(element => {
    this.CarFromData.append("carImages[]", element);      
  });}  


  onSubmit(){
    this.button = true;
    if( this.CarForm.status == "VALID" && this.update == false){
      this.appenddata();
      this._CarsService.CreateCar(this.CarFromData).subscribe((res) => {
        Swal.fire({
         icon: "success",
         title: "تم تسجيل السيارة بنجاح",
         showConfirmButton: false,
         timer: 1500,
       }); 
       this.CarForm.reset();
       this._Router.navigate(['content/admin/ViewCar']);
       },(err) => {
        this.button = false;
             Swal.fire({
               icon: 'error',
               title: 'خطأ',
               text: err.error.message,
             });
             this.button = false;
       })
    }else if(this.CarForm.status == "VALID" && this.update == true){
      this.appenddata();
      this._CarsService.UpdateCar(this.CarFromData, this.recordtoupdate.car_id).subscribe((res) => {
        Swal.fire({
         icon: "success",
         title: "تم التعديل بنجاح",
         showConfirmButton: false,
         timer: 1500,
       }); 
       this.CarForm.reset();
       this._Router.navigate(['content/admin/ViewCar']);
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
    this._CarsService.updatecar.next(null);
  }
}
