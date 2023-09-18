import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  public Data = new BehaviorSubject(null);

  constructor(private _HttpClient:HttpClient) { }

  ListClients():Observable<any>{
    return this._HttpClient.get(`${environment.Server_URL}/listClient`);
  }
  addClient(data:object):Observable<any>{
  return this._HttpClient.post(`${environment.Server_URL}/addClient?`, data);
  }
  updateClient(data:object, id:number):Observable<any>{
    return this._HttpClient.put(`${environment.Server_URL}/updateClient/${id}`, data);
  }
  deleteClient(id:number):Observable<any>{
    return this._HttpClient.delete(`${environment.Server_URL}/deleteClient/${id}`);
  }
}
