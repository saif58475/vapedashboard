import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  public updatecar = new BehaviorSubject(null);
  constructor(private _HttpClient:HttpClient) { }

   // This to get the Car
   ListCar():Observable<any>{
    return this._HttpClient.get(`${environment.Server_URL}/listCar`);
   }
 // This to post the Car
  CreateCar(data):Observable<any>{
   return this._HttpClient.post(`${environment.Server_URL}/addCar`, data);
  }
 // This to Update the Car
  UpdateCar(data , id):Observable<any>{
   return this._HttpClient.post(`${environment.Server_URL}/updateCar/${id}`, data);
  }
  // This to delete the Car
 DeleteCar(id):Observable<any>{
   return this._HttpClient.delete(`${environment.Server_URL}/deleteCar/${id}`); 
 }
}
