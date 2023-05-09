import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PlanesService {

  public updateplane = new BehaviorSubject(null);
  constructor(private _HttpClient:HttpClient) { }

    // This to get the Plane 
    ListPlane():Observable<any>{
      return this._HttpClient.get(`${environment.Server_URL}/listPlane`);
     }
   // This to post the Plane
    CreatePlane(data):Observable<any>{
    
     return this._HttpClient.post(`${environment.Server_URL}/addPlane`, data);
    }
   // This to Update the Plane
    UpdatePlaneRecord(data , id):Observable<any>{
     return this._HttpClient.post(`${environment.Server_URL}/updatePlane/${id}`, data);
    }
    // This to delete the Plane
   DeletePlane(id):Observable<any>{
     return this._HttpClient.delete(`${environment.Server_URL}/deletePlane/${id}`); 
   }
}
