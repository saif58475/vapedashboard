import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { VacationService } from './../../../../shared/API-Service/services/vacation.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment.prod';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-insert-vacation',
  templateUrl: './insert-vacation.component.html',
  styleUrls: ['./insert-vacation.component.css']
})
export class InsertVacationComponent implements OnInit {
  VacationForm:FormGroup;
  VacationFromData:FormData;
  Image:File []=[];
  images:string []=[];
  update:boolean = false;
  button:boolean = false;
  recordtoupdate:any;
  constructor(private _VacationService:VacationService
             ,private _Router:Router
             ,private _FormBuilder:FormBuilder) { }

  ngOnInit(): void {
    
    this.check();
  }
  
  check(){
    this._VacationService.updatevacation.subscribe((res) => {
      if( res != null){
        this.recordtoupdate = res;
        this.images = res.vacationImages;
     this.initiate(res);
     this.update = true;
      }else{
    this.initiate();
      }
    })
  }
  initiate(data?:any){
    this.VacationForm = this._FormBuilder.group({
      nameEn: [data?.nameEn || '', Validators.required],
      nameAr: [data?.nameAr || '', Validators.required],
      description: [data?.description || '', Validators.required],
      price: [data?.price || '', Validators.required],
      day_num: [data?.day_num || '', Validators.required],
    });
  }
  get fc(){
    return this.VacationForm.controls;
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
  this.VacationFromData = new FormData();
  this.VacationFromData.append("nameEn", this.VacationForm.value.nameEn);
  this.VacationFromData.append("nameAr", this.VacationForm.value.nameAr);
  this.VacationFromData.append("description", this.VacationForm.value.description);
  this.VacationFromData.append("price", this.VacationForm.value.price);
  this.VacationFromData.append("day_num", this.VacationForm.value.day_num);
  this.Image.forEach(element => {
    this.VacationFromData.append("vacationImages[]", element);      
  });}

onSubmit(){
  this.button = true;
  if( this.VacationForm.status == "VALID" && this.update == false){
    this.appenddata();
    this._VacationService.CreateVacation(this.VacationFromData).subscribe((res) => {
      Swal.fire({
       icon: "success",
       title: "تم تسجيل الفسحة بنجاح",
       showConfirmButton: false,
       timer: 1500,
     }); 
     this.VacationForm.reset();
     this._Router.navigate(['content/admin/ViewVacation']);
     },(err) => {
      this.button = false;
           Swal.fire({
             icon: 'error',
             title: 'خطأ',
             text: err.error.message,
           });
           this.button = false;
     })
  }else if(this.VacationForm.status == "VALID" && this.update == true){
    this.appenddata();
    this._VacationService.UpdateVacation(this.VacationFromData, this.recordtoupdate.vacation_id).subscribe((res) => {
      Swal.fire({
       icon: "success",
       title: "تم التعديل بنجاح",
       showConfirmButton: false,
       timer: 1500,
     }); 
     this.VacationForm.reset();
     this._Router.navigate(['content/admin/ViewVacation']);
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
  this._VacationService.updatevacation.next(null);
}
}
