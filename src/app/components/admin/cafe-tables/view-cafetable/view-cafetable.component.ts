import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { CafetablesService } from './../../../../shared/API-Service/services/cafetables.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-cafetable',
  templateUrl: './view-cafetable.component.html',
  template: `
  <h2>Child Component</h2>
  <p>{{ item }}</p>
`,
  styleUrls: ['./view-cafetable.component.css']
})
export class ViewCafetableComponent implements OnInit{
tables:any [];
title='pagination';
  page: number = 1;
    count :number = 0 ;
    tableSize: number = 20;
  constructor(private _CafetablesService:CafetablesService
             ,private _Router:Router
             ,private _ActivatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
   this.gettables();
  }

  onTableDataChange(event:any){
    this.page = event;
    this.gettables();
      }
gettables(){
  this._ActivatedRoute.queryParams.subscribe(params => {
    this._CafetablesService.Listtable(params['id']).subscribe((res) => {
      this.tables = res.data;
    })
  });
      }
  update(data){
  this._CafetablesService.updatetables.next(data);
  this._Router.navigate([`content/admin/InsertTable/${data.cafe_id}`], { queryParams: { id: data.cafe_id } });
  }
  delete(id:number){

  }
}
