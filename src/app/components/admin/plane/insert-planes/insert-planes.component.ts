import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { PlanesService } from './../../../../shared/API-Service/services/planes.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-insert-planes',
  templateUrl: './insert-planes.component.html',
  styleUrls: ['./insert-planes.component.css']
})
export class InsertPlanesComponent implements OnInit {
planeForm:FormGroup;
planeFormData:FormData;
Image:File []=[];
images:string []=[];
recordtoupdate:any ;
img:string = 'https://vap.softwaresbuilders.com/public/';
update:boolean = false;
button:boolean = false;
  constructor(private _FormBuilder:FormBuilder
             ,private _PlanesService :PlanesService 
             ,private _Router:Router) { }

  ngOnInit(): void {
    this.check();
  }

  check(){
    this._PlanesService.updateplane.subscribe((res) => {
      if( res == null){
     this.initiate();
      }else{
        this.recordtoupdate = res;
        res.planeImage.forEach(element => {
           this.images.push( this.img + element);
        });
       this.initiate(res);
       this.update = true;
      }
    })
  }
  initiate(data?:any){
    this.planeForm = this._FormBuilder.group({
      nameAr: [data?.nameAr || '', Validators.required],
      nameEn: [data?.nameEn || '', Validators.required],
      description: [data?.description || '', Validators.required],
      price: [data?.price || '', Validators.required],
      type: [data?.type || '', Validators.required],
    });
  }
  get fc(){
    return this.planeForm.controls;
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
  this.planeFormData = new FormData();
  this.planeFormData.append("nameEn", this.planeForm.value.nameEn);
  this.planeFormData.append("nameAr", this.planeForm.value.nameAr);
  this.planeFormData.append("description", this.planeForm.value.description);
  this.planeFormData.append("price", this.planeForm.value.price);
  this.planeFormData.append("type", this.planeForm.value.type);
  this.Image.forEach(element => {
    this.planeFormData.append("planeImages[]", element);    
  });
}
onSubmit(){
  this.button = true;
  if( this.planeForm.status == "VALID" && this.update == false){
    this.appenddata();
    this._PlanesService.CreatePlane(this.planeFormData).subscribe((res) => {
      Swal.fire({
       icon: "success",
       title: "تم تسجيل الطيران بنجاح",
       showConfirmButton: false,
       timer: 1500,
     }); 
     this.planeForm.reset();
     this._Router.navigate(['content/admin/ViewPlane']);
     },(err) => {
      this.button = false;
           Swal.fire({
             icon: 'error',
             title: 'خطأ',
             text: err.error.message,
           });
           this.button = false;
     })
  }else if (this.planeForm.status == "VALID" && this.update == true){
  this.appenddata();
  this._PlanesService.UpdatePlaneRecord(this.planeFormData, this.recordtoupdate.plane_id).subscribe((res) => {
    Swal.fire({
      icon: "success",
      title: "تم تعديل الطيران بنجاح",
      showConfirmButton: false,
      timer: 1500,
    }); 
    this.planeForm.reset();
    this._Router.navigate(['content/admin/ViewPlane']);
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
  this._PlanesService.updateplane.next(null);
}
}
