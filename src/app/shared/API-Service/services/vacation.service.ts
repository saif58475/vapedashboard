import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class VacationService {

  constructor(private _HttpClient:HttpClient) { }

  public updatevacation = new BehaviorSubject(null);

   // This to get the Vacation
   ListVacation():Observable<any>{
    return this._HttpClient.get(`${environment.Server_URL}/listVacation`);
   }
 // This to post the Vacation
  CreateVacation(data):Observable<any>{
   return this._HttpClient.post(`${environment.Server_URL}/addVacation`, data);
  }
 // This to Update the Vacation
  UpdateVacation(data , id):Observable<any>{
   return this._HttpClient.post(`${environment.Server_URL}/updateVacation/${id}`, data);
  }
  // This to delete the Vacation
 DeleteVacation(id):Observable<any>{
   return this._HttpClient.delete(`${environment.Server_URL}/deleteVacation/${id}`); 
 }
}
