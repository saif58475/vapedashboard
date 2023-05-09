import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { NightlifeService } from './../../../../shared/API-Service/services/nightlife.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ViewCafetableComponent } from './../../cafe-tables/view-cafetable/view-cafetable.component';
import { CafetablesService } from './../../../../shared/API-Service/services/cafetables.service';
import { async } from 'rxjs/internal/scheduler/async';
@Component({
  selector: 'app-view-nightlife',
  templateUrl: './view-nightlife.component.html',
  styleUrls: ['./view-nightlife.component.css']
})
export class ViewNightlifeComponent implements OnInit {
  @ViewChild(ViewCafetableComponent , {static: false}) 
  childComponent: ViewCafetableComponent;
cafes:any [];
title='pagination';
  page: number = 1;
    count :number = 0 ;
    tableSize: number = 20;
    Queue:any;
    tables:any [];
    data:any;
    imgbase:string = 'https://vap.softwaresbuilders.com/public/';
  constructor(private _NightlifeService:NightlifeService
              ,private _Router:Router
              ,private _CafetablesService:CafetablesService) { }

  ngOnInit(): void {
    this.getCafe();
  }
  
  getCafe(){
    this._NightlifeService.ListCafe().subscribe((res) => {
      this.cafes = res.data;
    })
  }
  onTableDataChange(event:any){
    this.page = event;
    this.getCafe();
      }
  update(data){
  this._NightlifeService.UpdateCafe.next(data);
  this._Router.navigate(['/content/admin/InsertNightLife']);
  }
  insertTable(id:number){
    this._Router.navigate([`content/admin/InsertTable/${id}`], { queryParams: { id: id } });
  }
  showimage(data, name){
    Swal.fire({
      title:`${name}`,
      imageUrl: `${this.imgbase}${data}`,
      imageHeight: 300,
      imageAlt: 'A tall image'
    })
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
        this._NightlifeService.DeleteCafe(id).subscribe((res) => {
          Swal.fire({
            icon: "success",
            title: "تم المسح بنجاح",
            showConfirmButton: false,
            timer: 1500,
          });
       this.getCafe();
        },(err) => {
          Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text:err.error.message    
          })
       this.getCafe();
        },() => {
          console.log("completed");
        })
      }
    }) 
  }
  showtable(id:number){
    this._Router.navigate([`content/admin/ViewTable/${id}`], { queryParams: { id: id } });

  //  this._CafetablesService.Listtable(id).subscribe((res) => {
  //   this.tables = res.data;
  //   Swal.fire({
  //     title: '<strong><u>طالولات</u></strong>',
  //     html:`
  //     <table class="table table-responsive-sm">
  //                               <thead>
  //                                   <tr>
  //                                       <th scope="col"></th>
  //                                       <th scope="col">نوع الطاولة</th>   
  //                                       <th scope="col"></th>
  //                                   </tr>
  //                               </thead>
  //                               <tbody>
  //                                   <tr *ngFor="let view of cafes | paginate : {
  //                                       itemsPerPage: tableSize,
  //                                       currentPage: page,
  //                                       totalItems: count }; let x = index" class=" ">
  //                                       <td scope="row" class="p-2">{{x+1}}</td>
  //                                       <td scope="row" class="p-2">{{view.type}}</td>
  //                                           <td class="font-style chose">
  //                                               <button class="btn pull-right"
  //                                                   style="color: rgba(35, 118, 241, 0.667); padding: 7px"
  //                                                   (click)="update(view)" title="تعديل الكافية">
  //                                                   <i class="fa fa-pencil"></i>
  //                                               </button>
  //                                                  <button class="btn  pull-right"  style="color: red; padding: 7px"
  //                                                  (click)="delete(view.cafe_id)" title="مسح الكافية">
  //                                                   <i class="fa fa-trash"></i>
  //                                                      </button>
  //                                           </td>
  //                                       </tr>
  //                               </tbody>
  //                           </table>
  //     `,
  //     showCloseButton: true,
  //     width: '60%',
  //     showCancelButton: true,
  //     focusConfirm: false,
  //     cancelButtonText: 'الغاء',
  //     confirmButtonText: 'تمام'
  //   })
  // }    
  //  )}
}

}