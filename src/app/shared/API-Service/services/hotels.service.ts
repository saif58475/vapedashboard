import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {

  constructor(private _HttpClient:HttpClient) { }

  public updatehotel = new BehaviorSubject(null);
  
    // This to get the Hotel
    ListHotel():Observable<any>{
      return this._HttpClient.get(`${environment.Server_URL}/listHotel`);
     }
   // This to post the Hotel
    CreateHotel(data):Observable<any>{
     return this._HttpClient.post(`${environment.Server_URL}/addHotel`, data);
    }
   // This to Update the Hotel
    UpdateHotel(data , id):Observable<any>{
     return this._HttpClient.post(`${environment.Server_URL}/updateHotel/${id}`, data);
    }
    // This to delete the Hotel
   DeleteHotel(id):Observable<any>{
     return this._HttpClient.delete(`${environment.Server_URL}/deleteHotel/${id}`); 
   }
}
