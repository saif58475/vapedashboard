import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class NightlifeService {
  public UpdateCafe = new BehaviorSubject(null)

  constructor(private _HttpClient:HttpClient) { }

  // This to get the cafe 
  ListCafe():Observable<any>{
   return this._HttpClient.get(`${environment.Server_URL}/listCafe`);
  }
// This to post the cafe 
 CreateCafe(data):Observable<any>{
 
  return this._HttpClient.post(`${environment.Server_URL}/addCafe`, data);
 }
// This to Update the cafe
 UpdateCafeRecord(data , id):Observable<any>{
  return this._HttpClient.post(`${environment.Server_URL}/updateCafe/${id}`, data);
 }
 // This to delete the cafe
DeleteCafe(id):Observable<any>{
  return this._HttpClient.delete(`${environment.Server_URL}/deleteCafe/${id}`); 
}
}
