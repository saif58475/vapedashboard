import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './../../../../shared/API-Service/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-insert-user',
  templateUrl: './insert-user.component.html',
  styleUrls: ['./insert-user.component.css']
})
export class InsertUserComponent implements OnInit {
  UserForm:FormGroup;
  update:boolean = false;
  button:boolean = false;
  gender:string [] = ['Male', 'Female']
  constructor(private _FormBuilder:FormBuilder
            ,private _LoginService:LoginService) { }

  ngOnInit(): void {
    this.initiate();
  }
  initiate(){
    this.UserForm = this._FormBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      gender: ['', Validators.required],
      location: ['', Validators.required],
      email: ['', Validators.required],
      role_id: [1, Validators.required],
    });
  }
  get fc(){
    return this.UserForm.controls;
  }
  
  onSubmit(){
    this.button = true;
    if( this.UserForm.status == "VALID" && this.update == false){
      this._LoginService.register(this.UserForm.value).subscribe((res) => {
        Swal.fire({
         icon: "success",
         title: "تم تسجيل الكورس بنجاح",
         showConfirmButton: false,
         timer: 1500,
       }); 
       this.UserForm.reset();
       },(err) => {
        this.button = false;
             Swal.fire({
               icon: 'error',
               title: 'خطأ',
               text: 'تأكد من ملئ جميع الخانات',
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
