import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CafetablesService {

  public updatetables = new BehaviorSubject(null);

  constructor(private _HttpClient:HttpClient) { }
    // This to get the cafe 
    Listtable(id):Observable<any>{
      return this._HttpClient.get(`${environment.Server_URL}/listTable/${id}`);
     }
   // This to post the cafe 
    Createtable(data):Observable<any>{
    
     return this._HttpClient.post(`${environment.Server_URL}/addTable`, data);
    }
   // This to Update the cafe
    Updatetable(data , id):Observable<any>{
     return this._HttpClient.post(`${environment.Server_URL}/updateTable/${id}`, data);
    }
    // This to delete the cafe
   Deletetable(id):Observable<any>{
     return this._HttpClient.delete(`${environment.Server_URL}/deleteTable/${id}`); 
   }
}
