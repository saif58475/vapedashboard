import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { CafetablesService } from './../../../../shared/API-Service/services/cafetables.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment.prod';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-insert-cafetable',
  templateUrl: './insert-cafetable.component.html',
  styleUrls: ['./insert-cafetable.component.css']
})
export class InsertCafetableComponent implements OnInit {
CafeTableForm:FormGroup;
CafeTableFromData:FormData;
Image:File;
imageLogo:string;
update:boolean = false;
button:boolean = false;
imgbase:string = 'https://vap.softwaresbuilders.com/public/';
recordtoupdate:any;
  constructor(private _CafetablesService:CafetablesService
             ,private _Router:Router
             ,private _FormBuilder:FormBuilder
             ,private _ActivatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this._CafetablesService.updatetables.subscribe((res) => {
      if( res == null){
        this._ActivatedRoute.queryParams.subscribe(params => {
          this.initiate(params['id']);
        });
      }else{
        this.recordtoupdate = res;
      this.updateTable(res);
      this.imageLogo = this.imgbase + res.tableImage;
      this.update = true; 
      }
    })
    
  }

  initiate(cafe_id){
    this.CafeTableForm = this._FormBuilder.group({
      cafe_id: [cafe_id, Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      set_num: ['', Validators.required],
      table_num: ['', Validators.required],
      price: ['', Validators.required],
      tableImage: ['', Validators.required],
    });
  }
  updateTable(data:any){
    this.CafeTableForm = this._FormBuilder.group({
      cafe_id: [data.cafe_id, Validators.required],
      type: [data.type, Validators.required],
      description: [data.description, Validators.required],
      set_num: [data.set_num, Validators.required],
      table_num: [data.table_num, Validators.required],
      price: [data.price, Validators.required],
      tableImage: [data.tableImage, Validators.required],
      vip:[ data?.vip || '', Validators.required],
      offer:[ data?.offer || '', Validators.required]
    });
  }

  get fc(){
    return this.CafeTableForm.controls;
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
    this.CafeTableFromData = new FormData();
    this.CafeTableFromData.append("cafe_id", this.CafeTableForm.value.cafe_id);
    this.CafeTableFromData.append("type", this.CafeTableForm.value.type);
    this.CafeTableFromData.append("description", this.CafeTableForm.value.description);
    this.CafeTableFromData.append("set_num", this.CafeTableForm.value.set_num);
    this.CafeTableFromData.append("table_num", this.CafeTableForm.value.table_num);
    this.CafeTableFromData.append("price", this.CafeTableForm.value.price);
    this.CafeTableFromData.append("vip", this.CafeTableForm.value.vip);
    this.CafeTableFromData.append("offer", this.CafeTableForm.value.offer);
    this.CafeTableFromData.append("tableImage", this.Image);    
  }
  onSubmit(){
    this.button = true;
    if( this.CafeTableForm.status == "VALID" && this.update == false){
      if( this.CafeTableForm.value.price > this.CafeTableForm.value.offer){
        this.appenddata();
        this._CafetablesService.Createtable(this.CafeTableFromData).subscribe((res) => {
          Swal.fire({
           icon: "success",
           title: "تم تسجيل الفندق بنجاح",
           showConfirmButton: false,
           timer: 1500,
         }); 
         this.CafeTableForm.reset();
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
        }else{
          Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text: 'لا يمكن ان يكون سعر العرض اكثر من السعر الفعلي',
          });
          this.button = false;
        }
    }else if(this.CafeTableForm.status == "VALID" && this.update == true){
      this.appenddata();
      this._CafetablesService.Updatetable(this.CafeTableFromData, this.recordtoupdate.cafe_id).subscribe((res) => {
        Swal.fire({
         icon: "success",
         title: "تم تعديل طاولة الكافية بنجاح",
         showConfirmButton: false,
         timer: 1500,
       }); 
       this.CafeTableForm.reset();
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
}
