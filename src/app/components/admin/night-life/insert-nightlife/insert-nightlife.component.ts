import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { NightlifeService } from './../../../../shared/API-Service/services/nightlife.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-insert-nightlife',
  templateUrl: './insert-nightlife.component.html',
  styleUrls: ['./insert-nightlife.component.css']
})
export class InsertNightlifeComponent implements OnInit {
CafeForm:FormGroup;
CafeFormData:FormData;
imageLogo:string;
Image:File;
update:boolean = false;
button:boolean = false;
img:string = environment.img;
updaterecordid:number;
  constructor(private _NightlifeService:NightlifeService
             ,private _Router:Router
             ,private _FormBuilder:FormBuilder) { }

  ngOnInit(): void {
    this._NightlifeService.UpdateCafe.subscribe((res) => {
      if( res == null) {
        this.initiate();
      }else{
        this.updaterecordid = res.cafe_id;
        this.initiate(res);
        this.update = true;
        this.imageLogo = this.img + res.cafeImage;
      }
    })
  }

  initiate(data?:any){
    this.CafeForm = this._FormBuilder.group({
      nameEn: [data?.nameEn ||'', Validators.required],
      nameAr: [data?.nameAr ||'', Validators.required],
      description: [data?.description ||'', Validators.required],
      cafeLocation: [data?.cafeLocation ||'', Validators.required],
      image: ['', Validators.required],
    });
  }
  get fc(){
    return this.CafeForm.controls;
  }
  showimage(data){
  Swal.fire({
    imageUrl: `${this.img}${data}`,
    imageHeight: 300,
    imageAlt: 'A tall image'
  })
}
   // imgFile
   getLogoUrl(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.Image = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageLogo = reader.result as string;
      };
    }
  }
  appenddata(){
    this.CafeFormData = new FormData();
    this.CafeFormData.append("nameEn", this.CafeForm.value.nameEn);
    this.CafeFormData.append("nameAr", this.CafeForm.value.nameAr);
    this.CafeFormData.append("description", this.CafeForm.value.description);
    this.CafeFormData.append("cafeLocation", this.CafeForm.value.cafeLocation);
    this.CafeFormData.append("cafeImage", this.Image);    
  }
  onSubmit(){
    this.button = true;
    if( this.CafeForm.status == "VALID" && this.update == false){
      this.appenddata();
      this._NightlifeService.CreateCafe(this.CafeFormData).subscribe((res) => {
        Swal.fire({
         icon: "success",
         title: "تم تسجيل الكافية بنجاح",
         showConfirmButton: false,
         timer: 1500,
       }); 
       this.CafeForm.reset();
       this._Router.navigate(['content/admin/ViewNightLife']);
       },(err) => {
        this.button = false;
             Swal.fire({
               icon: 'error',
               title: 'خطأ',
               text: err.error.message,
             });
             this.button = false;
       })
    }else if (this.CafeForm.status == "VALID" && this.update == true){
    this.appenddata();
    this._NightlifeService.UpdateCafeRecord(this.CafeFormData, this.updaterecordid).subscribe((res) => {
      Swal.fire({
        icon: "success",
        title: "تم تعديل الكافية بنجاح",
        showConfirmButton: false,
        timer: 1500,
      }); 
      this.CafeForm.reset();
      this._Router.navigate(['content/admin/ViewNightLife']);
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
  this._NightlifeService.UpdateCafe.next(null);
}
}
